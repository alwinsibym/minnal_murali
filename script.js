// Poster Parallax & Interaction
const sky = document.getElementById("layerSky");
const city = document.getElementById("layerCity");
const hero = document.getElementById("layerHero");
const logo = document.getElementById("posterLogo");
const footer = document.getElementById("posterFooter");

window.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 25;
    const y = (e.clientY - window.innerHeight / 2) / 25;

    // Logo - Front floating
    logo.style.transform = `translateX(-50%) translateZ(150px) rotateY(${x * 0.4}deg) rotateX(${-y * 0.4}deg)`;
    
    // Character - Middle Pop
    hero.style.transform = `translateZ(50px) translate3d(${x * 0.8}px, ${y * 0.8}px, 0)`;
    
    // City - Receding
    city.style.transform = `translateZ(-150px) translate3d(${-x * 0.2}px, ${-y * 0.2}px, 0) scale(1.2)`;
    
    // Sky - Deep Space
    sky.style.transform = `translateZ(-300px) translate3d(${-x * 0.1}px, ${-y * 0.1}px, 0) scale(1.5)`;
    
    // Footer
    footer.style.transform = `translateX(-50%) translateZ(100px) translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
});

// Sound Manager
const audio = new Audio("BGM.mp3");
audio.loop = true;
let isPlaying = false;

document.getElementById("muteButton").addEventListener("click", () => {
    const icon = document.getElementById("soundIcon");
    if (!isPlaying) {
        audio.play().catch(err => console.log("Init required"));
        icon.classList.replace("fa-volume-off", "fa-volume-up");
    } else {
        audio.pause();
        icon.classList.replace("fa-volume-up", "fa-volume-off");
    }
    isPlaying = !isPlaying;
});

// Lightning
const flash = document.getElementById("lightningFlash");
function strike() {
    if (Math.random() > 0.97) {
        flash.style.opacity = "0.4";
        setTimeout(() => { flash.style.opacity = "0"; }, 80);
    }
}
setInterval(strike, 2000);