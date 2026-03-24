document.addEventListener("DOMContentLoaded", () => {
  // Detect Safari browser
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Initialize Lenis Smooth Scrolling (disable on Safari as requested)
  if (typeof Lenis !== "undefined" && !isSafari) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links gracefully with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId !== "#" && targetId.length > 1) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement);
          }
        }
      });
    });
  } else if (isSafari) {
    // Safe native fallback for Safari
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId !== "#" && targetId.length > 1) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  // Initialize AOS Animation Library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }

  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  // Helper to close the menu
  function closeMenu() {
    burger.classList.remove("active");
    nav.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Burger toggle logic
  if (burger && nav) {
    burger.addEventListener("click", (e) => {
      e.preventDefault();
      burger.classList.toggle("active");
      nav.classList.toggle("active");

      // Prevent background scrolling when menu is open
      if (nav.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking on the empty background area
    nav.addEventListener("click", (e) => {
      if (e.target === nav) {
        closeMenu();
      }
    });
  }
});
