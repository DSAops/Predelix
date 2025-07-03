from flask import Flask, request, render_template, send_file
import pandas as pd
import os
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return '''
    <h2>Upload Sales Data CSV</h2>
    <form method="post" action="/predict" enctype="multipart/form-data">
      <input type="file" name="file" accept=".csv" required>
      <input type="submit" value="Upload and Predict">
    </form>
    '''

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    df = pd.read_csv(file)

    # Check required columns
    required_cols = {'store_id', 'product_id', 'date', 'sales', 'stock'}
    if not required_cols.issubset(df.columns):
        return f'Missing columns. Required: {required_cols}', 400

    df['date'] = pd.to_datetime(df['date'])
    prediction_rows = []
    # Predict for each store-product
    for (store, product), group in df.groupby(['store_id', 'product_id']):
        group = group.sort_values('date')
        # Simple moving average of last 7 days sales
        if len(group) < 7:
            avg_sales = group['sales'].mean()
        else:
            avg_sales = group['sales'].tail(7).mean()
        # Predict for next 7 days
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
    output = BytesIO()
    pred_df.to_csv(output, index=False)
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name='predicted_stock.csv')

if __name__ == '__main__':
    app.run(debug=True) 