// 3D Parallax & Interaction Manager
const hero = document.getElementById("hero");
const heroLogo = document.getElementById("heroLogo");
const bgLayer = document.querySelector(".hero-bg-layer");
const midLayer = document.querySelector(".hero-mid-layer");

// Mouse Move - 3D Tilt & Parallax
window.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 30;
    const y = (e.clientY - window.innerHeight / 2) / 30;

    // Tilt the logo box
    heroLogo.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateZ(50px)`;
    
    // Parallax layers
    bgLayer.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, -200px)`;
    midLayer.style.transform = `translate3d(${-x * 0.2}px, ${-y * 0.2}px, -100px)`;
});

// Sound Manager
const audio = new Audio("BGM.mp3");
audio.loop = true;
let isPlaying = false;
const playBtn = document.getElementById("mainPlayBtn");
const soundIcon = document.getElementById("soundIcon");

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
        soundIcon.classList.replace("fa-volume-up", "fa-volume-off");
    } else {
        audio.play().catch(e => console.log("Init required"));
        playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
        soundIcon.classList.replace("fa-volume-off", "fa-volume-up");
    }
    isPlaying = !isPlaying;
});

document.getElementById("muteButton").addEventListener("click", () => playBtn.click());

// Reveal Observer - Smooth Transitions
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// 3D Lightning Flash Effect
const lightning = document.getElementById("lightningFlash");
function strike() {
    if (Math.random() > 0.97) {
        lightning.style.opacity = "0.6";
        setTimeout(() => {
            lightning.style.opacity = "0";
            if (Math.random() > 0.5) setTimeout(strike, 100); // Pulse strike
        }, 50);
    }
}
setInterval(strike, 2000);

// Navbar Scroll
window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 50) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
});

// Track switching
document.querySelectorAll(".track-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".track-item").forEach(t => t.classList.remove("active"));
        item.classList.add("active");
        if (!isPlaying) playBtn.click();
    });
});