function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    sidebar.classList.toggle('hidden');
    content.classList.toggle('expanded');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.header').classList.toggle('dark-mode');
    document.querySelector('.sidebar').classList.toggle('dark-mode');
    document.querySelector('.content').classList.toggle('dark-mode');
}

function showContainer(containerId) {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.remove('active');
    });

    const activeContainer = document.getElementById(containerId);
    activeContainer.classList.add('active');
    
    // CSS ve JS dosyalarını yönet
    manageCSSAndJS(containerId);
}

function manageCSSAndJS(containerId) {
    const previewCSS = document.getElementById('preview-css');
    const mapviewCSS = document.getElementById('mapview-css');
    const batteryviewCSS = document.getElementById('batteryview-css');
    const previewJS = document.getElementById('preview-js');
    const mapviewJS = document.getElementById('mapview-js');
    const batteryviewJS = document.getElementById('batteryview-js');
    
    // CSS dosyalarını kontrol et
    if (containerId === 'map-view') {
        mapviewCSS.disabled = false;
        batteryviewCSS.disabled = true;
        previewCSS.disabled = true;
    } else if (containerId === 'battery-view') {
        mapviewCSS.disabled = true;
        batteryviewCSS.disabled = false;
        previewCSS.disabled = true;
    } else if (containerId === 'preview') {
        previewCSS.disabled = false;
        mapviewCSS.disabled = true;
        batteryviewCSS.disabled = true;
    }
    
    // JS dosyalarını kontrol et
    previewJS.disabled = containerId !== 'preview';
    mapviewJS.disabled = containerId !== 'map-view';
    batteryviewJS.disabled = containerId !== 'battery-view';
}

// Profil menüsü toggle fonksiyonu
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// İlk açıldığında önizleme container'ının açık olmasını sağla
document.addEventListener('DOMContentLoaded', () => {
    showContainer('preview');
});
