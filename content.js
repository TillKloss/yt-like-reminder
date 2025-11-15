let reminded = false;
let lastVideoId = null;

// Popup erstellen
function showReminder() {
    if (document.getElementById("likeReminderBox")) return;

    const box = document.createElement("div");
    box.id = "likeReminderBox";
    box.style.position = "fixed";
    box.style.bottom = "-150px";
    box.style.right = "20px";
    box.style.zIndex = "999999";
    box.style.background = "#202020";
    box.style.color = "white";
    box.style.padding = "15px 20px";
    box.style.borderRadius = "10px";
    box.style.boxShadow = "0 0 12px rgba(0,0,0,0.6)";
    box.style.fontFamily = "Arial";
    box.style.opacity = "0";
    box.style.transition = "all 0.45s ease";
    box.style.display = "flex";
    box.style.flexDirection = "row";
    box.style.gap = "12px";
    box.style.alignItems = "center";

    const text = document.createElement("div");
    text.innerText = "Willst du das Video liken?";
    text.style.fontSize = "15px";
    text.style.fontWeight = "bold";

    const close = document.createElement("button");
    close.innerText = "✖";
    close.style.background = "transparent";
    close.style.border = "none";
    close.style.color = "white";
    close.style.fontSize = "18px";
    close.style.cursor = "pointer";
    close.onclick = () => box.remove();

    box.appendChild(text);
    box.appendChild(close);
    document.body.appendChild(box);

    // Animation rein
    setTimeout(() => {
        box.style.opacity = "1";
        box.style.bottom = "20px";
    }, 30);

    // Nach 10 Sekunden automatisch entfernen
    setTimeout(() => {
        if (box) box.remove();
    }, 10000);
}

// Fortschritt prüfen
function checkProgress() {
    const video = document.querySelector("video");
    if (!video) return;

    const duration = video.duration;
    const current = video.currentTime;

    if (duration > 0 && current / duration >= 0.8 && !reminded) {
        reminded = true;
        showReminder();
    }
}

// Video-Wechsel erkennen
function initWatcher() {
    setInterval(() => {
        const id = getVideoId();

        if (id !== lastVideoId) {
            lastVideoId = id;
            reminded = false;

            const old = document.getElementById("likeReminderBox");
            if (old) old.remove();
        }

        checkProgress();
    }, 1000);
}

function getVideoId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("v");
}

// Bei YouTube-Seitenwechsel auch zurücksetzen
window.addEventListener("yt-page-data-updated", () => {
    reminded = false;
    lastVideoId = getVideoId();

    const old = document.getElementById("likeReminderBox");
    if (old) old.remove();
});

initWatcher();
