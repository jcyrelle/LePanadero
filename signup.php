<?php
session_start();
require 'config.php';

if (isset($_POST['signup'])) {

    $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
    $email    = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];
    $confirm  = $_POST['confirm_password'];

    // Server-side confirm password check
    if ($password !== $confirm) {
        header("Location: signup.html?error=passwordmismatch");
        exit();
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $stmt = $conn->prepare(
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)"
    );
    $stmt->bind_param("sss", $fullname, $email, $hashedPassword);

    if ($stmt->execute()) {
        header("Location: login.html?status=success");
        exit();
    } else {
        header("Location: signup.html?error=emailexists");
        exit();
    }
}
?>
