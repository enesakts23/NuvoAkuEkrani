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
        batteryTemp.textContent = `Sıcaklık: ${getRandomTemp()}°C`;
        batteryTemp.classList.add('battery-temp');
        
        const batteryVoltage = document.createElement('div');
        batteryVoltage.textContent = `Voltaj: ${getRandomVoltage()}V`;
        batteryVoltage.classList.add('battery-voltage');
        
        batteryItem.appendChild(batteryNumber);
        batteryItem.appendChild(batteryTemp);
        batteryItem.appendChild(batteryVoltage);
        
        batteryGrid.appendChild(batteryItem);
    }
    
    batteryViewContainer.appendChild(batteryGrid);
});

function getRandomTemp() {
    return (Math.random() * 40).toFixed(1); // 0.0 - 40.0 arası rastgele sıcaklık
}

function getRandomVoltage() {
    return (Math.random() * 5 + 10).toFixed(2); // 10.00 - 15.00 arası rastgele voltaj
}
