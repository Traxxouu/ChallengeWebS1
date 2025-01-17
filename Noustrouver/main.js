// Animation par lettre du titre
function animateText(element) {
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
}

// Gestion de la barre de progression de défilement
function updateScrollProgressBar() {
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.pageYOffset / scrollableHeight) * 100;
    
    scrollProgressBar.style.width = `${scrolledPercentage}%`;
}

// Gestion du loader avec progression
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    let progress = 0;
    
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
                initializeAnimations();
            }, 800);
        }
    }, 100);
});

// Initialisation des animations
function initializeAnimations() {
    // Animer le titre principal
    const title = document.querySelector('.title');
    if (title && !title.classList.contains('animated')) {
        animateText(title);
        title.classList.add('animated');
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

// Gestion du défilement
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
});

// Initialize Google Maps
function initMap() {
    const location = { lat: 48.789, lng: 2.652 }; // Replace with actual coordinates
    const map = new google.maps.Map(document.querySelector('.map-container'), {
        zoom: 15,
        center: location,
    });
    new google.maps.Marker({
        position: location,
        map: map,
    });
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
    initializeAnimations();
    
    // Masquer le loader si toujours visible
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
    }

    // Initialiser la barre de progression au chargement
    updateScrollProgressBar();
});

// Remplacer ou ajouter cette fonction dans votre main.js
function initializeScrollAnimations() {
    const observerOptions = {
        rootMargin: '0px',
        threshold: 0.1 // Réduit le seuil pour une détection plus précoce
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si c'est la section awards, animer les paragraphes
                if (entry.target.classList.contains('awards-section')) {
                    const paragraphs = entry.target.querySelectorAll('.awards-text p');
                    paragraphs.forEach((p, index) => {
                        p.style.setProperty('--i', index + 1);
                        p.style.animation = 'fadeInUp 0.5s ease forwards';
                        p.style.animationDelay = `${index * 0.1}s`;
                    });
                }
                
                // Désinscrire l'élément une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les sections
    const sections = document.querySelectorAll('.awards-section, .animate-on-scroll');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Ajouter ceci dans votre événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Vos autres initialisations...
    
    initializeScrollAnimations();
    if (document.querySelector('.map-container')) {
        initMap();
    }
});

// Ajouter aussi dans votre événement load si nécessaire
window.addEventListener('load', () => {
    // Vos autres initialisations...
    
    initializeScrollAnimations();
});

document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si Swiper est disponible
    if (typeof Swiper !== 'undefined') {
        const expertiseSwiper = new Swiper('.expertise-carousel .swiper-container', {
            // Mode boucle pour un défilement continu
            loop: true,
            
            // Centrer les diapositives
            centeredSlides: true,
            
            // Espace entre les diapositives
            spaceBetween: 30,
            
            // Navigation
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            
            // Effets de transition
            effect: 'slide',
            
            // Options de responsive
            breakpoints: {
                // Pour les écrans mobiles
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // Pour les tablettes et écrans plus larges
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30
                }
            },
            
            // Options d'accessibilité
            a11y: {
                enabled: true,
                prevSlideMessage: 'Compétence précédente',
                nextSlideMessage: 'Compétence suivante',
                firstSlideMessage: 'Première compétence',
                lastSlideMessage: 'Dernière compétence'
            }
        });
    } else {
        console.error('Swiper library is not loaded');
    }
});

document.addEventListener('DOMContentLoaded', () => {
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
            delay: 3000, // Temps en millisecondes entre chaque défilement
            disableOnInteraction: false, // Continue même si l'utilisateur interagit
        },
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
        },
    });
});

document.addEventListener('scroll', () => {
    const joinSection = document.querySelector('.join-us-section');
    const sectionTop = joinSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 50) {
        joinSection.classList.add('visible');
    }
});
