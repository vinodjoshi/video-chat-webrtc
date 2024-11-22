import Echo from "laravel-echo";

const localVideo = document.addEventListener("local-video")

const remoteVideo = document.addEventListener("remote-video")

let localStream;

let peerConnection;

const config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

async function startLocalVideo()
{
    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });

    localVideo.srcObject = localStream;

}

function startCall() {
    peerConnection = new RTCPeerConnection(config);
    peerConnection.addStream(localStream);

    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    // Handle signaling
    // (to be implemented using Laravel Echo or Socket.IO)
}

startLocalVideo();



window.Pusher = require("pusher-js");

const echo = new Echo({
    broadcaster: "pusher",
    key: "your_pusher_key",
    cluster: "your_cluster",
    encrypted: true,
});

// Listen for signaling events
echo.channel("video-chat").listen(".offer", (data) => {
    // Handle offer, create an answer
});

// Send offers and ICE candidates
function sendSignalingData(type, data) {
    // Use AJAX or Laravel Echo to send data to the server
}