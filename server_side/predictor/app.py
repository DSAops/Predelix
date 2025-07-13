from flask import Flask, request, jsonify, send_file
import pandas as pd
from io import BytesIO
from flask_cors import CORS
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'stock_predictor_model.pkl'
MAPPING_PATH = 'id_mappings.pkl'


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "✅ App is working as expected!",
        "note": "You are at home."
    })


@app.route('/api/train', methods=['POST'])
def api_train():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        df = pd.read_csv(file)
    except Exception as e:
        return jsonify({'error': f'Failed to read CSV: {str(e)}'}), 400

    required_cols = {'store_id', 'product_id', 'date', 'sales', 'stock'}
    if not required_cols.issubset(df.columns):
        return jsonify({'error': f'Missing columns. Required: {required_cols}'}), 400

    try:
        df['date'] = pd.to_datetime(df['date'])
    except Exception as e:
        return jsonify({'error': f'Invalid date format: {str(e)}'}), 400

    df['date_ordinal'] = df['date'].map(pd.Timestamp.toordinal)
    df['store_id'] = df['store_id'].astype('category')
    df['product_id'] = df['product_id'].astype('category')

    # Save mapping of encoded to original values
    store_mapping = dict(enumerate(df['store_id'].cat.categories))
    product_mapping = dict(enumerate(df['product_id'].cat.categories))
    joblib.dump({'store': store_mapping, 'product': product_mapping}, MAPPING_PATH)

    df['store_id'] = df['store_id'].cat.codes
    df['product_id'] = df['product_id'].cat.codes

    X = df[['store_id', 'product_id', 'date_ordinal', 'sales']]
    y = df['stock']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)

    joblib.dump(model, MODEL_PATH)
    return jsonify({'message': 'Model trained and saved successfully!', 'mse': mse})


@app.route('/api/predict', methods=['POST'])
def api_predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        df = pd.read_csv(file)
    except Exception as e:
        return jsonify({'error': f'Failed to read CSV: {str(e)}'}), 400

    required_cols = {'store_id', 'product_id', 'date', 'sales', 'stock'}
    if not required_cols.issubset(df.columns):
        return jsonify({'error': f'Missing columns. Required: {required_cols}'}), 400

    try:
        df['date'] = pd.to_datetime(df['date'])
    except Exception as e:
        return jsonify({'error': f'Invalid date format: {str(e)}'}), 400

    prediction_rows = []

    if os.path.exists(MODEL_PATH) and os.path.exists(MAPPING_PATH):
        model = joblib.load(MODEL_PATH)
        mappings = joblib.load(MAPPING_PATH)
        store_mapping = mappings['store']
        product_mapping = mappings['product']

        df['date_ordinal'] = df['date'].map(pd.Timestamp.toordinal)
        df['store_id'] = df['store_id'].astype('category')
        df['product_id'] = df['product_id'].astype('category')
        df['store_code'] = df['store_id'].cat.codes
        df['product_code'] = df['product_id'].cat.codes

        last_date = df['date'].max()

        for (store, product), group in df.groupby(['store_code', 'product_code']):
            store_name = store_mapping.get(store, store)
            product_name = product_mapping.get(product, product)
            store_code = store
            product_code = product
            sales = group['sales'].tail(7).mean() if len(group) >= 7 else group['sales'].mean()

            for i in range(1, 8):
                pred_date = last_date + pd.Timedelta(days=i)
                features = [[store_code, product_code, pred_date.toordinal(), sales]]
                pred_stock = model.predict(features)[0]
                prediction_rows.append({
                    'store_id': store_name,
                    'product_id': product_name,
                    'date': pred_date.strftime('%Y-%m-%d'),
                    'predicted_stock': max(0, round(pred_stock))
                })
    else:
        # Fallback logic
        df['date'] = pd.to_datetime(df['date'])
        last_date = df['date'].max()
        for (store, product), group in df.groupby(['store_id', 'product_id']):
            avg_sales = group['sales'].tail(7).mean() if len(group) >= 7 else group['sales'].mean()
            for i in range(1, 8):
                pred_date = last_date + pd.Timedelta(days=i)
                prediction_rows.append({
                    'store_id': store,
                    'product_id': product,
                    'date': pred_date.strftime('%Y-%m-%d'),
                    'predicted_stock': max(0, round(avg_sales))
                })

    pred_df = pd.DataFrame(prediction_rows)

    if request.args.get('format') == 'csv':
        output = BytesIO()
        pred_df.to_csv(output, index=False)
        output.seek(0)
        return send_file(output, mimetype='text/csv', as_attachment=True, download_name='predicted_stock.csv')

    return jsonify(pred_df.to_dict(orient='records'))


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
