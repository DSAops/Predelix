import pandas as pd
from twilio.rest import Client
from flask import Flask, request, Response, jsonify
import os
import time
import threading
import urllib.request
import base64
import speech_recognition as sr
import wave
import audioop
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

# Load sensitive credentials from environment variables
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

# CSV paths (can be overridden by env or API)
INPUT_CSV = os.getenv('INPUT_CSV', 'input.csv')
OUTPUT_CSV = os.getenv('OUTPUT_CSV', 'output.csv')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def load_data(input_csv=INPUT_CSV):
    df = pd.read_csv(input_csv)
    if 'response' not in df.columns:
        df['response'] = ''
    if 'recording_duration' not in df.columns:
        df['recording_duration'] = ''
    if 'recording_sid' not in df.columns:
        df['recording_sid'] = ''
    if 'transcription' not in df.columns:
        df['transcription'] = ''
    return df

def save_data(df, output_csv=OUTPUT_CSV):
    df.to_csv(output_csv, index=False)

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def make_call(row, row_index, webhook_base_url):
    to_number = str(row['mobile_number'])
    name = row['name']
    
    # Ensure the URL has https:// protocol
    if not webhook_base_url.startswith('http'):
        webhook_base_url = f'https://{webhook_base_url}'
    
    webhook_url = f'{webhook_base_url}/voice/{row_index}'
    print(f"🔗 Using webhook URL: {webhook_url}")

    try:
        call = client.calls.create(
            to=to_number,
            from_=TWILIO_PHONE_NUMBER,
            url=webhook_url
        )
        print(f"✅ Calling {name} at {to_number}... (Call SID: {call.sid})")
        return True
    except Exception as e:
        if "unverified" in str(e).lower():
            print(f"❌ ERROR: {name} ({to_number}) is not verified for Twilio trial account!")
            print("   Please verify this number at: https://console.twilio.com/us1/develop/phone-numbers/manage/verified")
        else:
            print(f"❌ ERROR calling {name} at {to_number}: {str(e)}")
        return False

@app.route('/voice/<int:row_index>', methods=['GET', 'POST'])
def voice(row_index):
    df = load_data()
    name = df.loc[row_index, 'name']
    
    # Build absolute URL for /recording route
    webhook_base_url = request.url_root.strip('/')  # e.g., https://xxxx.ngrok-free.app
    recording_url = f"{webhook_base_url}/recording/{row_index}"
    
    response = f"""
    <Response>
        <Say voice="alice">Hello, I am calling on behalf of Predelix. We are delivering your courier today. At what time will you be available? Please state your preferred time or any delivery instructions after the beep.</Say>
        <Record maxLength="30" action="{recording_url}" />
    </Response>
    """
    return Response(response, mimetype='text/xml')

@app.route('/recording/<int:row_index>', methods=['GET', 'POST'])
def recording(row_index):
    df = load_data()
    # Handle both GET and POST requests
    if request.method == 'GET':
        recording_url = request.args.get('RecordingUrl', '')
        recording_duration = request.args.get('RecordingDuration', '')
        recording_sid = request.args.get('RecordingSid', '')
    else:
        recording_url = request.form.get('RecordingUrl', '')
        recording_duration = request.form.get('RecordingDuration', '')
        recording_sid = request.form.get('RecordingSid', '')

    print(f"🎙️  Recording data received for row {row_index}:")
    print(f"   URL: {recording_url}")
    print(f"   Duration: {recording_duration}")
    print(f"   SID: {recording_sid}")

    # Save recording details
    df.loc[row_index, 'response'] = recording_url
    df.loc[row_index, 'recording_duration'] = recording_duration
    df.loc[row_index, 'recording_sid'] = recording_sid

    # Download the audio file (WAV/MP3 format) with Twilio authentication, with retry and fallback
    transcription = ''
    if recording_url:
        audio_filename = f"recording_{row_index}"
        credentials = f"{TWILIO_ACCOUNT_SID}:{TWILIO_AUTH_TOKEN}"
        encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
        headers = {'Authorization': f'Basic {encoded_credentials}'}
        formats = ['.wav', '.mp3', '']
        success = False
        time.sleep(7)  # Wait for Twilio to process the recording
        for ext in formats:
            try:
                req = urllib.request.Request(recording_url + ext, headers=headers)
                with urllib.request.urlopen(req) as response, open(audio_filename + (ext if ext else '.audio'), 'wb') as out_file:
                    out_file.write(response.read())
                print(f"✅ Audio downloaded: {audio_filename + (ext if ext else '.audio')}")
                # Try to transcribe
                try:
                    recognizer = sr.Recognizer()
                    with sr.AudioFile(audio_filename + (ext if ext else '.audio')) as source:
                        audio_data = recognizer.record(source)
                        transcription = recognizer.recognize_google(audio_data)
                        print(f"✅ Transcription: {transcription}")
                except Exception as e:
                    print(f'❌ Speech recognition failed: {e}')
                    transcription = '[Speech recognition failed]'
                success = True
                break
            except Exception as e:
                print(f"❌ Failed to download audio with extension '{ext}': {e}")
        if not success:
            transcription = '[Audio download failed]'
    else:
        transcription = '[No recording URL]'

    df.loc[row_index, 'transcription'] = transcription
    save_data(df)
    print(f"✅ Recording and transcription saved for row {row_index}: {recording_url}")

    return Response("<Response><Say>Thank you. Your response has been recorded. Goodbye!</Say></Response>", mimetype='text/xml')

