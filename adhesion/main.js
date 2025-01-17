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

// Gestion du formulaire
document.getElementById('adhesionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Votre demande d\'adhésion a été envoyée avec succès !');
});
