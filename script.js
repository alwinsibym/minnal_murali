// 3D Parallax Orchestrator
const logoCard = document.getElementById("logoCard");
const layerChar = document.getElementById("layerChar");
const layerMid = document.getElementById("layerMid");
const layerBg = document.getElementById("layerBg");

window.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 20;
    const y = (e.clientY - window.innerHeight / 2) / 20;

    // Logo Card - Aggressive Tilt
    logoCard.style.transform = `translateZ(200px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg)`;
    
    // Character Layer - POP OUT 3D
    layerChar.style.transform = `translateZ(80px) translate3d(${x * 0.8}px, ${y * 0.8}px, 0)`;
    
    // Mid Layer - Environment Parallax
    layerMid.style.transform = `translateZ(-100px) translate3d(${-x * 0.3}px, ${-y * 0.3}px, 0) scale(1.2)`;
    
    // Background Layer - Deep Space
    layerBg.style.transform = `translateZ(-250px) translate3d(${-x * 0.15}px, ${-y * 0.15}px, 0) scale(1.5)`;
});

// Sound Manager
const audio = new Audio("BGM.mp3");
audio.loop = true;
let isPlaying = false;

document.getElementById("muteButton").addEventListener("click", () => {
    const icon = document.getElementById("soundIcon");
    if (!isPlaying) {
        audio.play();
        icon.classList.replace("fa-volume-off", "fa-volume-up");
    } else {
        audio.pause();
        icon.classList.replace("fa-volume-up", "fa-volume-off");
    }
    isPlaying = !isPlaying;
});

// Reveal Triggers
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
    });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Lightning Trigger
const flash = document.getElementById("lightningFlash");
function strike() {
    if (Math.random() > 0.95) {
        flash.style.opacity = "0.5";
        setTimeout(() => { flash.style.opacity = "0"; }, 70);
    }
}
setInterval(strike, 3000);