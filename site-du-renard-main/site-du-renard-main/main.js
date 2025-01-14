// Sélection des éléments
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

// Ajout d'un événement pour afficher/masquer la barre de navigation
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});






document.querySelectorAll('.hover-effect').forEach((img) => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});







// Interactions douces sur les images
document.querySelectorAll('.expertise-image').forEach((imgBlock) => {
    imgBlock.addEventListener('mouseenter', () => {
        imgBlock.style.transform = 'scale(1.02)';  // Léger agrandissement pour ne pas détériorer la qualité
    });

    imgBlock.addEventListener('mouseleave', () => {
        imgBlock.style.transform = 'scale(1)';
    });
});




window.addEventListener('load', () => {
    // Simule un chargement de 2 secondes
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
        document.getElementById('content').style.display = 'block';
    }, 2000); // 2 secondes d'affichage du loader

    // Retirer complètement le loader après la transition
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 2500); // Le loader disparaît complètement après 2,5 secondes
});
