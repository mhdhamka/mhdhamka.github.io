/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Copy Email to Clipboard
const emailIcon = document.querySelectorAll('.email-icon')

function copyEmail() {
    var email = "m.hamka017@gmail.com";
    window.open('mailto:' + email);
}
emailIcon.forEach(n => n.addEventListener('click', copyEmail))

/*==================== SHOW/HIDE SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
})


/*==================== QUALIFICATION TABS ====================*/

document.addEventListener("DOMContentLoaded", () => {

    const qualificationTabs = document.querySelectorAll(
        ".qualification__button"
    );

    const qualificationContents = document.querySelectorAll(
        ".qualification__content"
    );


    // Check if qualification section exists
    if (
        qualificationTabs.length === 0 ||
        qualificationContents.length === 0
    ) {
        console.warn(
            "Qualification tabs or contents not found."
        );
        return;
    }

    qualificationTabs.forEach(tab => {

        tab.addEventListener("click", function () {


            const targetId = this.dataset.target;


            const targetContent = document.querySelector(
                targetId
            );


            // Prevent error if target missing
            if (!targetContent) {

                console.error(
                    `Cannot find qualification content: ${targetId}`
                );

                return;

            }

            /*
            ============================
            Remove Previous Active State
            ============================
            */
            qualificationTabs.forEach(tab => {

                tab.classList.remove(
                    "qualification__active"
                );

            });

            qualificationContents.forEach(content => {

                content.classList.remove(
                    "qualification__active"
                );

            });


            /*
            ============================
            Add New Active State
            ============================
            */
            this.classList.add(
                "qualification__active"
            );


            targetContent.classList.add(
                "qualification__active"
            );


            /*
            ============================
            Debug (Remove Later)
            ============================
            */

            console.log(
                "Active qualification:",
                targetId
            );
        });
    });
});

/*==================== ACTIVITY SWIPER  ====================*/
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
        mousewheel: true,
    },
});


/*==================== PROJECT SWIPER ====================*/
const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
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
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL UP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-up');

    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Functions to get current theme/icon
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// Apply saved theme or set default to dark
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
} else {
    // No preference saved → set dark as default
    document.body.classList.add(darkTheme)
    themeButton.classList.add(iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== emailJS ====================*/
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactSubject = document.getElementById('contact-subject'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault();
    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_l0onzso', 'template_m0plumt', '#contact-form', 'Zx7aZX32cu8hTk5mJ')
        .then(() => {
            // show message sent
            alert('Message sent');
        }, (error) => {
            alert('Fail to send, something went wrong\n' + error)
        });

    // clear input
    contactName.value = ''; contactEmail.value = '';
    contactSubject.value = ''; contactMessage.value = '';
}
contactForm.addEventListener('submit', sendEmail)

/*==================== Scroll Reveal ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
})

sr.reveal('.home__data');
sr.reveal('.home__social', { delay: 200, origin: 'left' });
sr.reveal('.home__img', { delay: 200, origin: 'right' });
sr.reveal('.home__scroll', { delay: 400, interval: 100 });
sr.reveal('.about__data', { origin: 'bottom' });
sr.reveal('.qualification__tabs, .qualification__sections', { interval: 100 })
sr.reveal('.skills__content:nth-child(odd)', { origin: 'left' });
sr.reveal('.skills__content:nth-child(even)', { origin: 'right' });
sr.reveal('.contact__wrapper', { origin: 'top' })
sr.reveal('.contact__inputs div', { origin: 'bottom', interval: 100 })
