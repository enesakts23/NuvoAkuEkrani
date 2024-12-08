let map; // Harita değişkenini dışarıda tanımlıyoruz

document.addEventListener('DOMContentLoaded', () => {
    // Haritayı yalnızca gerektiğinde başlat
    if (!map) {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            map = L.map('map').setView([51.505, -0.09], 13); // Koordinatları ve zoom seviyesini ayarlayın

            // Uydu görünümü katmanını ekle
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Haritaya bir işaretçi ekleyin
            L.marker([51.5, -0.09]).addTo(map)
                .bindPopup('Bir konum.')
                .openPopup();
        }
    }
});

// Container değiştirildiğinde haritayı yeniden boyutlandır
function showContainer(containerId) {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.remove('active');
    });

    const activeContainer = document.getElementById(containerId);
    activeContainer.classList.add('active');
    
    // CSS ve JS dosyalarını yönet
    manageCSSAndJS(containerId);

    if (containerId === 'map-view' && map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100); // Harita boyutunu güncellemek için kısa bir gecikme ekledik
    }
}
