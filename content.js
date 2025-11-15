let reminded = false;
let lastVideoId = null;

const createEl = (tag, props = {}, styles = {}) => {
    const el = document.createElement(tag);
    Object.assign(el, props);
    Object.assign(el.style, styles);
    return el;
};

function showReminder() {
    if (document.getElementById("likeReminderBox")) return;

    const box = createEl("div", { id: "likeReminderBox" }, {
        position: "fixed",
        bottom: "-150px",
        right: "20px",
        zIndex: 999999,
        background: "#202020",
        color: "#fff",
        padding: "15px 20px",
        borderRadius: "10px",
        boxShadow: "0 0 12px rgba(0,0,0,0.6)",
        fontFamily: "Arial",
        opacity: 0,
        transition: "all .45s ease",
        display: "flex",
        alignItems: "center",
        gap: "12px"
    });

    const text = createEl("div", {
        innerText: "Willst du das Video liken?"
    }, {
        fontSize: "15px",
        fontWeight: "bold"
    });

    const close = createEl("button", {
        innerText: "✖",
        onclick: () => box.remove()
    }, {
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "18px",
        cursor: "pointer"
    });

    box.append(text, close);
    document.body.appendChild(box);

    setTimeout(() => {
        box.style.opacity = "1";
        box.style.bottom = "20px";
    }, 30);

    setTimeout(() => box.remove(), 10000);
}

function checkProgress() {
    const video = document.querySelector("video");
    if (!video) return;

    if (video.duration && video.currentTime / video.duration >= 0.8 && !reminded) {
        reminded = true;
        showReminder();
    }
}

function initWatcher() {
    setInterval(() => {
        const id = new URLSearchParams(location.search).get("v");

        if (id !== lastVideoId) {
            lastVideoId = id;
            reminded = false;
            document.getElementById("likeReminderBox")?.remove();
        }

        checkProgress();
    }, 1000);
}

window.addEventListener("yt-page-data-updated", () => {
    reminded = false;
    lastVideoId = new URLSearchParams(location.search).get("v");
    document.getElementById("likeReminderBox")?.remove();
});

initWatcher();
