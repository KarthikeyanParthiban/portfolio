// Smooth Scrolling with Offset
function smoothScrollTo(targetId, offset = 0) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    console.error(`Target element with ID "${targetId}" not found.`);
    return;
  }

  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

document.querySelectorAll('.nav-links a, .scroll-button').forEach((element) => {
  element.addEventListener('click', function (e) {
    e.preventDefault();

    let targetId;
    if (this.tagName.toLowerCase() === 'a') {
      targetId = this.getAttribute('href').substring(1); // Get target ID from href attribute
    } else if (this.tagName.toLowerCase() === 'button') {
      targetId = this.getAttribute('data-target'); // Get target ID from data-target attribute
    }

    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    smoothScrollTo(targetId, navbarHeight);
  });
});

// Canvas Setup
const canvas = document.getElementById('space-canvas');
if (!canvas) {
  console.error('Canvas element not found!');
} else {
  const ctx = canvas.getContext('2d');

  // Set Canvas Dimensions
  function resizeCanvas() {
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(scale, scale);
  }
  resizeCanvas();

  // Stars Array
  const stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
    });
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      star.y -= star.speed;

      // Reset Star Position When It Moves Out of View
      if (star.y < 0) {
        star.y = canvas.height;
        star.x = Math.random() * canvas.width;
      }

      // Draw the Star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Throttle Resize Events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100); // Delay resize events
  });
}

// Dynamic Blur Effect on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Responsive Navigation Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (!menuToggle || !navLinks) {
  console.error('Menu toggle or navigation links not found!');
} else {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));

    // Shift Focus to First Link When Menu Opens
    if (navLinks.classList.contains('active')) {
      const firstLink = navLinks.querySelector('a');
      firstLink?.focus();
    }
  });

  // Keyboard Navigation for Menu Toggle
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));

      if (navLinks.classList.contains('active')) {
        const firstLink = navLinks.querySelector('a');
        firstLink?.focus();
      }
    }
  });
}