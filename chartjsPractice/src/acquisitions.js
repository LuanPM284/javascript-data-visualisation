import Chart from 'chart.js/auto'
// for the api import
import { getAquisitionsByYear } from './api'
// dummy data for this exemple
(async function () {
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];
    // a already made template with animations and reponsivness
    new Chart(
        document.getElementById('acquisitions'),
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                    }
                ]
            }
        }
    );
})();

// another version without the animations when the page is reloaded

// (async function () {
// const data = [
//     { year: 2010, count: 10 },
//     { year: 2011, count: 20 },
//     { year: 2012, count: 15 },
//     { year: 2013, count: 25 },
//     { year: 2014, count: 22 },
//     { year: 2015, count: 30 },
//     { year: 2016, count: 28 },
// ];
// for the API version we add the an import up the file and this
//     new Chart(
//         document.getElementById('acquisitions'),
//         {
//             type: 'bar',
//             options: {
//                 animation: false,
//                 plugins: {
//                     legend: {
//                         display: false
//                     },
//                     tooltip: {
//                         enabled: false
//                     }
//                 }
//             },
//             data: {
//                 labels: data.map(row => row.year),
//                 datasets: [
//                     {
//                         label: 'Acquisitions by year',
//                         data: data.map(row => row.count)
//                     }
//                 ]
//             }
//         }
//     );

// })();

// a version where api data is used


(async function () {
    // for the API version we add the an import up the file and this
    const data = await getAquisitionsByYear();
    new Chart(
        document.getElementById('acquisitions'),
        {
            type: 'bar',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            },
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                    }
                ]
            }
        }
    );

})();

// --- for new chart ---