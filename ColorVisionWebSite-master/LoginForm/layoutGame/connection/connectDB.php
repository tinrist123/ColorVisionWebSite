<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "colorvisiongaming";

$conn = new mysqli($host, $user, $password, $database);

// error connect
if (!$conn) {
    die("mysql error: " . mysqli_connect_error());
} else {
}