def check_verified_numbers():
    print("Checking verified numbers...")
    try:
        verified_numbers = client.outgoing_caller_ids.list()
        verified_list = [num.phone_number for num in verified_numbers]
        print(f"✅ Verified numbers: {verified_list}")
        return verified_list
    except Exception as e:
        print(f"⚠️  Could not fetch verified numbers: {str(e)}")
        return []

def start_flask_server():
    app.run(port=5000, debug=False, use_reloader=False)

def save_missed_calls(missed_rows):
    import csv
    if missed_rows:
        with open('missed_calls.csv', 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=missed_rows[0].keys())
            writer.writeheader()
            writer.writerows(missed_rows)
        print(f"Missed calls saved to missed_calls.csv ({len(missed_rows)} numbers)")

@app.route('/api/upload_customers', methods=['POST'])
def upload_customers():
    """Upload customer data as CSV (multipart/form-data)."""
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part in the request.'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file.'}), 400
    if not file.filename.lower().endswith('.csv'):
        return jsonify({'status': 'error', 'message': 'Only CSV files are allowed.'}), 400
    try:
        df = pd.read_csv(file)
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Invalid CSV: {e}'}), 400
    required_columns = {'name', 'mobile_number'}
    if not required_columns.issubset(df.columns):
        return jsonify({'status': 'error', 'message': f'Missing required columns: {required_columns - set(df.columns)}'}), 400
    df.to_csv(INPUT_CSV, index=False)
    return jsonify({'status': 'success', 'message': 'CSV uploaded and validated.'}), 200

@app.route('/api/trigger_calls', methods=['POST'])
def trigger_calls():
    """Trigger delivery calls to all customers in the input CSV."""
    # Prefer PUBLIC_BASE_URL env var if set (for production)
    webhook_base_url = os.getenv('PUBLIC_BASE_URL')
    if not webhook_base_url:
        # Fallback to frontend-provided value (for local/ngrok)
        webhook_base_url = request.json.get('webhook_base_url')
    if not webhook_base_url:
        print('[ERROR] webhook_base_url missing!')
        return jsonify({'status': 'error', 'message': 'webhook_base_url required (set PUBLIC_BASE_URL or provide in request)'}), 400
    if not webhook_base_url.startswith('http'):
        webhook_base_url = f'https://{webhook_base_url}'

    # Check Twilio credentials
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_PHONE_NUMBER:
        print('[ERROR] Twilio credentials missing!')
        return jsonify({'status': 'error', 'message': 'Twilio credentials missing!'}), 500

    df = load_data()
    successful_calls = 0
    failed_calls = 0
    missed_rows = []
    error_details = []
    for idx, row in df.iterrows():
        response_value = df.at[idx, 'response']
        if response_value is None or pd.isna(response_value) or str(response_value).strip() == '':
            to_number = str(row['mobile_number'])
            if not to_number.startswith('+'):
                print(f'[WARNING] Number {to_number} is not in E.164 format!')
            print(f'[INFO] Attempting call to {row.get("name", "(no name)")} at {to_number}')
            try:
                if make_call(row, idx, webhook_base_url):
                    successful_calls += 1
                else:
                    failed_calls += 1
                    missed_rows.append(row.to_dict())
                    error_details.append({'row': idx, 'number': to_number, 'error': 'Call failed'})
            except Exception as e:
                print(f'[ERROR] Exception during call: {e}')
                failed_calls += 1
                missed_rows.append(row.to_dict())
                error_details.append({'row': idx, 'number': to_number, 'error': str(e)})
            time.sleep(2)
    if failed_calls > 0:
        save_missed_calls(missed_rows)
    return jsonify({
        'status': 'completed',
        'successful_calls': successful_calls,
        'failed_calls': failed_calls,
        'missed': missed_rows,
        'errors': error_details
    })

@app.route('/api/results', methods=['GET'])
def get_results():
    """Fetch the latest call results."""
    df = load_data(OUTPUT_CSV)
    return df.to_json(orient='records'), 200, {'Content-Type': 'application/json'}

if __name__ == '__main__':
    # Only for development/testing. For production, use a WSGI server (e.g., gunicorn)
    app.run(host='0.0.0.0', port=5000, debug=False)
