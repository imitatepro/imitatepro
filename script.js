const recordBtn = document.getElementById("record-btn");
const playBtn = document.getElementById("play-btn");

let chunks = [];
let recorder;

recordBtn.addEventListener("click", async () => {
    if (recorder && recorder.state === "recording") {
        recorder.stop();
        recordBtn.textContent = "Record Your Voice";
        return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);

        playBtn.disabled = false;
        playBtn.onclick = () => audio.play();
    };

    recorder.start();
    recordBtn.textContent = "Stop Recording";
});
