<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Adresse de destination
    $to = "bmael4072@gmail.com";
    $subject = "Message/Question du site renard";
    
    // Contenu de l'email
    $email_content = "Email: $email\nMessage: $message";
    
    // En-têtes (headers)
    $headers = "From: $email";

    // Envoi de l'email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Votre message a été envoyé.";
    } else {
        echo "Erreur lors de l'envoi du message.";
    }
}
?>
