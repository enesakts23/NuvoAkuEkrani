document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('batteryPieChart').getContext('2d');
    const batteryPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Çalışan Batarya', 'Bozuk Batarya'],
            datasets: [{
                data: [15, 1],
                backgroundColor: ['#007bff', '#dc3545'],
                hoverBackgroundColor: ['#0056b3', '#c82333']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
});
