document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(`[id*=timer]`).forEach((element) => {
        var endTime = new Date(element.innerHTML).getTime();
        element.innerHTML = getCountDownTimer(endTime);
        setInterval(function () {
            element.innerHTML = getCountDownTimer(endTime);
        }, 1000);
    });
});

function getCountDownTimer(endTime) {
    var nowTime = new Date().getTime();
    var timeLeft = endTime - nowTime;
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft < 0) {
        return "OVER";
    }

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}