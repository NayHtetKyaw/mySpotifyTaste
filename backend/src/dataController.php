<?php 

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type"); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); 
    exit;
}

$host = "db";
$dbname = "mysqldb";
$user = "root";
$pass = "rootpassword";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $input = json_decode(file_get_contents("php://input"), true);
        $firstName = $input['firstName'] ?? '';
        $lastName = $input['lastName'] ?? '';
        $email = $input['email'] ?? '';
        $phoneNumber = $input['phoneNumber'] ?? '';

        $connection = $pdo->prepare("INSERT INTO contacts (first_name, last_name, email, phone_number) VALUES (:firstName, :lastName, :email, :phoneNumber)");
        $connection->execute(['firstName' => $firstName, 'lastName' => $lastName, 'email' => $email, 'phoneNumber' => $phoneNumber]);

        echo json_encode(['message' => 'User created successfully']);
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    http_response_code(500);
    exit;
}
