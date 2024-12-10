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

        batteryItem.addEventListener('click', (event) => {
            const batteryNum = event.currentTarget.dataset.batteryNumber;
            showBatteryDetails(batteryNum);
        });

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
    // Haftanın 7 günü için rastgele sıcaklık değerleri oluştur
    return Array.from({ length: 7 }, () => (Math.random() * 40).toFixed(1));
}

function generateVoltageData() {
    // Haftanın 7 günü için rastgele voltaj değerleri oluştur
    return Array.from({ length: 7 }, () => (Math.random() * 5 + 10).toFixed(2));
}
