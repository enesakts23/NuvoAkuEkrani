document.addEventListener('DOMContentLoaded', () => {
    const options = {
        chart: {
            type: 'pie',
            width: 350, 
            toolbar: {
                show: false
            }
        },
        series: [16, 0], 
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
