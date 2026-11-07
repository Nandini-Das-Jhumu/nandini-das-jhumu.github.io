
document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio JavaScript loaded!");

    // Typing animation
    const typingText = document.getElementById("typing-text");

    if (!typingText) {
        console.error("Typing element not found!");
        return;
    }

    const roles = [
        "AI & Machine Learning Enthusiast",
        "Aspiring AI Researcher",
        "Software Developer",
        "Creative Problem Solver",
        "Robotics Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentRole.substring(0, charIndex);

        let speed = deleting ? 40 : 80;

        if (!deleting && charIndex === currentRole.length) {
            deleting = true;
            speed = 1500;
        }

        else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // Scroll reveal animations
    const revealElements = document.querySelectorAll(
        '.section-label, .section h2, .about-content, .passion-card, .skill-group, .project-card, .contact-section > p'
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.transitionDelay = `${(index % 4) * 100}ms`;
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }
// ACTIVE NAVIGATION ON SCROLL

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".header nav a[href^='#']");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${currentId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0,
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => navObserver.observe(section));
});
// Mobile tap effects for Passion and Project cards
document.querySelectorAll(".passion-card, .project-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("mobile-active");
    });
});
// ==============================
// PORTFOLIO INTERACTION SOUNDS
// ==============================

let audioContext;

function playSoftSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(1046.5, now);
    oscillator.frequency.exponentialRampToValueAtTime(1568, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.45);
}
// Play sound when interacting with cards
document.querySelectorAll(".passion-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        playSoftSound(650);
    });
});

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        playSoftSound(500);
    });
});

// Sound on mobile tap
document.querySelectorAll(".passion-card, .project-card").forEach(card => {
    card.addEventListener("click", () => {
        playSoftSound(600);
    });
});

// ==============================
// AI NEURAL NETWORK ANIMATION
// ==============================

const neuralCanvas = document.getElementById("neuralCanvas");
const neuralCtx = neuralCanvas.getContext("2d");

let neuralNodes = [];
let animationFrame;


function setupNeuralNetwork() {
    neuralCanvas.width = neuralCanvas.offsetWidth;
    neuralCanvas.height = neuralCanvas.offsetHeight;

    const width = neuralCanvas.width;
    const height = neuralCanvas.height;

    neuralNodes = [];

    const nodeCount = window.innerWidth < 650 ? 25 : 45;

    for (let i = 0; i < nodeCount; i++) {
        neuralNodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: Math.random() * 2 + 1
        });
    }
}

function drawNeuralNetwork() {
    const width = neuralCanvas.width;
    const height = neuralCanvas.height;

    neuralCtx.clearRect(0, 0, width, height);
    
    // Central AI Core - Interactive Mouse Response
    const coreX = width * 0.72;
    const coreY = height * 0.5;
    const corePulse = 8 + Math.sin(Date.now() / 500) * 2;

    // Outer glow
    neuralCtx.beginPath();
    neuralCtx.arc(coreX, coreY, corePulse * 2.5, 0, Math.PI * 2);

    const coreGlow = neuralCtx.createRadialGradient(
        coreX, coreY, 1,
        coreX, coreY, corePulse * 2.5
    );

    coreGlow.addColorStop(0, "rgba(217, 189, 145, 0.35)");
    coreGlow.addColorStop(1, "rgba(182, 154, 245, 0)");

    neuralCtx.fillStyle = coreGlow;
    neuralCtx.fill();

    // Bright central node
    neuralCtx.beginPath();
    neuralCtx.arc(coreX, coreY, corePulse, 0, Math.PI * 2);

    neuralCtx.fillStyle = "#d9bd91";
    neuralCtx.shadowBlur = 25;
    neuralCtx.shadowColor = "#d9bd91";
    neuralCtx.fill();

    neuralCtx.shadowBlur = 0;

    neuralNodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        neuralNodes.slice(i + 1).forEach(other => {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                neuralCtx.beginPath();
                neuralCtx.moveTo(node.x, node.y);
                neuralCtx.lineTo(other.x, other.y);

                neuralCtx.strokeStyle =
                    `rgba(182, 154, 245, ${0.18 * (1 - distance / 150)})`;

                neuralCtx.lineWidth = 1;
                neuralCtx.stroke();

                // Golden data pulse
                const pulse = (Date.now() % 2500) / 2500;

                neuralCtx.beginPath();
                neuralCtx.arc(
                    node.x + (other.x - node.x) * pulse,
                    node.y + (other.y - node.y) * pulse,
                    2,
                    0,
                    Math.PI * 2
                );

                neuralCtx.fillStyle = "#d9bd91";
                neuralCtx.shadowBlur = 10;
                neuralCtx.shadowColor = "#d9bd91";
                neuralCtx.fill();
                neuralCtx.shadowBlur = 0;
                            }
                        });

                        neuralCtx.beginPath();
                        neuralCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

                        neuralCtx.fillStyle = "#b69af5";
                        neuralCtx.shadowBlur = 12;
                        neuralCtx.shadowColor = "#b69af5";
                        neuralCtx.fill();

                        neuralCtx.shadowBlur = 0;
    });

    animationFrame = requestAnimationFrame(drawNeuralNetwork);
}

setupNeuralNetwork();
drawNeuralNetwork();

window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    setupNeuralNetwork();
    drawNeuralNetwork();
});

// ==============================
// ONE-TIME WELCOME INTRO
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    const welcomeIntro = document.getElementById("welcomeIntro");

    if (!welcomeIntro) return;

    // Check whether the welcome animation has already played
    if (sessionStorage.getItem("welcomePlayed")) {
        welcomeIntro.remove();
        return;
    }

    // Remember that the animation has played
    sessionStorage.setItem("welcomePlayed", "true");

    // Remove the welcome screen after the animation
    setTimeout(() => {
        welcomeIntro.remove();
    }, 4200);

});