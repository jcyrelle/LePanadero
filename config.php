<?php
$host = "localhost";
$user = "root"; 
$pass = "";     
$db   = "lepanadero"; // Updated to match your actual database name

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>