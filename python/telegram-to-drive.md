Here is an example of how you can write a Python script to create an API that sends files to a shared drive from a Telegram group. This example uses the python-telegram-bot library to listen for messages in the group and respond to commands, and the google-api-python-client library to access and modify the shared drive using the Google Drive API.

Copy code

`# Import the necessary libraries
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from telegram.ext import Updater, CommandHandler
import os

# Set the path to the client secrets file

CLIENT_SECRETS_FILE = 'client_secrets.json'

# Set the name of the shared drive

DRIVE_NAME = 'My Shared Drive'

# Set the name of the command to upload files to the shared drive

UPLOAD_COMMAND = '/upload'

# Authenticate and authorize the bot to access the Google Drive API

creds = Credentials.from_authorized_user_info(info=info, client_secrets_file=CLIENT_SECRETS_FILE)
service = build('drive', 'v3', credentials=creds)

# Find the ID of the shared drive

results = service.drives().list(q=f"name='{DRIVE_NAME}'", pageSize=1).execute()
drive_id = results['drives'][0]['id']

# Define a function to handle the /upload command

def upload(update, context): # Get the file to be uploaded from the user's message
file = context.bot.getFile(update.message.document.file_id)

    # Download the file to the local filesystem
    file.download('/tmp/uploaded_file.pdf')

    # Create a new file on the shared drive
    file_metadata = {
        'name': 'uploaded_file.pdf',
        'parents': [drive_id]
    }
    media = MediaFileUpload('/tmp/uploaded_file.pdf', mimetype='application/pdf')
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    print(f'File ID: {file.get("id")}')

    # Send a message to confirm the file was uploaded
    context.bot.send_message(chat_id=update.effective_chat.id, text='File uploaded to shared drive')

# Set the token for the bot

updater = Updater(TOKEN, use_context=True)

# Add a handler for the /upload command

updater.dispatcher.add_handler(CommandHandler(UPLOAD_COMMAND, upload))

# Start the bot

updater.start_polling()`
