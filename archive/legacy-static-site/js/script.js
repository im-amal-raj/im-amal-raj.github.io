// --- 1. SPOTLIGHT EFFECT (Optimized with rAF) ---

// This function is perfect as-is. It does the DOM work.
const updateSpotlight = (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  // We use document.documentElement to set it on the <html> tag
  document.documentElement.style.setProperty("--mouse-x", `${mouseX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${mouseY}px`);
};

// --- rAF Optimization ---
let lastMoveEvent = null; // Stores the latest mouse event
let ticking = false;      // A flag to ensure we don't request multiple frames

/**
 * The function that will be called by requestAnimationFrame.
 * It runs our DOM update and resets the 'ticking' flag.
 */
function handleAnimationFrame() {
  if (lastMoveEvent) {
    updateSpotlight(lastMoveEvent); // Run our DOM update
  }
  ticking = false; // We are no longer 'ticking', ready for the next event
}

/**
 * The event listener for 'mousemove'.
 * This is now extremely fast. It just saves the event
 * and requests an animation frame if one isn't already pending.
 */
function onMouseMove(e) {
  lastMoveEvent = e; // Store the latest event
  if (!ticking) {
    // If we're not already waiting for a frame, request one.
    window.requestAnimationFrame(handleAnimationFrame);
    ticking = true; // Mark that we are waiting for a frame
  }
}

// Listen for mouse movement
document.addEventListener("mousemove", onMouseMove);


// --- 2. PAGE LOAD BEHAVIOR ---
// This is also great. It clears any #hash from the URL on load.

window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, null, " "); // clears the #hash
  }
  window.scrollTo({ top: 0, behavior: "auto" });
});


// --- 3. ALL DOM-READY LOGIC ---
// We combine BOTH of your 'DOMContentLoaded' functions into ONE.

document.addEventListener("DOMContentLoaded", () => {
  // --- FADE-IN ANIMATION (Your code, which is great) ---
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeElements.forEach((element) => fadeObserver.observe(element));

  // --- OPTIMIZED ACTIVE NAVIGATION (Replaces your 'scroll' listener) ---
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When a section is 50% visible...
        if (entry.isIntersecting) {
          // Get the ID of the visible section
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          // Remove 'active' from all links
          navLinks.forEach((link) => link.classList.remove("active"));
          // Add 'active' to the one that matches the visible section
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.5 // Triggers when 50% of the section is in view
    }
  );

  // Tell the navObserver to watch all your <section> elements
  sections.forEach((section) => navObserver.observe(section));

  // --- CLICK TO SET ACTIVE (Keeps the sidebar snappy) ---
  // We keep this so the link becomes active *immediately* on click,
  // before the scroll has even finished.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});