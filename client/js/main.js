const inputNode = document.getElementsByName("username")[0];
const submit = document.getElementById("submit");
const join = document.getElementById("join");
const closeBtn = document.getElementById("close");
const game = document.getElementById("game");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

submit.addEventListener("click", () => {
    socket.send(
        JSON.stringify({
            path: "/connected",
            data: {
                username: inputNode.value
            }
        })
    );
    join.style.display = "none";
    game.style.display = "block";
});

let socket = new WebSocket("ws://localhost:8080");
let message;

socket.onopen = function (e) {};

socket.onmessage = function (event) {
    message = event;
    console.log(JSON.parse(message.data));
    alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
    if (event.wasClean) {
        alert(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
    } else {
        alert("[close] Connection died");
    }
};

socket.onerror = function (error) {
    alert(`[error] ${error.message}`);
};

closeBtn.addEventListener("click", () => {
    socket.close();
});
