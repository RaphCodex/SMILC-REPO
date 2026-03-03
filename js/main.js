'use strict';

/* ======================================================
   Utilities
====================================================== */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => scope.querySelectorAll(sel);

const onReady = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
};

/* ======================================================
   Preloader
====================================================== */
function initPreloader() {
    const preloader = $('#preloader');
    if (!preloader) return;

    const SESSION_KEY = 'preloaderShown';
    const MAX_TIME = 5000;
    const MIN_TIME = 1000;

    let pageLoaded = false;
    let minTimeReached = false;

    if (sessionStorage.getItem(SESSION_KEY)) {
        preloader.remove();
        return;
    }

    sessionStorage.setItem(SESSION_KEY, 'true');

    setTimeout(() => {
        minTimeReached = true;
        tryDismiss();
    }, MIN_TIME);

    window.addEventListener('load', () => {
        pageLoaded = true;
        tryDismiss();
    });

    setTimeout(tryDismiss, MAX_TIME);

    function tryDismiss() {
        if (!pageLoaded || !minTimeReached) return;
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
    }
}

/* ======================================================
   Typing Animation (Home Page Only)
====================================================== */
function initTypingEffect() {
    const el = $('.typed-text');
    if (!el) return;

    const texts = [
        'Critical Thinking for Digital Citizens',
        'Fighting Misinformation Together',
        'Building Digital Literacy Skills',
        'Empowering Informed Decisions'
    ];

    let textIndex = 0;
    let charIndex = 0;

    function type() {
        el.textContent = texts[textIndex].slice(0, ++charIndex);

        if (charIndex === texts[textIndex].length) {
            setTimeout(() => {
                charIndex = 0;
                textIndex = (textIndex + 1) % texts.length;
            }, 2000);
        }

        setTimeout(type, 100);
    }

    type();
}

/* ======================================================
   Theme Toggle
====================================================== */
function initThemeToggle() {
    const themeToggle = $('#themeToggle');
    const mobileThemeToggle = $('#mobileThemeToggle');
    if (!themeToggle && !mobileThemeToggle) return;

    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') body.setAttribute('data-theme', 'dark');
        else body.removeAttribute('data-theme');

        const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        const text = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

        themeToggle && (themeToggle.innerHTML = `<i class="fas ${icon}"></i>`);
        mobileThemeToggle &&
            (mobileThemeToggle.innerHTML = `<i class="fas ${icon}"></i><span>${text}</span>`);
    }

    let currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    }

    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);
}

/* ======================================================
   Mobile Navigation
====================================================== */
function initMobileMenu() {
    const menuBtn = $('#mobileMenuBtn');
    const mobileNav = $('#mobileNav');
    const closeBtn = $('#mobileCloseBtn');
    const overlay = $('#mobileOverlay');

    if (!menuBtn || !mobileNav) return;

    const openMenu = () => {
        mobileNav.classList.add('active');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileNav.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    $$('.mobile-nav-link').forEach(link =>
        link.addEventListener('click', closeMenu)
    );

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
}

/* ======================================================
   Navbar Scroll Effect
====================================================== */
function initNavbarScroll() {
    const navbar = $('.navbar');
    if (!navbar) return;

    window.addEventListener(
        'scroll',
        () => navbar.classList.toggle('scrolled', window.scrollY > 10),
        { passive: true }
    );
}

/* ======================================================
   Smooth Scrolling (Internal Links Only)
====================================================== */
function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = $(link.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

/* ======================================================
   FAQ Accordion
====================================================== */
function initFAQ() {
    const faqItems = $$('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = $('.faq-question', item);
        const answer = $('.faq-answer', item);

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(i => {
                i.classList.remove('active');
                const a = $('.faq-answer', i);
                if (a) a.style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/* ======================================================
   App Init
====================================================== */
onReady(() => {
    initPreloader();
    initTypingEffect();
    initThemeToggle();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initFAQ();

    console.log('Main JS loaded successfully');
});
