document.addEventListener("DOMContentLoaded", function () {
    // Part 1
    const h3 = document.querySelector("h3")
    const graphDiv1 = document.createElement("div")
    graphDiv1.setAttribute("style", "width: 800px")
    h3.appendChild(graphDiv1)

    const canvasInside = document.createElement("canvas")
    graphDiv1.appendChild(canvasInside)

    // Adding the graph over table 2, can't use h3 since there are several h4
    const graphDiv2 = document.createElement("div")
    graphDiv2.setAttribute("style", "width: 800px")
    const table2 = document.getElementById("table2")
    table2.parentNode.insertBefore(graphDiv2, table2)
    const canvasInside2 = document.createElement("canvas")
    graphDiv2.appendChild(canvasInside2)


    const tableData1 = document.getElementById("table1")
    const tableData2 = document.getElementById("table2")
    const tr1 = table1.querySelectorAll('tbody tr')
    const tr2 = table2.querySelectorAll('tbody tr')
    // table 1 values
    const xAxis1 = []
    const yAxis1 = []

    //table 2 values
    const xAxis2 = []
    const yAxis2 = []
    const yAxis2_5 = []


    // table 1 and only first line of data, year 2002
    tr1.forEach(row => {
        const cells = row.querySelectorAll('td')
        if (cells.length > 0) {
            xAxis1.push(cells[0].innerText)// country
            yAxis1.push(parseFloat(cells[1].innerText))// all after and in float not string, since innerText gives text
        }
    })

    tr2.forEach(row => {
        const cells = row.querySelectorAll("td")
        if (cells.length > 0) {
            xAxis2.push(cells[0].innerText)
            yAxis2.push(parseFloat(cells[1].innerText))
            yAxis2_5.push(parseFloat(cells[2].innerText))
        }
    })

    // only if inside the chart as a call document:
    //  ```document.getElementById('acquisitions'),```
    const ctx = canvasInside.getContext('2d')
    new Chart(ctx,
        {
            type: 'bar',
            data: {
                labels: xAxis1,
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: yAxis1,
                    }]
            },
            options: {
                responsive: true,
                // indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );

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

    //------- GPT -------
    // Select the h3 element
    // const h3 = document.querySelector("h3");

    // // Create a div for the graph
    // const graphDiv1 = document.createElement("div");
    // graphDiv1.style.width = "800px";

    // // Insert the graphDiv1 before the table
    // const table1 = document.getElementById("table1");
    // h3.parentNode.insertBefore(graphDiv1, table1);

    // // Create the canvas inside the graphDiv1
    // const canvasInside = document.createElement("canvas");
    // // canvasInside.id = "acquisitions";
    // graphDiv1.appendChild(canvasInside);

    // // Extract data from the table
    // const tr1 = table1.querySelectorAll('tbody tr');
    // const xAxis = [];
    // const yAxis = [];

    // tr1.forEach(row => {
    //     const cells = row.querySelectorAll('td');
    //     if (cells.length > 0) {
    //         xAxis.push(cells[0].innerText); // year
    //         yAxis.push(parseFloat(cells[1].innerText)); // count
    //     }
    // });

    // // Initialize the chart
    // const ctx = canvasInside.getContext('2d');
    // new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: xAxis,
    //         datasets: [{
    //             label: 'Acquisitions by year',
    //             data: yAxis,
    //             // backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //             // borderColor: 'rgba(75, 192, 192, 1)',
    //             // borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });

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
                    label: 'Crime Statistics',
                    data: dataPoints,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
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
});