<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "petkingdom_trial"; 

$conn = new mysqli($servername, $username, $password, $dbname);

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

    $sql = "INSERT INTO appointments (ownerName, phoneNumber, emailAddress, petName, petType, royalGrooming) 
            VALUES ('$ownerName', '$phoneNumber', '$emailAddress', '$petName', '$petType', '$royalGrooming')";

    if ($conn->query($sql) === TRUE) {
        header("Location: confirmation.html?ownerName=" . urlencode($ownerName) . 
               "&phoneNumber=" . urlencode($phoneNumber) . 
               "&emailAddress=" . urlencode($emailAddress) . 
               "&petName=" . urlencode($petName) . 
               "&petType=" . urlencode($petType) . 
               "&royalGrooming=" . urlencode($royalGrooming));
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
