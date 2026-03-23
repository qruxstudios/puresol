/* ============================================================
   PURESOL — "Alkaline Gold" — Interactions
   GSAP 3.12.5 + ScrollTrigger + MotionPathPlugin + Lenis 1.1.18
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* Register GSAP plugins */
  gsap.registerPlugin(ScrollTrigger);


  /* ----------------------------------------------------------
     1. PRELOADER
     ---------------------------------------------------------- */
  const preloader        = document.querySelector('.preloader');
  const preloaderBrand   = document.querySelector('.preloader__brand');
  const preloaderLine    = document.querySelector('.preloader__line');
  const preloaderTagline = document.querySelector('.preloader__tagline');
  const mainContent      = document.querySelector('.main-content');

  const preloaderTL = gsap.timeline({
    onComplete: () => {
      initLenis();
      heroEntrance();
      initScrollAnimations();
      initNav();
      initParallaxBottle();
      initMarquee();
    }
  });

  preloaderTL
    .to(preloaderBrand, { opacity: 1, duration: 0.8, ease: 'power2.out' })
    .to(preloaderLine,  { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.3')
    .to(preloaderTagline, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to({}, { duration: 0.6 })
    .to(preloaderBrand, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
    .to([preloaderLine, preloaderTagline], { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.3')
    .to(preloader, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }, '-=0.1')
    .set(preloader, { display: 'none' })
    .to(mainContent, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4');


  /* ----------------------------------------------------------
     2. LENIS SMOOTH SCROLL
     ---------------------------------------------------------- */
  let lenis;

  function initLenis() {
    lenis = new Lenis({
      duration:        1.0,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      /* Disable smooth scroll on touch/mobile — native is faster */
      smoothTouch:     false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }


  /* ----------------------------------------------------------
     3. HERO ENTRANCE
     ---------------------------------------------------------- */
  function heroEntrance() {
    const heroTL = gsap.timeline({ delay: 0.2 });
    heroTL
      .to('.hero__eyebrow',  { opacity: 1, y: 0,     duration: 0.8, ease: 'power3.out' })
      .to('.hero__title',    { opacity: 1,            duration: 1.0, ease: 'power3.out' }, '-=0.4')
      .to('.hero__divider',  { scaleX: 1,             duration: 0.7, ease: 'power2.inOut' }, '-=0.5')
      .to('.hero__subtitle', { opacity: 1, y: 0,     duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.hero__scroll',   { opacity: 1,            duration: 0.6, ease: 'power2.out' }, '-=0.2');
  }


  /* ----------------------------------------------------------
     4. NAV SCROLL BEHAVIOUR
     ---------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.nav');

    ScrollTrigger.create({
      start: 'top -80px',
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 80) {
          nav.classList.add('scrolled');
        } else if (self.scroll() <= 80) {
          nav.classList.remove('scrolled');
        }
      }
    });

    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks  = document.querySelector('.nav__links');
    if (hamburger) {
      hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
  }


  /* ----------------------------------------------------------
     5. SCROLL-TRIGGERED ANIMATIONS
     ---------------------------------------------------------- */
  function initScrollAnimations() {

    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      });
    });

    gsap.utils.toArray('.reveal-left').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      });
    });

    gsap.utils.toArray('.reveal-right').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      });
    });

    gsap.utils.toArray('.reveal-scale').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
      });
    });

    /* Intro choreography */
    const introSection = document.querySelector('.intro');
    if (introSection) {
      gsap.timeline({
        scrollTrigger: { trigger: introSection, start: 'top 70%', toggleActions: 'play none none none' }
      })
        .from('.intro__label',   { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
        .from('.intro__heading', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.intro__text',    { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.intro__divider', { scaleX: 0,          duration: 0.6, ease: 'power2.inOut' }, '-=0.3');
    }

    /* Product cards stagger */
    const cards = gsap.utils.toArray('.product-card');
    if (cards.length) {
      gsap.from(cards, {
        scrollTrigger: { trigger: '.products__grid', start: 'top 75%', toggleActions: 'play none none none' },
        opacity: 0, y: 60, scale: 0.95,
        duration: 0.9, stagger: 0.2, ease: 'power3.out',
      });
    }

    /* Process steps */
    gsap.utils.toArray('.process-step').forEach((step, i) => {
      const content = step.querySelector('.process-step__content');
      const marker  = step.querySelector('.process-step__marker');
      gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 80%', toggleActions: 'play none none none' } })
        .from(marker,  { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' })
        .from(content, { opacity: 0, x: i % 2 === 0 ? -40 : 40, duration: 0.7, ease: 'power3.out' }, '-=0.2');
    });

    /* Comparison rows */
    const rows = gsap.utils.toArray('.comparison__table tbody tr');
    if (rows.length) {
      gsap.from(rows, {
        scrollTrigger: { trigger: '.comparison__table', start: 'top 75%', toggleActions: 'play none none none' },
        opacity: 0, x: -30, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      });
    }

    /* Benefits strip */
    const strip = document.querySelector('.benefits-strip');
    if (strip) {
      gsap.from(strip, {
        scrollTrigger: { trigger: strip, start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 0, duration: 0.8, ease: 'power2.out',
      });
    }

    /* Footer */
    const footer = document.querySelector('.footer');
    if (footer) {
      gsap.from('.footer__top > *', {
        scrollTrigger: { trigger: footer, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      });
    }
  }


  /* ----------------------------------------------------------
     6. ORIGINAL PARALLAX FLOATING BOTTLE
        Right-edge bottle that drifts through intro + products,
        then fades out as the science section arrives.
        Journey bottle (section 8) picks up from there.
     ---------------------------------------------------------- */
  function initParallaxBottle() {
    const bottle = document.querySelector('.floating-bottle');
    if (!bottle || window.innerWidth < 1024) return;

    gsap.to(bottle, {
      scrollTrigger: { trigger: '.intro', start: 'top 80%', end: 'top 40%', scrub: true },
      opacity: 1, x: -60, duration: 1,
    });

    gsap.to(bottle, {
      scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      y: -120, rotation: -3, ease: 'none',
    });

    gsap.to(bottle, {
      scrollTrigger: { trigger: '.products', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      y: -250, rotation: 2, ease: 'none',
    });

    gsap.to(bottle, {
      scrollTrigger: { trigger: '.science', start: 'top 50%', end: 'center center', scrub: 1 },
      opacity: 0, scale: 0.85, x: -100, ease: 'none',
    });

    gsap.to(bottle.querySelector('img'), {
      y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
  }


  /* ----------------------------------------------------------
     7. MARQUEE DUPLICATION
     ---------------------------------------------------------- */
  function initMarquee() {
    const track = document.querySelector('.benefits-strip__track');
    if (!track) return;
    track.innerHTML += track.innerHTML;
  }


}); /* end DOMContentLoaded */
