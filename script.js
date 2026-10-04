const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("music");
const soundBtn = document.getElementById("soundBtn");

openBtn.addEventListener("click", async () => {
  loader.style.transition = "opacity .8s ease, transform .8s ease";
  loader.style.opacity = "0";
  loader.style.transform = "scale(1.04)";
  setTimeout(() => {
    loader.style.display = "none";
    invitation.classList.remove("hidden");
    document.body.style.overflow = "auto";
    observeReveals();
  }, 750);

  try {
    await music.play();
    soundBtn.textContent = "♫";
  } catch (e) {
    soundBtn.textContent = "♪";
  }
});

soundBtn.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); } catch (e) {}
    soundBtn.textContent = "♫";
  } else {
    music.pause();
    soundBtn.textContent = "♪";
  }
});

function observeReveals() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}

// Dummy wedding countdown: 15 Dec 2026, 10:30 AM IST
const weddingDate = new Date("2026-12-15T10:30:00+05:30").getTime();

function updateCountdown() {
  const diff = weddingDate - Date.now();
  if (diff <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById("days").textContent = String(days).padStart(2,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);
