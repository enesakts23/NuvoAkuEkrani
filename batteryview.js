document.addEventListener('DOMContentLoaded', () => {
    const batteryViewContainer = document.getElementById('battery-view');

    const batteryGrid = document.createElement('div');
    batteryGrid.classList.add('battery-grid');

    for (let i = 1; i <= 16; i++) {
        const batteryItem = document.createElement('div');
        batteryItem.classList.add('battery-item');

        const batteryNumber = document.createElement('div');
        batteryNumber.textContent = i;
        batteryNumber.classList.add('battery-number');

        const batteryTemp = document.createElement('div');
        const tempIcon = document.createElement('i');
        tempIcon.classList.add('fas', 'fa-thermometer-half');
        batteryTemp.appendChild(tempIcon);
        const tempValue = document.createElement('span');
        tempValue.textContent = ` ${getRandomTemp()}°C`;
        batteryTemp.appendChild(tempValue);
        batteryTemp.classList.add('battery-temp');

        const batteryVoltage = document.createElement('div');
        const voltageIcon = document.createElement('i');
        voltageIcon.classList.add('fas', 'fa-bolt');
        batteryVoltage.appendChild(voltageIcon);
        const voltageValue = document.createElement('span');
        voltageValue.textContent = ` ${getRandomVoltage()}V`;
        batteryVoltage.appendChild(voltageValue);
        batteryVoltage.classList.add('battery-voltage');

        batteryItem.appendChild(batteryNumber);
        batteryItem.appendChild(batteryTemp);
        batteryItem.appendChild(batteryVoltage);

        batteryGrid.appendChild(batteryItem);
    }

    batteryViewContainer.appendChild(batteryGrid);

    // Global değişkeni kontrol edelim ve işleyelim
    if (globalJsonMessage) {
        console.log(globalJsonMessage); // Global değişkeni kontrol edelim
        // globalJsonMessage içindeki verilerle daha fazla işlem yapabilirsin
    }
});

function getRandomTemp() {
    return (Math.random() * 40).toFixed(1); // 0.0 - 40.0 arası rastgele sıcaklık
}

function getRandomVoltage() {
    return (Math.random() * 5 + 10).toFixed(2); // 10.00 - 15.00 arası rastgele voltaj
}
