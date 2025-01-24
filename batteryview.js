const BROKER = "81.214.12.250";
const PORT = 9001;
const TOPIC = "bat";

document.addEventListener('DOMContentLoaded', () => {
    const batteryViewContainer = document.getElementById('battery-view');

    const newItem = document.createElement('div');
    newItem.classList.add('additional-item');

    const icons = {
        t: 'fas fa-thermometer-half',
        h: 'fas fa-tint',
        q: 'fas fa-wind',
        s: 'fas fa-burn',
        r: 'fas fa-radiation-alt'
    };

    ['t', 'h', 'q', 's', 'r'].forEach(type => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('info-item', `${type}-item`);

        const icon = document.createElement('i');
        icon.className = icons[type];
        itemDiv.appendChild(icon);

        const span = document.createElement('span');
        itemDiv.appendChild(span);

        newItem.appendChild(itemDiv);
    });

    batteryViewContainer.appendChild(newItem);

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
        batteryTemp.appendChild(tempValue);
        batteryTemp.classList.add('battery-temp');

        const batteryVoltage = document.createElement('div');
        const voltageIcon = document.createElement('i');
        voltageIcon.classList.add('fas', 'fa-bolt');
        batteryVoltage.appendChild(voltageIcon);
        const voltageValue = document.createElement('span');
        batteryVoltage.appendChild(voltageValue);
        batteryVoltage.classList.add('battery-voltage');

        batteryItem.appendChild(batteryNumber);
        batteryItem.appendChild(batteryTemp);
        batteryItem.appendChild(batteryVoltage);

        batteryItem.addEventListener('click', (event) => {
            const batteryNum = event.currentTarget.dataset.batteryNumber;
            showBatteryDetails(batteryNum);

            fetch(`getBatteryData.php?bat_number=${batteryNum}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Veritabanı verileri:', data);
                    if (data.length > 0) {
                        const tempData = data.map(d => parseFloat(d.temperature));
                        const voltageData = data.map(d => parseFloat(d.voltage));
                        const timestamps = data.map(d => d.timestamp);

                        renderTempChart(tempData, timestamps);
                        renderVoltageChart(voltageData, timestamps);
                    } else {
                        renderTempChart([], []);
                        renderVoltageChart([], []);
                    }
                })
                .catch(error => {
                    console.error('Veri çekme hatası:', error);
                });
        });

        batteryGrid.appendChild(batteryItem);
    }

    batteryViewContainer.appendChild(batteryGrid);

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
                updateBatteryData(data);
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
            }, 5000);
        }
    });
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
                if (battery[key] >= 0) {
                    voltageValue.textContent = ` ${battery[key]}V`;
                    highlightBatteryNumber(batteryNumber);
                } else {
                    voltageValue.textContent = '';
                }
            }
        } else if (key.startsWith("t")) {
            const batteryNumber = key.substring(1);
            const batteryItem = document.querySelector(`[data-battery-number="${batteryNumber}"]`);
            if (batteryItem) {
                const tempValue = batteryItem.querySelector('.battery-temp span');
                if (battery[key] >= -20) {
                    tempValue.textContent = ` ${battery[key]}°C`;
                    highlightBatteryNumber(batteryNumber);
                } else {
                    tempValue.textContent = '';
                }
            }
        }

        if (battery.id === 15) {
            const additionalItem = document.querySelector('.additional-item');
            if (additionalItem) {
                if (battery.t !== 0) {
                    additionalItem.querySelector('.t-item span').textContent = ` ${battery.t}°C`;
                }
                if (battery.h !== 0) {
                    additionalItem.querySelector('.h-item span').textContent = ` ${battery.h}%`;
                }
                additionalItem.querySelector('.q-item span').textContent = ` ${battery.q}`;
                additionalItem.querySelector('.s-item span').textContent = ` ${battery.s}`;
                additionalItem.querySelector('.r-item span').textContent = ` ${battery.r}`;

                // Veri güncellenince siyah daireleri yeşil yap
                ['t', 'h', 'q', 's', 'r'].forEach(type => {
                    const circle = additionalItem.querySelector(`.${type}-item`);
                    if (circle) {
                        const beforeElement = document.createElement('style');
                        beforeElement.innerHTML = `
                            .${type}-item::before {
                                background-color: green !important;
                            }
                        `;
                        document.head.appendChild(beforeElement);

                        setTimeout(() => {
                            beforeElement.innerHTML = `
                                .${type}-item::before {
                                    background-color: white !important;
                                }
                            `;
                        }, 2000);
                    }
                });
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

function renderTempChart(data = [null, null, null, null, null, null, null], timestamps = []) {
    const chartContainer = document.querySelector('#chart-temp');
    if (data.every(value => value === null)) {
        chartContainer.style.display = 'none';
        return;
    } else {
        chartContainer.style.display = 'block';
    }

    const options = {
        chart: {
            type: 'area', // Area grafik tipi
            height: 265
        },
        series: [{
            name: 'Sıcaklık',
            data: data
        }],
        xaxis: {
            categories: timestamps,
            labels: {
                show: false // X eksenindeki etiketler gizlendi
            }
        },
        yaxis: {
            min: 0,
            max: 90, // Y ekseninin sınırları
            labels: {
                show: true
            }
        },
        title: {
            text: 'Günlük Sıcaklık Grafiği',
            align: 'center'
        },
        colors: ['#007bff'],
        dataLabels: {
            enabled: false // Veri etiketleri devre dışı bırakıldı
        },
        tooltip: {
            enabled: true // Tooltip etkinleştirildi
        },
        stroke: {
            curve: 'smooth', // Yumuşak eğriler
            width: 2, // Çizgi kalınlığı
            dashArray: 5 // Kesikli çizgi uzunluğu
        }
    };

    const chart = new ApexCharts(chartContainer, options);
    chart.render();
}

function renderVoltageChart(data = [null, null, null, null, null, null, null], timestamps = []) {
    const chartContainer = document.querySelector('#chart-voltage');
    if (data.every(value => value === null)) {
        chartContainer.style.display = 'none';
        return;
    } else {
        chartContainer.style.display = 'block';
    }

    const options = {
        chart: {
            type: 'area', // Area grafik tipi
            height: 265
        },
        series: [{
            name: 'Voltaj',
            data: data
        }],
        xaxis: {
            categories: timestamps,
            labels: {
                show: false // X eksenindeki etiketler gizlendi
            }
        },
        yaxis: {
            min: 8,
            max: 15, // Y ekseninin sınırları
            labels: {
                show: true
            }
        },
        title: {
            text: 'Günlük Voltaj Grafiği',
            align: 'center'
        },
        colors: ['#28a745'],
        dataLabels: {
            enabled: false // Veri etiketleri devre dışı bırakıldı
        },
        tooltip: {
            enabled: true // Tooltip etkinleştirildi
        },
        stroke: {
            curve: 'smooth', // Yumuşak eğriler
            width: 2, // Çizgi kalınlığı
            dashArray: 5 // Kesikli çizgi uzunluğu
        }
    };

    const chart = new ApexCharts(chartContainer, options);
    chart.render();
}
