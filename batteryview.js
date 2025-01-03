const BROKER = "81.214.12.250";
const PORT = 9001;
const TOPIC = "bat";

document.addEventListener('DOMContentLoaded', () => {
    const batteryViewContainer = document.getElementById('battery-view');

    const batteryGrid = document.createElement('div');
    batteryGrid.classList.add('battery-grid');

    for (let i = 1; i <= 16; i++) {
        const batteryItem = document.createElement('div');
        batteryItem.classList.add('battery-item');
        batteryItem.dataset.batteryNumber = i;

        const batteryNumber = document.createElement('div');
        batteryNumber.textContent = i;
        batteryNumber.classList.add('battery-number');

        const batteryTemp = document.createElement('div');
        const tempIcon = document.createElement('i');
        tempIcon.classList.add('fas', 'fa-thermometer-half');
        batteryTemp.appendChild(tempIcon);
        const tempValue = document.createElement('span');
        batteryTemp.appendChild(tempValue); // Başlangıçta boş
        batteryTemp.classList.add('battery-temp');

        const batteryVoltage = document.createElement('div');
        const voltageIcon = document.createElement('i');
        voltageIcon.classList.add('fas', 'fa-bolt');
        batteryVoltage.appendChild(voltageIcon);
        const voltageValue = document.createElement('span');
        batteryVoltage.appendChild(voltageValue); // Başlangıçta boş
        batteryVoltage.classList.add('battery-voltage');

        batteryItem.appendChild(batteryNumber);
        batteryItem.appendChild(batteryTemp);
        batteryItem.appendChild(batteryVoltage);

        batteryItem.addEventListener('click', (event) => {
            const batteryNum = event.currentTarget.dataset.batteryNumber;
            showBatteryDetails(batteryNum);
        });

        batteryGrid.appendChild(batteryItem);
    }

    batteryViewContainer.appendChild(batteryGrid);

    // MQTT Bağlantısı
    const client = new Paho.MQTT.Client(BROKER, PORT, "clientId-" + parseInt(Math.random() * 100));

    client.onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    };

    client.onMessageArrived = (message) => {
        try {
            const data = JSON.parse(message.payloadString);
            if (Array.isArray(data)) {
                data.forEach(updateBatteryData);
            } else {
                updateBatteryData(data); // Tek bir veri objesi geldiğinde
            }
        } catch (error) {
            console.error("Veri ayrıştırma hatası:", error);
        }
    };

    client.connect({
        onSuccess: () => {
            console.log("Bağlantı başarılı!");
            setTimeout(() => {
                client.subscribe(TOPIC);
                console.log("MQTT verilerini almaya başlandı.");
            }, 5000); // 5 saniye bekle
        }
    });

    function highlightBatteryNumber(batteryNumber) {
        const batteryNumberElement = document.querySelector(`[data-battery-number="${batteryNumber}"] .battery-number`);
        if (batteryNumberElement) {
            batteryNumberElement.style.backgroundColor = 'green';
            setTimeout(() => {
                batteryNumberElement.style.backgroundColor = '';
            }, 2000);
        }
    }

    function updateBatteryData(battery) {
        Object.keys(battery).forEach((key) => {
            if (key.startsWith("v")) {
                const batteryNumber = key.substring(1);
                const batteryItem = document.querySelector(`[data-battery-number="${batteryNumber}"]`);
                if (batteryItem) {
                    const voltageValue = batteryItem.querySelector('.battery-voltage span');
                    voltageValue.textContent = ` ${battery[key]}V`;
                    highlightBatteryNumber(batteryNumber);
                }
            } else if (key.startsWith("t")) {
                const batteryNumber = key.substring(1);
                const batteryItem = document.querySelector(`[data-battery-number="${batteryNumber}"]`);
                if (batteryItem) {
                    const tempValue = batteryItem.querySelector('.battery-temp span');
                    tempValue.textContent = ` ${battery[key]}°C`;
                    highlightBatteryNumber(batteryNumber);
                }
            }
        });
    }

    function highlightBatteryCell(cell) {
        cell.style.backgroundColor = 'yellow';
        setTimeout(() => {
            cell.style.backgroundColor = '';
        }, 2000);
    }

});

function showBatteryDetails(batteryNum) {
    const existingContainer = document.getElementById('battery-details');
    if (existingContainer) {
        existingContainer.remove();
    }

    const detailsContainer = document.createElement('div');
    detailsContainer.id = 'battery-details';
    detailsContainer.classList.add('details-container');

    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        detailsContainer.remove();
    });

    const batteryInfo = document.createElement('div');
    batteryInfo.textContent = `Akü Numarası: ${batteryNum}`;
    batteryInfo.classList.add('battery-info');

    const separator = document.createElement('hr');
    separator.classList.add('details-separator');

    const chartContainerTemp = document.createElement('div');
    chartContainerTemp.id = 'chart-temp';
    chartContainerTemp.classList.add('chart-container');

    const chartContainerVoltage = document.createElement('div');
    chartContainerVoltage.id = 'chart-voltage';
    chartContainerVoltage.classList.add('chart-container');

    detailsContainer.appendChild(closeButton);
    detailsContainer.appendChild(batteryInfo);
    detailsContainer.appendChild(separator);
    detailsContainer.appendChild(chartContainerTemp);
    detailsContainer.appendChild(chartContainerVoltage);

    document.body.appendChild(detailsContainer);

    renderTempChart();
    renderVoltageChart();
}

function renderTempChart() {
    const options = {
        chart: {
            type: 'area',
            height: 350
        },
        series: [{
            name: 'Sıcaklık',
            data: generateTemperatureData()
        }],
        xaxis: {
            categories: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']
        },
        yaxis: {
            title: {
                text: 'Sıcaklık (°C)'
            }
        },
        title: {
            text: 'Haftalık Sıcaklık Grafiği',
            align: 'center'
        },
        colors: ['#007bff']
    };

    const chart = new ApexCharts(document.querySelector('#chart-temp'), options);
    chart.render();
}

function renderVoltageChart() {
    const options = {
        chart: {
            type: 'area',
            height: 350
        },
        series: [{
            name: 'Voltaj',
            data: generateVoltageData()
        }],
        xaxis: {
            categories: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']
        },
        yaxis: {
            title: {
                text: 'Voltaj (V)'
            }
        },
        title: {
            text: 'Haftalık Voltaj Grafiği',
            align: 'center'
        },
        colors: ['#28a745']
    };

    const chart = new ApexCharts(document.querySelector('#chart-voltage'), options);
    chart.render();
}

function generateTemperatureData() {
    return Array.from({ length: 7 }, () => (Math.random() * 40).toFixed(1));
}

function generateVoltageData() {
    return Array.from({ length: 7 }, () => (Math.random() * 5 + 10).toFixed(2));
}
