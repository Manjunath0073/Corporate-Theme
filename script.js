const aboutContent = document.querySelector(".about-right");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // run only once
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3
});

if (aboutContent) {
  observer.observe(aboutContent);
}



// ================= STATS COUNTER =================

const statsSection = document.querySelector(".stats");
const counters = document.querySelectorAll(".counter");

if (statsSection && counters.length > 0) {

  let started = false;

  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {

      if (entry.isIntersecting && !started) {

        counters.forEach(counter => {
          const target = +counter.getAttribute("data-target");
          let count = 0;

          const duration = 1200; // total animation time
          const step = target / (duration / 16);

          const update = () => {
            count += step;

            if (count < target) {
              counter.innerText = Math.floor(count);
              requestAnimationFrame(update);
            } else {
              counter.innerText = target;
            }
          };

          update();
        });

        statsSection.classList.add("active");

        started = true;
        obs.unobserve(entry.target);
      }

    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}


const processLine = document.querySelector(".process-line");
const processSteps = document.querySelectorAll(".process-step");

const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Animate line
      processLine.classList.add("active");

      // Animate steps one by one
      processSteps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add("show");
        }, index * 250);
      });

    }
  });
}, { threshold: 0.3 });

if (processLine) {
  processObserver.observe(processLine);
}

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  if (!loader) return; // 🔥 prevents errors on other pages

  setTimeout(() => {
    loader.classList.add("hide");
  }, 1800);
});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  const isClickInside =
    navLinks.contains(e.target) || menuBtn.contains(e.target);

  if (!isClickInside) {
    navLinks.classList.remove("active");
  }
});