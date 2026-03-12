<?php
header('Content-Type: application/json; charset=utf-8');
header('ngrok-skip-browser-warning: true');

// ТОЛЬКО ЦИФРЫ И ЛАТИНСКИЕ БУКВЫ
$botToken = "8286815434:AAEvkVasC0EFOiAZwBQeTCgPp4U_1EzHw_M";
$chatId = "1306177258";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? 'Аноним';
    $phone = $_POST['phone'] ?? 'Нет номера';
    $service = $_POST['service'] ?? 'Не выбрана';
    $date = $_POST['date'] ?? 'Не указана';
    $time = $_POST['time'] ?? 'Не указано';

    $message = "🏥 Новая заявка\n👤 Имя: $name\n📞 Тел: $phone\n🦷 Услуга: $service\n📅 Дата: $date\n⏰ Время: $time";

    // Отправка через простой запрос
    $url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($message);
    
    $response = file_get_contents($url);

    if ($response) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Ошибка API Telegram"]);
    }
}


?>