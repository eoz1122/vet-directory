import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
SMTP_HOST = os.getenv('SMTP_HOST')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Extract fields
    name = data.get('name')
    email = data.get('email')
    topic = data.get('topic')
    message = data.get('message')
    subject = data.get('_subject', f"New Contact from {name}")

    # Construct Email Content
    email_body = f"""
    New Contact Form Submission
    ---------------------------
    Name: {name}
    Email: {email}
    Topic: {topic}
    
    Message:
    {message}
    
    ---------------------------
    Full Data:
    {data}
    """

    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = RECIPIENT_EMAIL
    msg['Subject'] = subject
    msg.attach(MIMEText(email_body, 'plain'))

    try:
        # Connect to SMTP Server
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()  # Secure the connection
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
        server.quit()
        
        return jsonify({'success': True, 'message': 'Email sent successfully'})
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
