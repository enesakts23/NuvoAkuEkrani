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
    const mapviewCSS = document.getElementById('mapview-css');
    const batteryviewCSS = document.getElementById('batteryview-css');
    const mapviewJS = document.getElementById('mapview-js');
    const batteryviewJS = document.getElementById('batteryview-js');
    
    if (containerId === 'map-view') {
        mapviewCSS.disabled = false;
        batteryviewCSS.disabled = true;
        mapviewJS.removeAttribute('defer');
    } else if (containerId === 'battery-view') {
        mapviewCSS.disabled = true;
        batteryviewCSS.disabled = false;
        batteryviewJS.removeAttribute('defer');
    } else {
        mapviewCSS.disabled = true;
        batteryviewCSS.disabled = true;
    }
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
