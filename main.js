
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");


menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.innerHTML = `<i class="fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}"></i>`;
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});


function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  themeIcon.className = `fa-regular ${isDark ? "fa-sun" : "fa-moon"}`;

  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

setTheme(localStorage.getItem("portfolio-theme") === "dark");

themeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});


const typingText = document.getElementById("typingText");

const words = [
  "Frontend Developer",
  "React Developer",
  "Web Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  const word = words[wordIndex];

  typingText.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeWriter, 100);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, 45);
  } else {
    deleting = !deleting;

    if (!deleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeWriter, 800);
  }
}

typeWriter();


const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, { rootMargin: "-30% 0px -60% 0px" });

document.querySelectorAll("main section[id]").forEach(section => {
  sectionObserver.observe(section);
});


document.getElementById("year").textContent = new Date().getFullYear();
