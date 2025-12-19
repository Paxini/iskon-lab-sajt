<?php
// CORS headers za React frontend
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Samo POST metoda
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Primi JSON podatke
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validacija
if (!$data || empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Sanitizacija podataka
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$company = isset($data['company']) ? htmlspecialchars(strip_tags($data['company'])) : 'Nije navedeno';
$message = htmlspecialchars(strip_tags($data['message']));

// Validacija email-a
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Email konfiguracija
$to = 'hello@iskonlab.com';
$subject = "Nova poruka sa sajta od: $name";

$emailBody = "
===========================================
NOVA PORUKA SA ISKON LAB SAJTA
===========================================

Ime i prezime: $name
Email: $email
Kompanija: $company

-------------------------------------------
PORUKA:
-------------------------------------------
$message

-------------------------------------------
Poslato sa: iskonlab.com
";

// Email headers
$headers = "From: noreply@iskonlab.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Pošalji email
$mailSent = mail($to, $subject, $emailBody, $headers);

if ($mailSent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Poruka je uspešno poslata!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Greška pri slanju. Pokušajte ponovo.'
    ]);
}
?>

