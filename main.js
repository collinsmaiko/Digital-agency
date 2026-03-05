function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Hide skeletons when fully loaded
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });

    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                history.pushState(null, null, href);
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const handleNavScroll = debounce(() => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', handleNavScroll, { passive: true });

// Sticky CTA visibility - MOBILE ONLY
const stickyCta = document.getElementById('stickyCta');
const heroSection = document.querySelector('.hero');
const finalCta = document.querySelector('.final-cta');

const isMobile = () => window.innerWidth <= 968;

const handleStickyCta = debounce(() => {
    if (!isMobile()) {
        stickyCta.classList.remove('visible');
        return;
    }

    const scrollY = window.scrollY;
    const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 0;
    const finalCtaTop = finalCta ? finalCta.offsetTop : 0;
    const windowHeight = window.innerHeight;

    if (scrollY > heroBottom - 100 && scrollY < finalCtaTop - windowHeight + 100) {
        stickyCta.classList.add('visible');
    } else {
        stickyCta.classList.remove('visible');
    }
}, 10);

window.addEventListener('scroll', handleStickyCta, { passive: true });
window.addEventListener('resize', debounce(handleStickyCta, 100));

// Hash direct-link support
if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
            if (target.classList.contains('faq-item')) {
                target.querySelector('.faq-question').click();
            }
        }, 100);
    }
}
