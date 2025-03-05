<?php
$servername = "localhost"; 
$username = "root"; // MariaDB username
$password = ""; //  MariaDB password
$dbname = "petkingdom_trial"; // database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ownerName = $conn->real_escape_string($_POST["ownerName"]);
    $phoneNumber = $conn->real_escape_string($_POST["phoneNumber"]);
    $emailAddress = $conn->real_escape_string($_POST["emailAddress"]);
    $petName = $conn->real_escape_string($_POST["petName"]);
    $petType = $conn->real_escape_string($_POST["petType"]);
    $royalGrooming = $conn->real_escape_string($_POST["royalGrooming"]);
    $bathBlowDry = $conn->real_escape_string($_POST["bathBlowDry"]);
    $dematting = $conn->real_escape_string($_POST["dematting"]);
    $medicatedShampoo = $conn->real_escape_string($_POST["medicatedShampoo"]);
    $boardingServices = $conn->real_escape_string($_POST["boardingServices"]);

    $sql = "INSERT INTO appointments (ownerName, phoneNumber, emailAddress, petName, petType, royalGrooming, bathBlowDry, dematting, medicatedShampoo, boardingServices) VALUES ('$ownerName', '$phoneNumber', '$emailAddress', '$petName', '$petType', '$royalGrooming', '$bathBlowDry', '$dematting', '$medicatedShampoo', '$boardingServices')";

    if ($conn->query($sql) === TRUE) {
        // Confirmation HTML
        echo '<div class="container" id="confirmationCard">';
        echo '<div class="card">';
        echo '<h2>Your Appointment Has Been Booked!</h2>';
        echo "<p>Thank you, <strong>$ownerName</strong>, for booking an appointment for <strong>$petName</strong> ($petType).</p>";
        echo "<p>We will contact you at <strong>$phoneNumber</strong> or <strong>$emailAddress</strong> to confirm the details.</p>";
        echo '<h3>Selected Services:</h3>';
        echo '<ul>';
        echo '<li>Royal Grooming: ' . ($royalGrooming ? $royalGrooming : 'None') . '</li>';
        echo '<li>Bath & Blow Dry: ' . ($bathBlowDry ? $bathBlowDry : 'None') . '</li>';
        echo '<li>Dematting: ' . ($dematting ? $dematting : 'None') . '</li>';
        echo '<li>Medicated Shampoo: ' . ($medicatedShampoo ? $medicatedShampoo : 'None') . '</li>';
        echo '<li>Boarding Service: ' . ($boardingServices ? $boardingServices : 'None') . '</li>';
        echo '</ul>';
        echo '</div>';
        echo '</div>';
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>