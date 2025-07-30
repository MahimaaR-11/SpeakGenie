SpeakGenie – AI Voice Tutor
SpeakGenie is a real-time AI voice tutor that answers your educational questions with both text and speech. Built using React (frontend) and Flask (backend), it uses gTTS to generate audio replies and serves them dynamically.

🚀 Features
🎤 Ask questions about nouns, verbs, science, math, etc.

🧞 Genie replies with text and voice

💬 Clean and interactive chat interface

🛠 Built using React, Flask, and gTTS

📁 Project Structure
bash
Copy
Edit
speakgenie/
├── speakgenie-client/     # React frontend
│   └── src/components/ChatPage.js
├── speakgenie-flask/      # Flask backend
│   └── app.py
│   └── audio_responses/
🖥️ How to Run
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/yourusername/SpeakGenie.git
cd SpeakGenie
2. Start the Backend
bash
Copy
Edit
cd speakgenie-flask
pip install flask flask-cors gTTS
python app.py
3. Start the Frontend
bash
Copy
Edit
cd ../speakgenie-client
npm install
npm start
Visit: http://localhost:3000

✨ Tech Stack
Frontend: React.js

Backend: Python Flask

Voice API: Google Text-to-Speech (gTTS)

Others: Axios, Flask-CORS

🙋‍♀️ Author
👩🏻 Mahima Rajendran
🎓 Final Year B.Tech IT Student
📫 mahimarajendran.11@gmail.com
🌐 Trichy, Tamil Nadu
