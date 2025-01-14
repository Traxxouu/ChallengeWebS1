const nodemailer = require('nodemailer');

// Création du transporteur SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bmael4072@gmail.com', // Remplace par ton email
        pass: 'M@e1mot2p@sse77680rls'       // Remplace par ton mot de passe
    }
});

// Fonction pour envoyer l'email
function sendEmail(email, message) {
    let mailOptions = {
        from: email,
        to: 'bmael4072@gmail.com',
        subject: 'Message/Question du site renard',
        text: `Email: ${email}\nMessage: ${message}`
    };

    return transporter.sendMail(mailOptions);
}

// Route pour traiter le formulaire de contact
app.post('/sendmail', (req, res) => {
    const { email, message } = req.body;
    
    sendEmail(email, message)
        .then(() => res.status(200).send("Votre message a été envoyé."))
        .catch((error) => res.status(500).send(`Erreur lors de l'envoi : ${error.message}`));
});
