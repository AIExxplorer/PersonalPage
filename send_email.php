<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Configuração do e-mail
    $to = "contactaiexxplorer@gmail.com";
    $subject = "Nova mensagem de contato de $name";
    $body = "Nome: $name\nEmail: $email\n\nMensagem:\n$message";
    $headers = "From: contactaiexxplorer@gmail.com\r\n"; // Altere para o seu e-mail
    $headers .= "Reply-To: $email\r\n";
    
    // Enviar o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent with success!";
    } else {
        echo "There was an error sending the message. Try it again.";
    }
}
?>
