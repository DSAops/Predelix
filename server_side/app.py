from flask import Flask, request, jsonify, send_file
import pandas as pd
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "✅ App is working as expected!",
        "note": "You are at home. Please refer to /api/predict for predictions."
    })
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
    for (store, product), group in df.groupby(['store_id', 'product_id']):
        group = group.sort_values('date')
        avg_sales = group['sales'].tail(7).mean() if len(group) >= 7 else group['sales'].mean()
        last_date = group['date'].max()
        for i in range(1, 8):
            pred_date = last_date + pd.Timedelta(days=i)
            prediction_rows.append({
                'store_id': store,
                'product_id': product,
                'date': pred_date.strftime('%Y-%m-%d'),
                'predicted_stock': max(0, round(avg_sales))
            })

    pred_df = pd.DataFrame(prediction_rows)

    # Return as CSV if requested
    if request.args.get('format') == 'csv':
        output = BytesIO()
        pred_df.to_csv(output, index=False)
        output.seek(0)
        return send_file(output, mimetype='text/csv', as_attachment=True, download_name='predicted_stock.csv')

    # Otherwise return JSON
    return jsonify(pred_df.to_dict(orient='records'))

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))  # Use Render's PORT or default to 5000
    app.run(host='0.0.0.0', port=port)
