import { useState, useEffect } from "react";

export const useRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setAudioChunks([]);
    recorder.ondataavailable = (e) => setAudioChunks((prev) => [...prev, e.data]);
    recorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      setAudioBlob(blob);
    };
    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder) mediaRecorder.stop();
  };

  return { startRecording, stopRecording, audioBlob };
};
