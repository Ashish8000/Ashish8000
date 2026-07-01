document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // NAVIGATION: HEADER SHRINK & ACTIVE LINK SPY
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, #competencies');

  const handleScroll = () => {
    // Header shrink on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link update
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial call

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // TYPING ANIMATION (Ashish Chauhan <-> Tech Student)
  // ==========================================================================
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = ["Ashish Chauhan", "Tech Student"];
  let arrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const currentText = textArray[arrayIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        arrayIndex = (arrayIndex + 1) % textArray.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, 60);
      }
    } else {
      typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
      } else {
        setTimeout(typeEffect, 120);
      }
    }
  };

  if (typedTextSpan) {
    typeEffect();
  }

  // ==========================================================================
  // INTERACTIVE PYTHON TERMINAL SIMULATION
  // ==========================================================================
  const btnRun = document.getElementById('btn-run-code');
  const consoleOutput = document.getElementById('console-output');
  let isRunning = false;

  btnRun.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;

    // Button states
    btnRun.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running...';
    btnRun.style.opacity = '0.7';

    // Clear output and prepare
    consoleOutput.style.display = 'block';
    consoleOutput.innerHTML = '';
    consoleOutput.previousElementSibling.style.display = 'none'; // Hide placeholder comment

    const lines = [
      '[sandbox] python3 deep_learning_engineer.py',
      '>> Instantiating DeepLearningEngineer class...',
      '>> Injecting passion: "AI/ML & Microservices"',
      '>> Foundational skills compiled: C++, Python, DSA',
      '>> Specializations registered: Gradient Boosting, RFM Segmentation, FastAPI',
      '>> Calling objective()...',
      'OUTPUT: "Transform complex datasets into intelligent microservices."'
    ];

    let currentLineIndex = 0;

    const printLine = () => {
      if (currentLineIndex < lines.length) {
        const line = lines[currentLineIndex];
        const p = document.createElement('div');
        
        if (line.startsWith('[sandbox]')) {
          p.style.color = '#38bdf8';
        } else if (line.startsWith('>>')) {
          p.style.color = '#94a3b8';
        } else if (line.startsWith('OUTPUT:')) {
          p.style.color = '#34d399';
          p.style.fontWeight = 'bold';
        }

        consoleOutput.appendChild(p);
        
        // Typewriter effect per line
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex < line.length) {
            p.textContent += line[charIndex];
            charIndex++;
            setTimeout(typeChar, 15);
          } else {
            currentLineIndex++;
            setTimeout(printLine, 250);
          }
        };
        typeChar();
      } else {
        // Run complete
        btnRun.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Run Again';
        btnRun.style.opacity = '1';
        isRunning = false;
      }
    };

    setTimeout(printLine, 500); // Simulate initial loading latency
  });

  // ==========================================================================
  // PROGRESSIVE ENHANCEMENT: SCROLL ANIMATIONS FALLBACK & SKILLS IN VIEW
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.scroll-animate, .timeline-item');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  // Trigger skill bar percentage animation
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage;
    });
  };

  // Fallback for browsers that do not support native CSS view-timeline
  const supportsScrollTimeline = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  
  if (!supportsScrollTimeline) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // If this is the skills section or elements inside, trigger skill progress bars
          if (entry.target.id === 'skills' || entry.target.querySelector('.skill-bar-fill')) {
            animateSkillBars();
          }
        }
      });
    }, {
      threshold: 0.15
    });

    animatedElements.forEach(el => {
      el.classList.add('js-reveal');
      scrollObserver.observe(el);
    });
  } else {
    // If native CSS view-timeline is supported, we still need to trigger the width animation when skills enter
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  }

  // ==========================================================================
  // MOBILE MENU TOGGLE
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.querySelector('.nav-links');

  mobileToggle.addEventListener('click', () => {
    const isExpanded = navLinksList.style.display === 'flex';
    if (isExpanded) {
      navLinksList.style.display = 'none';
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
      navLinksList.style.display = 'flex';
      navLinksList.style.flexDirection = 'column';
      navLinksList.style.position = 'absolute';
      navLinksList.style.top = '100%';
      navLinksList.style.left = '0';
      navLinksList.style.width = '100%';
      navLinksList.style.background = 'var(--bg-secondary)';
      navLinksList.style.padding = '20px';
      navLinksList.style.borderBottom = '1px solid var(--glass-border)';
      mobileToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  });
});
