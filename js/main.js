// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  })

  // Preloader
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none"
  }, 1000)

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0"
      navbar.style.boxShadow = "var(--shadow)"
    } else {
      navbar.style.padding = "15px 0"
      navbar.style.boxShadow = "var(--shadow-sm)"
    }
  })

  // Active Navigation Link
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Typewriter Effect
  const typewriter = document.querySelector(".typewriter")
  if (typewriter) {
    const phrases = ["Software Engineer", "Full Stack Developer"]
    let currentPhrase = 0
    const i = 0
    let isDeleting = false
    let text = ""

    typewriter.textContent = ""

    function type() {
      // Current phrase
      const fullText = phrases[currentPhrase]

      // If deleting, remove a character, else add a character
      if (isDeleting) {
        text = fullText.substring(0, text.length - 1)
      } else {
        text = fullText.substring(0, text.length + 1)
      }

      // Set the text
      typewriter.textContent = text

      // Typing speed
      let typeSpeed = isDeleting ? 50 : 100

      // If complete phrase, start deleting after pause
      if (!isDeleting && text === fullText) {
        typeSpeed = 1500 // Pause at end of phrase
        isDeleting = true
      } else if (isDeleting && text === "") {
        isDeleting = false
        // Move to next phrase or back to first
        currentPhrase = (currentPhrase + 1) % phrases.length
        typeSpeed = 500 // Pause before typing next phrase
      }

      setTimeout(type, typeSpeed)
    }

    // Start typing
    setTimeout(type, 1000)
  }

  // Progress Bar Animation
  const progressBars = document.querySelectorAll(".progress-bar")

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"
      setTimeout(() => {
        bar.style.width = width
      }, 500)
    })
  }

  // Trigger progress bar animation when skills section is in view
  const skillsSection = document.getElementById("skills")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBars()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  if (skillsSection) {
    observer.observe(skillsSection)
  }

  // Form Submission with Formspree
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Let the form submit naturally to Formspree
      // Show a loading state on the button
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Re-enable the button after a delay (in case of errors)
      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 5000)
    })
  }

  // Experience & Education animations
  const experienceSection = document.getElementById("experience")
  const timelines = document.querySelectorAll(".timeline")
  const timelineItems = document.querySelectorAll(".timeline-item")

  const experienceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the timeline progress bar
          timelines.forEach((timeline) => {
            timeline.classList.add("animate")
          })

          // Animate timeline items with delay
          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("animate")
            }, 300 * index)
          })

          experienceObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  if (experienceSection) {
    experienceObserver.observe(experienceSection)
  }
})
