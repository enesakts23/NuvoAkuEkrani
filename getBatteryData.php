<?php
$servername = "localhost";
$username = "root";
$password = "Enes.aktas2326";
$dbname = "world";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

if(isset($_GET['bat_number'])) {
    $bat_number = $_GET['bat_number'];
    $sql = "SELECT * FROM akuveriler WHERE bat_number = $bat_number ORDER BY timestamp DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = [];
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode([]);
}

$conn->close();
?>
