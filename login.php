<?php
session_start();
require 'config.php';

if (isset($_POST['login'])) {
    $email    = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, fullname, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Check if the password matches the hashed one in DB
        if (password_verify($password, $user['password'])) {
            // Create Session Variables
            $_SESSION['user_id']   = $user['id'];
            $_SESSION['user_name'] = $user['fullname'];

            // DIRECT TO DASHBOARD
            header("Location: dashboard.php");
            exit();
        } else {
            header("Location: login.html?error=wrongpass");
        }
    } else {
        header("Location: login.html?error=nouser");
    }
}
?>