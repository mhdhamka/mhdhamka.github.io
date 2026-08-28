/* ==================== INITIALIZE UI COMPONENTS ==================== */
function initPortfolio() {

    /* ==================== MENU SHOW Y HIDDEN ==================== */
    const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');

    /*===== MENU SHOW =====*/
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    /*===== MENU HIDDEN =====*/
    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    /*==================== REMOVE MENU MOBILE ====================*/
    const navLink = document.querySelectorAll('.nav__link');
    function linkAction() {
        const navMenuMobile = document.getElementById('nav-menu');
        if (navMenuMobile) navMenuMobile.classList.remove('show-menu');
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));


    /*==================== SHOW/HIDE SKILLS ====================*/
    const skillsContent = document.getElementsByClassName('skills__content'),
        skillsHeader = document.querySelectorAll('.skills__header');

    function toggleSkills() {
        let itemClass = this.parentNode.className;
        for (let i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = 'skills__content skills__close';
        }
        if (itemClass === 'skills__content skills__close') {
            this.parentNode.className = 'skills__content skills__open';
        }
    }

    skillsHeader.forEach((el) => {
        el.removeEventListener('click', toggleSkills); // Prevent duplicate bindings
        el.addEventListener('click', toggleSkills);
    });


    /* ==================== TYPING EFFECT ==================== */
    const typedTextSpan = document.querySelector(".typed-text");
    if (typedTextSpan && !typedTextSpan.classList.contains("typing-initialized")) {
        typedTextSpan.classList.add("typing-initialized");
        const roles = ["Software Engineer", "Full-Stack Developer", "Python & FastAPI Developer", "Data & AI Enthusiast"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let roleIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < roles[roleIndex].length) {
                typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, typingDelay + 300);
            }
        }

        setTimeout(type, 500);
    }


    /* ==================== FETCH GITHUB STATS & TECH STACKS ==================== */
    const repoElement = document.getElementById("repoCount");
    const stackElement = document.getElementById("stackCount");

    if ((repoElement || stackElement) && !document.body.classList.contains("github-fetched")) {
        document.body.classList.add("github-fetched");
        (async () => {
            try {
                // Fetch user profile data (for public repos count)
                const userResponse = await fetch("https://api.github.com/users/mhdhamka");
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    if (repoElement && userData.public_repos !== undefined) {
                        repoElement.textContent = userData.public_repos;
                    }
                }

                // Fetch repositories to calculate unique languages (Core Tech Stacks)
                const reposResponse = await fetch("https://api.github.com/users/mhdhamka/repos?per_page=100");
                if (reposResponse.ok) {
                    const repos = await reposResponse.json();
                    const languagesSet = new Set();
                    
                    repos.forEach(repo => {
                        if (repo.language) {
                            languagesSet.add(repo.language);
                        }
                    });

                    if (stackElement && languagesSet.size > 0) {
                        stackElement.textContent = languagesSet.size;
                    }
                }
            } catch (error) {
                console.error("Failed to fetch GitHub stats:", error);
                if (repoElement) repoElement.textContent = "10";
                if (stackElement) stackElement.textContent = "5";
            }
        })();
    }


    /* ==================== COPY EMAIL TO CLIPBOARD ==================== */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyTooltip = document.getElementById('copyTooltip');
    const userEmail = "m.hamka017@gmail.com";

    if (copyEmailBtn && copyTooltip && !copyEmailBtn.classList.contains("copy-initialized")) {
        copyEmailBtn.classList.add("copy-initialized");
        const handleCopy = () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(userEmail).then(() => {
                    const originalText = copyTooltip.textContent;
                    copyTooltip.textContent = "Copied!";
                    copyTooltip.classList.add("show");
                    copyEmailBtn.style.background = "#10b981"; 
                    copyEmailBtn.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.6)";

                    setTimeout(() => {
                        copyTooltip.textContent = originalText;
                        copyTooltip.classList.remove("show");
                        copyEmailBtn.style.background = "";
                        copyEmailBtn.style.boxShadow = "";
                    }, 2000);
                }).catch(err => {
                    console.error("Failed to copy email: ", err);
                    window.location.href = `mailto:${userEmail}`;
                });
            } else {
                window.location.href = `mailto:${userEmail}`;
            }
        };

        copyEmailBtn.addEventListener('click', handleCopy);
        copyEmailBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCopy();
            }
        });
    }


    /* ==================== TERMINAL COPY BUTTON ==================== */
    const copyNpxBtn = document.getElementById('copyNpxBtn');

    if (copyNpxBtn && !copyNpxBtn.classList.contains("npx-initialized")) {
        copyNpxBtn.classList.add("npx-initialized");
        copyNpxBtn.addEventListener('click', async () => {
            const textToCopy = 'npx mhdhamka-cv';
            const icon = copyNpxBtn.querySelector('i');
            const span = copyNpxBtn.querySelector('span');
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                const originalText = span ? span.textContent : '';
                if (span) span.textContent = 'Copied command!';
                if (icon) icon.className = 'uil uil-check button__icon';
                copyNpxBtn.style.borderColor = '#10b981';
                copyNpxBtn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                
                setTimeout(() => {
                    if (span) span.textContent = originalText;
                    if (icon) icon.className = 'uil uil-copy button__icon';
                    copyNpxBtn.style.borderColor = '';
                    copyNpxBtn.style.boxShadow = '';
                }, 2500);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    }


    /* ==================== SKILL CARDS INTERACTIVITY ==================== */
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    if ('IntersectionObserver' in window && skillCards.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillCards.forEach(card => skillsObserver.observe(card));
    }


    /* ==================== QUALIFICATION TABS ==================== */
    const qualificationTabs = document.querySelectorAll(".qualification__button");
    const qualificationContents = document.querySelectorAll(".qualification__content");

    if (qualificationTabs.length > 0 && qualificationContents.length > 0) {
        qualificationTabs.forEach(tab => {
            tab.addEventListener("click", function () {
                const targetId = this.dataset.target;
                const targetContent = document.querySelector(targetId);

                if (!targetContent) {
                    console.error(`Cannot find qualification content: ${targetId}`);
                    return;
                }

                qualificationTabs.forEach(t => t.classList.remove("qualification__active"));
                qualificationContents.forEach(c => c.classList.remove("qualification__active"));

                this.classList.add("qualification__active");
                targetContent.classList.add("qualification__active");
            });
        });
    }
}

// Component Loader with safe animation frame rendering for Swiper elements
document.addEventListener("DOMContentLoaded", async () => {
    const includeElements = document.querySelectorAll("[data-include]");
    const isSubfolder = window.location.pathname.includes('/src/');
    const pathPrefix = isSubfolder ? "../" : "";

    for (const el of includeElements) {
        const file = el.getAttribute("data-include");
        const fullPath = pathPrefix + file;

        try {
            const response = await fetch(fullPath);
            if (response.ok) {
                const html = await response.text();
                el.outerHTML = html;
            } else {
                console.error(`Error loading component: ${fullPath}`);
            }
        } catch (error) {
            console.error(`Network error loading ${fullPath}:`, error);
        }
    }

    requestAnimationFrame(() => {
        document.dispatchEvent(new Event("componentsLoaded"));
    });
});

document.addEventListener("DOMContentLoaded", initPortfolio);
document.addEventListener("componentsLoaded", initPortfolio);


/*==================== ACTIVITY SWIPER ====================*/
let swiperActivity = new Swiper(".activity__container", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
});


