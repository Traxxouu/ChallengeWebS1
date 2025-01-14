document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    let lastSubmissionTime = null;
    const delay = 2 * 60 * 1000; // 2 minutes en millisecondes

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Vérification d'intervalle de 2 minutes
        if (lastSubmissionTime && Date.now() - lastSubmissionTime < delay) {
            statusMessage.textContent = "Vous ne pouvez pas renvoyer un message avant 2 minutes.";
            statusMessage.className = 'error';
            statusMessage.style.display = 'block';
            return;
        }

        // Enregistrement du temps d'envoi
        lastSubmissionTime = Date.now();

        // Envoi du message (ici, simulation avec setTimeout)
        sendEmail(email, message)
            .then(() => {
                statusMessage.textContent = "Votre message a été envoyé.";
                statusMessage.className = 'success';
                statusMessage.style.display = 'block';
            })
            .catch((error) => {
                statusMessage.textContent = `Erreur: ${error.message}`;
                statusMessage.className = 'error';
                statusMessage.style.display = 'block';
            });
    });

    function sendEmail(email, message) {
        return new Promise((resolve, reject) => {
            // Simuler un appel réseau (à remplacer par une vraie fonction d'envoi d'email)
            setTimeout(() => {
                if (email && message) {
                    resolve();
                } else {
                    reject(new Error("L'email ou le message est invalide."));
                }
            }, 1000);
        });
    }
});
