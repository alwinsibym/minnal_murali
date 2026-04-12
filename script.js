// Minnal Murali: Requiem Interface Manager
const logo3D = document.getElementById("logo3D");
const mainLogo = document.querySelector(".main-logo");
const flash = document.getElementById("lightningFlash");
const bgm = document.getElementById("bgmAudio");
const soundToggle = document.getElementById("soundToggle");
const playMain = document.getElementById("playMain");
const dots = document.querySelectorAll(".nav-dot");
const sections = document.querySelectorAll("section");

// 1. 3D Interaction Logic
window.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 25;
    const y = (e.clientY - window.innerHeight / 2) / 25;

    if (mainLogo) {
        mainLogo.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    }
    
    // Subtle HUD flicker logic
    if (Math.random() > 0.99) {
        document.querySelector(".hud-layer").style.opacity = Math.random() * 0.5 + 0.5;
        setTimeout(() => document.querySelector(".hud-layer").style.opacity = 1, 50);
    }
});

// 2. Scroll-Snap Sync (Side Dots)
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");
        }
    });
}, { threshold: 0.6 });

sections.forEach(section => scrollObserver.observe(section));

// Side Dot Click to Scroll
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// 3. Audio & Live Music Logic
let isPlaying = false;
function toggleAudio() {
    if (!isPlaying) {
        bgm.play().catch(() => console.log("Init required"));
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> AUDIO_ON';
        if (playMain) playMain.innerHTML = '<i class="fas fa-pause-circle"></i>';
    } else {
        bgm.pause();
        soundToggle.innerHTML = '<i class="fas fa-volume-off"></i> AUDIO_OFF';
        if (playMain) playMain.innerHTML = '<i class="fas fa-play-circle"></i>';
    }
    isPlaying = !isPlaying;
}

soundToggle.addEventListener("click", toggleAudio);
if (playMain) playMain.addEventListener("click", toggleAudio);

// 4. Randomized Lightning Strikes
function triggerStrike() {
    if (Math.random() > 0.97) {
        flash.style.opacity = "0.5";
        setTimeout(() => {
            flash.style.opacity = "0";
            if (Math.random() > 0.5) {
                setTimeout(() => {
                    flash.style.opacity = "0.3";
                    setTimeout(() => flash.style.opacity = "0", 60);
                }, 100);
            }
        }, 80);
    }
}
setInterval(triggerStrike, 3000);

// Smooth logo scroll to home
document.querySelector(".nav-logo").addEventListener("click", (e) => {
    e.preventDefault();
    sections[0].scrollIntoView({ behavior: 'smooth' });
});