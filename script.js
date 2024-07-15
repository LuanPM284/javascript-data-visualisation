document.addEventListener("DOMContentLoaded", function () {
    let chart;

    function extractData() {
        const table = document.getElementById('table1');
        const rows = table.querySelectorAll('tbody tr');
        const years = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];

        const countriesData = {};

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const country = cells[0].textContent;
                const values = Array.from(cells).slice(1, 12).map(cell => {
                    const value = cell.textContent.trim();
                    return value === ':' ? null : parseFloat(value.replace(',', '.'));
                });
                countriesData[country] = values;
            }
        });

        return { years, countriesData };
    }

    function createAndInsertChart(data, yearIndex) {
        const h3 = document.querySelector('h3');
        if (!h3) {
            console.error('No H3 element found');
            return;
        }

        let chartContainer = document.getElementById('chartContainer');
        if (!chartContainer) {
            chartContainer = document.createElement('div');
            chartContainer.id = 'chartContainer';
            chartContainer.style.width = '800px';
            chartContainer.style.height = '400px';
            chartContainer.style.margin = '20px 0';

            const canvas = document.createElement('canvas');
            chartContainer.appendChild(canvas);

            h3.insertAdjacentElement('afterend', chartContainer);
        }

        const canvas = chartContainer.querySelector('canvas');

        const countries = Object.keys(data.countriesData);
        const values = countries.map(country => data.countriesData[country][yearIndex]);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: `Number of Offences (thousands) in ${data.years[yearIndex]}`,
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Offences (thousands)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Country'
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Number of Offences Recorded by Police in ${data.years[yearIndex]}`,
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }

    function createButtons(years, data) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.textAlign = 'center';

        years.forEach((year, index) => {
            const button = document.createElement('button');
            button.textContent = year;
            button.style.margin = '0 5px';
            button.addEventListener('click', () => createAndInsertChart(data, index));
            buttonContainer.appendChild(button);
        });

        const chartContainer = document.getElementById('chartContainer');
        chartContainer.insertAdjacentElement('afterend', buttonContainer);
    }

    const data = extractData();
    createAndInsertChart(data, data.years.length - 1); // Start with 2012
    createButtons(data.years, data);

    // add the second table

    // Adding the graph over table 2, can't use h3 since there are several h4
    const graphDiv2 = document.createElement("div")
    graphDiv2.setAttribute("style", "width: 800px")
    const table2 = document.getElementById("table2")
    table2.parentNode.insertBefore(graphDiv2, table2)
    const canvasInside2 = document.createElement("canvas")
    graphDiv2.appendChild(canvasInside2)


    const tableData1 = document.getElementById("table1")
    const tableData2 = document.getElementById("table2")
    const tr2 = table2.querySelectorAll('tbody tr')
    //table 2 values
    const xAxis2 = []
    const yAxis2 = []
    const yAxis2_5 = []


    tr2.forEach(row => {
        const cells = row.querySelectorAll("td")
        if (cells.length > 0) {
            xAxis2.push(cells[0].innerText)
            yAxis2.push(parseFloat(cells[1].innerText))
            yAxis2_5.push(parseFloat(cells[2].innerText))
        }
    })

    // table 2 graph
    const ctx2 = canvasInside2.getContext('2d')
    new Chart(ctx2,
        {
            type: 'bar',
            data: {
                labels: xAxis2,
                datasets: [
                    {
                        label: 'Homicides 2007–09',
                        data: yAxis2,
                        categoryPercentage: 0.5,
                    },
                    {
                        label: 'Homicides 2010–12',
                        data: yAxis2_5,
                    }
                ]

            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Graph of Prison population, average per year, 2007-09 and 2010-12 (per 100,000 inhabitants)',
                    },
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Country'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Prison Population'

                        }
                    }
                }
            }
        }
    );
});



// Part 2 my code
// the problem was not using jquerry like the site did, it solved the showing of the graph
// const crimeStat = document.querySelector("h1") // select h1 as anchor
// const crimeDiv = document.createElement("div") // create a div element
// crimeStat.appendChild(crimeDiv) // insert div to anchor
// const crimeCanva = document.createElement("canvas") // create canvas element for chart.js
// crimeDiv.appendChild(crimeCanva) // insert canvas element to div

// var dataPoints = [];
// $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function (data) {
//     $.each(data, function (key, value) {
//         dataPoints.push({ x: value[0], y: parseInt(value[1]) });
//     });
//     const ctx = crimeCanva.getContext('2d')
//     new Chart(ctx, {
//         type: 'line',
//         data: data,
//         options: {
//             scales: {
//                 y: {
//                     stacked: true
//                 }
//             }
//         }
//     });
//     updateChart()
// })

// function updateChart() {
//     $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function (data) {
//         $.each(data, function (key, value) {
//             dataPoints.push({
//                 x: parseInt(value[0]),
//                 y: parseInt(value[1])
//             });
//         });
//         setTimeout(function () { updateChart() }, 1000);
//     });
// }

// // GPT help
// Select the h1 element and insert the div after it
// const crimeStat = document.querySelector("h1");
// const crimeDiv = document.createElement("div");
// crimeStat.appendChild(crimeDiv);

// // Create and append canvas to the div
// const crimeCanva = document.createElement("canvas");
// crimeDiv.appendChild(crimeCanva);

// var dataPoints = [];
// var chart;

// // Initial data fetch and chart creation
// $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function (data) {
//     $.each(data, function (key, value) {
//         dataPoints.push({ x: value[0], y: parseInt(value[1]) });
//     });

//     const ctx = crimeCanva.getContext('2d');
//     chart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             datasets: [{
//                 label: 'Crime Statistics',
//                 data: dataPoints,
//                 fill: false,
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 tension: 0.1
//             }]
//         },
//         options: {
//             scales: {
//                 x: {
//                     type: 'linear',
//                     position: 'bottom'
//                 },
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });

//     // Start updating the chart
//     updateChart();
// });

// // Function to update the chart
// function updateChart() {
//     $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function (data) {
//         $.each(data, function (key, value) {
//             dataPoints.push({ x: parseInt(value[0]), y: parseInt(value[1]) });
//         });

//         // Update the chart with new data
//         chart.update();

//         // Continue updating the chart every second
//         setTimeout(function () { updateChart(); }, 1000);
//     });
// }

// // CLaude Sonnet help
// I asked for help since my code was not displaying, I found out that I didn't have jQuerry loaded
// for the rest, it was following the syntax provided 
const crimeStat = document.querySelector("h1");
const crimeDiv = document.createElement("div");
crimeStat.appendChild(crimeDiv);
const crimeCanva = document.createElement("canvas");
crimeDiv.appendChild(crimeCanva);

crimeCanva.style.width = '100%';
crimeCanva.style.height = '400px';

var dataPoints = [];
var chart;

$.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function (data) {
    $.each(data, function (key, value) {
        dataPoints.push({ x: value[0], y: parseInt(value[1]) });
    });

    const ctx = crimeCanva.getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Number of crimes per second',
                data: dataPoints,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Seconds passed'

                    }

                }
            }
        }
    });

    updateChart();
});

function updateChart() {
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({
                x: parseInt(value[0]),
                y: parseInt(value[1])
            });
        });
        chart.update();
        setTimeout(function () { updateChart() }, 1000);
    });
}
