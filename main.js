// Gestion du loader avec progression
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    let progress = 0;
    let hasAnimated = false; // Variable pour suivre si l'animation a déjà été effectuée
    
    // Simuler une progression de chargement
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            clearInterval(loadingInterval);
            progress = 100;
            
            // Animation de transition
            loader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            loader.style.opacity = '0';
            loader.style.transform = 'scale(1.1)';
            
            // Afficher le contenu
            setTimeout(() => {
                loader.style.display = 'none';
                content.classList.remove('hidden');
                if (!hasAnimated) {
                    initializeAnimations();
                    hasAnimated = true; // Marquer l'animation comme effectuée
                }
            }, 800);
        }
    }, 100);
});

// Animation par lettre du titre
function animateText(element) {
    // Vérifier si l'élément a déjà été animé
    if (element.dataset.animated === 'true') return;
    
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = `all 0.5s ease ${i * 0.1}s`;
        element.appendChild(span);
    }

    // Déclencher l'animation après un court délai
    setTimeout(() => {
        element.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }, 100);

    // Marquer l'élément comme animé
    element.dataset.animated = 'true';
}

// Initialisation des animations
function initializeAnimations() {
    // Animer le titre principal une seule fois
    const title = document.querySelector('.title');
    if (title && !title.dataset.animated) {
        animateText(title);
    }

    // Animer les autres éléments avec un délai
    const animatedElements = document.querySelectorAll('.animate-fade');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// Gestion du menu
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const menuIcon = document.querySelector('.menu-toggle i');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    
    // Animation de l'icône
    if (mainNav.classList.contains('active')) {
        menuIcon.style.transform = 'rotate(90deg)';
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.style.transform = 'rotate(0deg)';
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Fermeture du menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        menuIcon.style.transform = 'rotate(0deg)';
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Gestion du défilement et de la barre de progression
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Mise à jour de la barre de progression
    updateScrollProgressBar();
    
    // Parallaxe du fond
    const background = document.querySelector('.video-background');
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Masquer/Afficher l'indicateur de défilement
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateY(0)';
        }
    }

    // Animation des sections au scroll
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    animateOnScroll.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });

    // Animation de la section Awards
    const awardsSection = document.querySelector('.awards-section');
    if (awardsSection) {
        const rect = awardsSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        
        if (isVisible && !awardsSection.classList.contains('visible')) {
            awardsSection.classList.add('visible');
            awardsSection.querySelectorAll('.awards-text p').forEach((p, index) => {
                p.style.setProperty('--i', index + 1);
            });
        }
    }
});

// Mise à jour de la barre de progression
function updateScrollProgressBar() {
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.pageYOffset / scrollableHeight) * 100;
    scrollProgressBar.style.width = `${scrolledPercentage}%`;
}

// Défilement fluide pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Fermer le menu si ouvert
            mainNav.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// Initialisation du Swiper
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper !== 'undefined') {
        const expertiseSwiper = new Swiper('.expertise-carousel .swiper-container', {
            loop: true,
            centeredSlides: true,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
            },
            a11y: {
                enabled: true,
                prevSlideMessage: 'Compétence précédente',
                nextSlideMessage: 'Compétence suivante',
                firstSlideMessage: 'Première compétence',
                lastSlideMessage: 'Dernière compétence'
            }
        });
    }
});

// Animation de la section Join Us
document.addEventListener('scroll', () => {
    const joinSection = document.querySelector('.join-us-section');
    if (joinSection) {
        const sectionTop = joinSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 50) {
            joinSection.classList.add('visible');
        }
    }
});

// Gestion des interactions hover
const addHoverEffect = (element) => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
};

// Ajouter les effets hover aux boutons
const buttons = document.querySelectorAll('.adhesion-button, .cta-button');
buttons.forEach(addHoverEffect);

// Initialiser les observations après le chargement
window.addEventListener('load', () => {
    // Masquer le loader si toujours visible
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
    }

    // Initialiser la barre de progression au chargement
    updateScrollProgressBar();
});