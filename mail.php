<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

 // Настройки вашей почты
 $mail->Host       = 'hostru10.fornex.host'; // SMTP сервера вашей почты
 $mail->Username   = 'artmodels@s82969.hostru10.fornex.host'; // Логин на почте
 $mail->Password   = 'Rhfcfdtw1'; // Пароль на почте
 $mail->SMTPSecure = 'SSL';
 $mail->Port       = 	465;                           


// От кого письмо
$mail->setFrom('artmodels@s82969.hostru10.fornex.host', 'Анкета');
// Кому отправить 
$mail->addAddress('SerafimaArtModels@yandex.ru');
// Тема Письма
$mail->Subject = 'Анкета';

//Тело письма 
$body = '<h1>Анкета</h1>';

if(trim(!empty($_POST['model_fname']))){
	$body.='<p><strong>Имя:</strong> '.$_POST['model_fname'].'</p>';
}
if(trim(!empty($_POST['model_lname']))){
	$body.='<p><strong>Фамилия:</strong> '.$_POST['model_lname'].'</p>';
}
if(trim(!empty($_POST['model_bdate']))){
	$body.='<p><strong>Дата Рождения:</strong> '.$_POST['model_bdate'].'</p>';
}
if(trim(!empty($_POST['model_city']))){
	$body.='<p><strong>Город Проживания:</strong> '.$_POST['model_city'].'</p>';
}
if(trim(!empty($_POST['model_email']))){
	$body.='<p><strong>E-mail:</strong> '.$_POST['model_email'].'</p>';
}
if(trim(!empty($_POST['model_phone']))){
	$body.='<p><strong>Контактный телефон:</strong> '.$_POST['model_phone'].'</p>';
}
if(trim(!empty($_POST['model_inst']))){
	$body.='<p><strong>Ссылки на соцсети:</strong> '.$_POST['model_inst'].'</p>';
}
if(trim(!empty($_POST['model_height']))){
	$body.='<p><strong>Рост:</strong> '.$_POST['model_height'].'</p>';
}
if(trim(!empty($_POST['model_bust']))){
	$body.='<p><strong>Обьем груди:</strong> '.$_POST['model_bust'].'</p>';
}
if(trim(!empty($_POST['model_waist']))){
	$body.='<p><strong>Обьем талии:</strong> '.$_POST['model_waist'].'</p>';
}
if(trim(!empty($_POST['model_hips']))){
	$body.='<p><strong>Обьем будер:</strong> '.$_POST['model_hips'].'</p>';
}
if(trim(!empty($_POST['model_shoes']))){
	$body.='<p><strong>Размер обуви:</strong> '.$_POST['model_shoes'].'</p>';
}
if(trim(!empty($_POST['model_eyes']))){
	$body.='<p><strong>Цвет глаз:</strong> '.$_POST['model_eyes'].'</p>';
}
if(trim(!empty($_POST['model_hair']))){
	$body.='<p><strong>Цвет волос:</strong> '.$_POST['model_hair'].'</p>';
}

// Прикрепить файл 
if (!empty($_FILES['image1']['tmp_name'])) {
	//Путь загрузки файла	
	$filePath = __DIR__ . "/files/" . $_FILES['image1']['name'];
	// грузим файл
	if (copy($_FILES['image1']['tmp_name'], $filePath)){
		$fileAttach = $filePath;
		$body.='<p><strong>Фото в приложении</strong><p/>';
		$mail->AddAttachment($fileAttach);
	}
}

if (!empty($_FILES['image2']['tmp_name'])) {
	$filePath = __DIR__ . "/files/" . $_FILES['image2']['name'];
	if (copy($_FILES['image2']['tmp_name'], $filePath)){
		$fileAttach = $filePath;
		$mail->AddAttachment($fileAttach);
	}
}

if (!empty($_FILES['image3']['tmp_name'])) {
	$filePath = __DIR__ . "/files/" . $_FILES['image3']['name'];
	if (copy($_FILES['image3']['tmp_name'], $filePath)){
		$fileAttach = $filePath;
		$mail->AddAttachment($fileAttach);
	}
}

$mail->Body = $body;


// Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>