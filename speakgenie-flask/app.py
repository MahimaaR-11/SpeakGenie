from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from gtts import gTTS
import os
import uuid

app = Flask(__name__)
CORS(app)

AUDIO_FOLDER = "audio_responses"
os.makedirs(AUDIO_FOLDER, exist_ok=True)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt", "").lower()
    print("User asked:", prompt)

    if "noun" in prompt:
        reply = "A noun is a word that refers to a person, place, or thing."
    elif "verb" in prompt:
        reply = "A verb shows an action or a state of being."
    elif "adjective" in prompt:
        reply = "An adjective describes a noun. For example, red, big, or happy."
    elif "computer" in prompt:
        reply = "A computer is an electronic device that processes data."
    elif "ai" in prompt or "artificial intelligence" in prompt:
        reply = "AI means Artificial Intelligence. It helps machines think like humans."
    elif "trichy" in prompt:
        reply = "Trichy is a city in Tamil Nadu known for its Rockfort Temple."
    elif "math" in prompt:
        reply = "Math is the study of numbers, shapes, and patterns."
    elif "science" in prompt:
        reply = "Science helps us understand the world through experiments."
    elif "who are you" in prompt:
        reply = "I am Genie, your AI voice tutor."
    elif "thank you" in prompt:
        reply = "You're welcome! I'm always here to help."
    else:
        reply = "That's an interesting question! Here's what I think. " + prompt.capitalize()

    filename = f"{uuid.uuid4()}.mp3"
    audio_path = os.path.join(AUDIO_FOLDER, filename)
    tts = gTTS(reply)
    tts.save(audio_path)

    return jsonify({
        "text": reply,
        "audioUrl": f"http://localhost:5000/audio/{filename}"
    })

@app.route("/audio/<filename>")
def get_audio(filename):
    return send_from_directory(AUDIO_FOLDER, filename)

if __name__ == "__main__":
    print("🚀 SpeakGenie backend is running at http://localhost:5000")
    app.run(debug=True)


