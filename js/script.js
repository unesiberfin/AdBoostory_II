const track = document.querySelector('.gallery-track');

// ==========banner cards==========

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const offset = scrollY * 0.4; // speed of sideways scroll
  track.style.transform = `translateX(-${offset}px)`;
});

// =====sliding deck cards=======

const cards = [...track.children];
cards.forEach(card => {
  const clone = card.cloneNode(true);
  track.appendChild(clone);
});

// =========Packages=======

/* Interactive Package Tabs */
const tabs = document.querySelectorAll(".package-tab");
const contents = document.querySelectorAll(".package-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // Remove active classes
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    // Add active to clicked
    tab.classList.add("active");

    const target = tab.getAttribute("data-target");
    document.getElementById(target).classList.add("active");
  });
});


// =====about=====
// ===== Scroll-based reveal animations =====
const revealEls = document.querySelectorAll('.reveal-on-scroll');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // optional: stop observing after first reveal
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}


// ===== small parallax effect for about hero cards =====
const aboutStack = document.querySelector('.about-card-stack');

if (aboutStack) {
  aboutStack.addEventListener('mousemove', (e) => {
    const rect = aboutStack.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const cards = aboutStack.querySelectorAll('.about-card');
    cards.forEach((card, index) => {
      const depth = (index + 1) * 6;
      card.style.transform =
        `translate(${x * depth}px, ${y * depth}px) rotate(${(index === 0 ? -6 : index === 1 ? 5 : -3)}deg)`;
    });
  });

  aboutStack.addEventListener('mouseleave', () => {
    const cards = aboutStack.querySelectorAll('.about-card');
    cards[0].style.transform = 'rotate(-6deg)';
    cards[1].style.transform = 'rotate(5deg)';
    cards[2].style.transform = 'rotate(-3deg)';
  });
}


// =====awhat we do scroll=====
const wwdRows = document.querySelectorAll(".wwd-row");

wwdRows.forEach((row, index) => {
  const track = row.querySelector(".wwd-track");
  if (!track) return;

  // --- 1) Clone items until we have at least 2× row width ---
  const originalItems = [...track.children];
  let contentWidth = track.scrollWidth;
  const rowWidth = row.offsetWidth;

  // safety cap so we don't clone forever
  let loops = 0;
  while (contentWidth < rowWidth * 2 && loops < 6) {
    originalItems.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
    contentWidth = track.scrollWidth;
    loops++;
  }

  // --- 2) Set animation direction per row (top: left, bottom: right) ---
  track.style.animation = index % 2 === 0
    ? "wwd-left 24s linear infinite"
    : "wwd-right 24s linear infinite";

  // --- 3) Drag / grab to scroll manually ---
  let isDown = false;
  let startX;
  let scrollLeft;

  row.addEventListener("mousedown", e => {
    isDown = true;
    row.classList.add("dragging");
    startX = e.pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
  });

  row.addEventListener("mouseleave", () => {
    isDown = false;
    row.classList.remove("dragging");
  });

  row.addEventListener("mouseup", () => {
    isDown = false;
    row.classList.remove("dragging");
  });

  row.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - row.offsetLeft;
    const walk = (x - startX) * 1.2; // drag speed
    row.scrollLeft = scrollLeft - walk;
  });
});



// Contact form

// Initialize EmailJS
emailjs.init("xYSh-Eo7kpF6QY-Z5"); // Your public key

// Handle form submission
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.send("service_kups8ea", "template_23r1nte", {
    name: document.querySelector("input[name='name']").value,
    email: document.querySelector("input[name='email']").value,
    message: document.querySelector("textarea[name='message']").value
  })
  .then(function(response) {
    alert("Your message has been sent successfully!");
    console.log("SUCCESS:", response);

    // Reset form
    document.querySelector(".contact-form").reset();
  }, function(error) {
    alert("Oops! Something went wrong. Check the console for details.");
    console.log("FAILED:", error);
  });
});
