/* Zubair Ali — Portfolio JS */

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// --- Mobile menu ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
document.addEventListener('click', e => {
    if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) {
            window.scrollTo({ top: t.offsetTop - 64, behavior: 'smooth' });
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });
});

// --- Active nav link ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const setActive = () => {
    const y = window.scrollY + 100;
    sections.forEach(s => {
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + s.id);
            });
        }
    });
};
window.addEventListener('scroll', setActive);

// --- Scroll reveal ---
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// --- Stat counter ---
const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const numEl = el.querySelector('.stat-num');
        if (!numEl || numEl.dataset.done) return;
        numEl.dataset.done = '1';
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const dur = 1500;
        const start = performance.now();
        const tick = now => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
            numEl.textContent = Math.floor(target * ease) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObs.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat[data-target]').forEach(el => countObs.observe(el));

// --- Project filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        cards.forEach(c => {
            c.classList.toggle('hide', f !== 'all' && c.dataset.status !== f);
        });
    });
});

// --- Particles ---
const pc = document.getElementById('particles');
if (pc) {
    for (let i = 0; i < 15; i++) {
        const d = document.createElement('div');
        d.className = 'dot';
        d.style.left = Math.random() * 100 + '%';
        d.style.top = Math.random() * 100 + '%';
        d.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
        d.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
        d.style.animationDelay = -(Math.random() * 18) + 's';
        d.style.animationDuration = (12 + Math.random() * 10) + 's';
        pc.appendChild(d);
    }
}

// --- ESC closes mobile menu ---
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});
