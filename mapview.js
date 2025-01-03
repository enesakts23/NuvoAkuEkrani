let map; 

document.addEventListener('DOMContentLoaded', () => {
    
    if (!map) {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            map = L.map('map').setView([41.0082, 28.9784], 9); 

            // Uydu görünümü katmanını ekle
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            
            L.marker([41.0082, 28.9784]).addTo(map)
                .bindPopup('Bir konum.')
                .openPopup();
        }
    }
});


function showContainer(containerId) {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.remove('active');
    });

    const activeContainer = document.getElementById(containerId);
    activeContainer.classList.add('active');
    
    
    manageCSSAndJS(containerId);

    if (containerId === 'map-view' && map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100); 
    }
}
