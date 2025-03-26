let circle = document.querySelector("#circle");
let scoreElement = document.querySelector("#score");

let KeyPressed = null;
let speed = 5;
let score = 0;
let scoreTimer = null;
let firstPress = false;

function SetKey(event) {
    // if(event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5" || event.key == "6" || event.key == "7" || event.key == "8" || event.key == "9") {
    //     speed = parseInt(event.key)
    // }

    if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "ArrowUp" || event.key == "ArrowDown") {
        KeyPressed = event.key;
        if (scoreTimer == null && firstPress == false) {
            let scoreTimer = setInterval(increaseScore, 2000);
            firstPress = true;
        }
    }
}

function movement() {
    if (KeyPressed != null) {
        let circlePosition = circle.getBoundingClientRect();
        let positionLeft = circlePosition.left;
        let positionTop = circlePosition.top;
        let positionRight = circlePosition.right;
        let positionBottom = circlePosition.bottom;

        if (KeyPressed === "ArrowLeft" && positionLeft > 0) {
            circle.style.left = positionLeft - speed + "px";
        }
        if (KeyPressed === "ArrowRight" && positionRight < window.innerWidth) {
            circle.style.left = positionLeft + speed + "px";
        }
        if (KeyPressed === "ArrowUp" && positionTop > 0) {
            circle.style.top = positionTop - speed + "px";
        }
        if (KeyPressed === "ArrowDown" && positionBottom < window.innerHeight) {
            circle.style.top = positionTop + speed + "px";
        }

        if (positionRight > window.innerWidth || positionBottom > window.innerHeight || positionLeft < 0 || positionTop < 0) {
            End();
        }
    }
}

document.addEventListener("keydown", SetKey);

let moveTimer = setInterval(movement, 10);

function increaseScore() {
    score++
    scoreElement.innerHTML = "Score: " + score;
}

function End() {
    clearInterval(moveTimer);
    clearInterval(scoreTimer);
    localStorage.setItem("HighScore", score);
    circle.classList.add("dead");
    setTimeout(ResetGame, 1600);
}

function ResetGame() {
    alert("You hit a wall! Game over\nHigh Score: " + score);
    location.reload();
}