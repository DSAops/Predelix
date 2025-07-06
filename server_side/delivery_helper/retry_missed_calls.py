import pandas as pd
from delivery_call import make_call, load_data, save_data

def retry_missed_calls(webhook_base_url):
    try:
        missed_df = pd.read_csv('missed_calls.csv')
    except Exception as e:
        print(f"No missed_calls.csv found or error reading: {e}")
        return
    if missed_df.empty:
        print("No missed calls to retry.")
        return
    df = load_data()
    successful = 0
    failed = 0
    new_missed = []
    for idx, row in missed_df.iterrows():
        print(f"Retrying call to {row['name']} ({row['mobile_number']})...")
        # Find the index in the main df
        main_idx = df.index[df['mobile_number'] == row['mobile_number']].tolist()
        if main_idx:
            main_idx = main_idx[0]
        else:
            print(f"Number {row['mobile_number']} not found in main CSV, skipping.")
            continue
        if make_call(row, main_idx, webhook_base_url):
            successful += 1
        else:
            failed += 1
            new_missed.append(row.to_dict())
    print(f"\nRetry Summary: {successful} successful, {failed} failed.")
    if new_missed:
        pd.DataFrame(new_missed).to_csv('missed_calls.csv', index=False)
        print(f"Missed calls updated in missed_calls.csv.")
    else:
        print("All missed calls succeeded. Removing missed_calls.csv.")
        import os
        os.remove('missed_calls.csv')

if __name__ == '__main__':
    webhook_base_url = input("Enter your ngrok URL (e.g., https://xxxx.ngrok-free.app): ").strip()
    if not webhook_base_url.startswith('http'):
        webhook_base_url = f'https://{webhook_base_url}'
    retry_missed_calls(webhook_base_url)
