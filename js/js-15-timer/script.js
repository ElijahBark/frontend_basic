let current = 0;
let flag = true;
let timer;

document.addEventListener('click', function (e) {
    if (e.target.id ==='switch') {
        if (flag) {
            startTimer();
            document.getElementById('switch').value = 'stop';
        } else {
            stopTimer();
            document.getElementById('switch').value = 'start';
        }
        flag = !flag;
    } else if (e.target.id ==='clear') {
        clearTimer();
    }
});
function startTimer() {
    let time = performance.now();
    timer = setInterval(function () {
        let minutes = Math.floor(((performance.now()-time)+current)/ 60000);
        let seconds = Math.floor(((performance.now()-time)+current) / 1000 % 60);
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        document.getElementById('miliseconds').innerText = Math.floor(((performance.now()-time)+current) % 1000);
    }, 1);
}

function stopTimer() {
    clearInterval(timer);
    current = readFromScreen();
}

function clearTimer() {
    clearInterval(timer);
    current = 0;
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.getElementById('miliseconds').innerText = '000'
}

function readFromScreen() {
    return (+document.getElementById('minutes').innerText*60 +
        +document.getElementById('seconds').innerText)*1000 +
        +document.getElementById('miliseconds').innerText;
}
