function fortfahren() {
    localStorage.setItem("uic_task1done", "true");
    window.location.assign("/System/pause.html");
}
var clicks = 0;
var timer = 30;
var intervalId = null;
var timerId = null;
var meter = document.querySelector("meter");
meter.value = timer;
meter.max = 30; // Optional: max kann beliebig sein, dient nur der Anzeige

function geklickt() {
    clicks++;
    
}

function startGame() {
    intervalId = setInterval(function() {
        // Optional: Meter kann für Klicks genutzt werden
        meter.value = timer;
    }, 100);

    timerId = setInterval(function() {
        timer--;
        meter.value = timer;
        if (timer <= 0) {
            clearInterval(intervalId);
            clearInterval(timerId);
            spielBeenden();
        }
    }, 1000);
}

async function spielBeenden() {
    // Lobby und Spielername aus localStorage holen
    const lobby = localStorage.getItem("uic_gamepin") || "1111";
    const player = localStorage.getItem("uic_name") || "Name";
    try {
        await fetch(`https://kk-backend.vercel.app/addPointsToPlayer?lobby=${localStorage.getItem("uic_gamepin")}&spieler=${localStorage.getItem("uic_username")}&punkte=${clicks}`,);
        window.location.assign("/System/pause.html");
    } catch (e) {
        alert("Fehler beim Übertragen der Punkte!");
        window.location.assign("/System/pause.html");
    }
}

// Spielstart nach Laden der Seite
window.onload = startGame;
