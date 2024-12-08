document.addEventListener('DOMContentLoaded', () => {
    const options = {
        chart: {
            type: 'pie',
            width: 350, // Grafiğin genişliğini biraz daha büyük yapıyoruz
            toolbar: {
                show: false
            }
        },
        series: [15, 1], // Çalışan Batarya ve Bozuk Batarya değerleri
        labels: ['Çalışan Batarya', 'Bozuk Batarya'],
        colors: ['#007bff', '#dc3545'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 250
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const apexChart = new ApexCharts(document.querySelector("#batteryApexChart"), options);
    apexChart.render();
});
