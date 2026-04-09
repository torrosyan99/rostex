<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");


$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo "Неверный JSON";
    exit;
}

$to = 'shuralev.m.a@ya.ru';
$subject = 'Новая заявка с формы';
$headers = "From: no-reply@yourdomain.com\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$message = "";
foreach ($data as $key => $value) {
    $message .= "$key: $value\n";
}

$success = mail($to, $subject, $message, $headers);

if ($success) {
    echo "OK";
} else {
    http_response_code(500);
    echo "Ошибка отправки письма";
}
