/* This is the file where we connect to the database */
<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'login';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo 'Database connection error: ' . $conn->connect_error;
}

?>