/*==================== PROJECT SWIPER ====================*/
const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true,
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/*==================== SHOW SCROLL UP ====================*/
function scrollTop() {
    const scrollUpBtn = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUpBtn?.classList.add('show-scroll');
    else scrollUpBtn?.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton?.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    if (themeButton) themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
} else {
    document.body.classList.add(darkTheme);
    if (themeButton) themeButton.classList.add(iconTheme);
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}


/*==================== EMAILJS ====================*/
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactSubject = document.getElementById('contact-subject'),
    contactMessage = document.getElementById('contact-message');

if (contactForm) {
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_l0onzso', 'template_m0plumt', '#contact-form', 'Zx7aZX32cu8hTk5mJ')
            .then(() => {
                alert('Message sent');
            }, (error) => {
                alert('Fail to send, something went wrong\n' + error);
            });

        if (contactName) contactName.value = '';
        if (contactEmail) contactEmail.value = '';
        if (contactSubject) contactSubject.value = '';
        if (contactMessage) contactMessage.value = '';
    };
    contactForm.addEventListener('submit', sendEmail);
}


/*==================== SCROLL REVEAL ====================*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
    });

    sr.reveal('.home__data');
    sr.reveal('.home__social', { delay: 200, origin: 'left' });
    sr.reveal('.home__img', { delay: 200, origin: 'right' });
    sr.reveal('.home__scroll', { delay: 400, interval: 100 });
    sr.reveal('.about__data', { origin: 'bottom' });
    sr.reveal('.qualification__tabs, .qualification__sections', { interval: 100 });
    sr.reveal('.skills__content:nth-child(odd)', { origin: 'left' });
    sr.reveal('.skills__content:nth-child(even)', { origin: 'right' });
    sr.reveal('.contact__wrapper', { origin: 'top' });
    sr.reveal('.contact__inputs div', { origin: 'bottom', interval: 100 });
}