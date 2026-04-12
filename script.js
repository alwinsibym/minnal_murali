// 3D & Live Effects Manager
const logo3D = document.getElementById("logo3D");
const navbar = document.getElementById("navbar");
const flash = document.getElementById("lightningFlash");
const bgm = document.getElementById("bgm");
const soundToggle = document.getElementById("soundToggle");
const vizBars = document.querySelectorAll(".viz-bar");

// 1. 3D Logo Tilt Interaction
window.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 20;
    const y = (e.clientY - window.innerHeight / 2) / 20;

    if (logo3D) {
        logo3D.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    }
});

// 2. Live Lightning Effects
function triggerLightning() {
    if (Math.random() > 0.98) {
        flash.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        setTimeout(() => {
            flash.style.backgroundColor = "rgba(255, 255, 255, 0)";
            // Potential double strike
            if (Math.random() > 0.5) {
                setTimeout(() => {
                    flash.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    setTimeout(() => flash.style.backgroundColor = "rgba(255, 255, 255, 0)", 50);
                }, 100);
            }
        }, 100);
    }
}
setInterval(triggerLightning, 2000);

// 3. Live Music Logic
let isPlaying = false;
soundToggle.addEventListener("click", () => {
    if (!isPlaying) {
        bgm.play().catch(() => console.log("User interaction required"));
        vizBars.forEach(bar => bar.classList.add("playing"));
    } else {
        bgm.pause();
        vizBars.forEach(bar => bar.classList.remove("playing"));
    }
    isPlaying = !isPlaying;
});

// 4. Navbar Scroll Effect (Blur)
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 5. Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Home Navigation Redirect Logic
document.querySelector(".nav-logo").addEventListener("click", (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});