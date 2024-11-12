<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Configuração do e-mail
    $to = "aiexxplorer@artificialuniverse.tech";     $subject = "Nova mensagem de contato de $name";
    $body = "Nome: $name\nEmail: $email\n\nMensagem:\n$message";
    $headers = "From: $email";
    
    // Enviar o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent with success!";
    } else {
        echo "There was an error sending the message. Try it again.";
    }
}
?>
