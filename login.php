<?php
// Veritabanı bağlantı ayarları
$servername = "localhost";
$username = "root"; // Veritabanı kullanıcı adı
$password = ""; // Veritabanı şifresi
$dbname = "world";

// Veritabanına bağlanma
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

// Kullanıcı adı ve şifreyi POST metoduyla al
$user = $_POST['username'];
$pass = $_POST['password'];

$response = array("status" => "", "message" => "");

// Boş bırakılan alanları kontrol et
if (empty($user) || empty($pass)) {
    $response["status"] = "error";
    $response["message"] = "Kullanıcı adı veya şifre boş bırakılamaz.";
} else {
    // SQL sorgusu ile kullanıcıyı kontrol et
    $sql = "SELECT * FROM users WHERE kullanici_adi='$user' AND sifre='$pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Kullanıcı bulundu, giriş başarılı
        $response["status"] = "success";
        $response["message"] = "Giriş başarılı! Hoş geldiniz, $user.";
    } else {
        // Kullanıcı bulunamadı, giriş başarısız
        $response["status"] = "error";
        $response["message"] = "Kullanıcı adı veya şifre yanlış.";
    }
}

// JSON formatında yanıt döndür
echo json_encode($response);

// Veritabanı bağlantısını kapat
$conn->close();
?>