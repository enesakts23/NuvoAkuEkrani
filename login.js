// Login işlemi için form gönderimini ele al
document.querySelector('form').addEventListener('submit', function (event) {
    // event.preventDefault() çağrısını kaldırdık, böylece form gönderimi gerçekleşir
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Kullanıcı Adı:', username);
    console.log('Şifre:', password);

    // Form verilerini PHP scriptine gönder
    this.action = 'login.php';
    this.method = 'POST';
});

// Şifre al / şifremi unuttum modalını açma ve kapatma işlemleri
document.getElementById('forgotPassword').onclick = function () {
    document.getElementById('passwordModal').style.display = 'block';
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
};

document.querySelector('.close').onclick = function () {
    document.getElementById('passwordModal').style.display = 'none';
    document.body.style.backgroundColor = '#f0f0f0';
};

document.getElementById('cancelBtn').onclick = function () {
    document.getElementById('passwordModal').style.display = 'none';
    document.body.style.backgroundColor = '#f0f0f0';
};
