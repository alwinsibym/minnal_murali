// Sound Manager & Media Player
const audio = new Audio("BGM.mp3");
audio.loop = true;
let isPlaying = false;

const mainPlayBtn = document.getElementById("mainPlayBtn");
const muteBtn = document.getElementById("muteButton");
const soundIcon = document.getElementById("soundIcon");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const trackItems = document.querySelectorAll(".track-item");
const trackTitle = document.getElementById("currentTrackTitle");

const togglePlay = () => {
    if (isPlaying) {
        audio.pause();
        mainPlayBtn.classList.replace("fa-pause-circle", "fa-play-circle");
        soundIcon.classList.replace("fa-volume-up", "fa-volume-off");
    } else {
        audio.play().catch(e => console.log("User interaction required"));
        mainPlayBtn.classList.replace("fa-play-circle", "fa-pause-circle");
        soundIcon.classList.replace("fa-volume-off", "fa-volume-up");
    }
    isPlaying = !isPlaying;
};

mainPlayBtn.addEventListener("click", togglePlay);
muteBtn.addEventListener("click", togglePlay);

// Track Switching logic
trackItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        trackItems.forEach(t => t.classList.remove("active"));
        item.classList.add("active");
        trackTitle.innerText = item.querySelector("h4").innerText;
        
        // In a real app, you'd change the audio.src here
        if (!isPlaying) togglePlay();
    });
});

// Simulate Progress Bar
setInterval(() => {
    if (isPlaying) {
        let currentWidth = parseFloat(progressBar.style.width) || 45;
        if (currentWidth >= 100) currentWidth = 0;
        progressBar.style.width = (currentWidth + 0.1) + "%";
        
        // Update dummy time
        let sec = Math.floor((currentWidth / 100) * 225); // 3:45 total
        let min = Math.floor(sec / 60);
        let remSec = sec % 60;
        currentTimeEl.innerText = `${min}:${remSec.toString().padStart(2, '0')}`;
    }
}, 500);

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Reveal Animations (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Add a slight stagger effect if needed
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Lightning Bolt Generator (Enhanced)
const lightning = document.getElementById("lightningFlash");
const flashImpact = () => {
    const chance = Math.random();
    if (chance > 0.96) {
        lightning.style.background = "white";
        lightning.style.opacity = "0.4";
        setTimeout(() => {
            lightning.style.opacity = "0";
            if (Math.random() > 0.5) setTimeout(flashImpact, 100); // Double strike
        }, 80);
    }
};
setInterval(flashImpact, 3000);

// Countdown Timer
const targetDate = new Date("Dec 24, 2025 00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff < 0) {
        document.getElementById("countdown").innerHTML = "OUT NOW";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Parallax Hero
const heroBg = document.querySelector(".hero-bg");
window.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    heroBg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
});