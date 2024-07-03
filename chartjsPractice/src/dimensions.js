import Chart from 'chart.js/auto'
import { getDimensions } from './api'

(async function () {
    const data = await getDimensions();

    new Chart(
        document.getElementById('dimensions'),
        {
            type: 'bubble',
            // this will square of the graph, by default not square shaped
            options: {
                aspectRatio: 1,
                scales: {
                    x: {
                        max: 500,
                        ticks: {
                            callback: value => `${value / 100} m`
                        }
                    },
                    y: {
                        max: 500,
                        ticks: {
                            callback: value => `${value / 100} m`
                        }
                    }
                }
            },
            //
            data: {
                labels: data.map(x => x.year),
                // datasets: [
                //     {
                //         label: 'Dimensions',
                //         data: data.map(row => ({
                //             x: row.width,
                //             y: row.height,
                //             r: row.count
                //         }))
                //     }
                // ]
                datasets: [
                    {
                        label: 'width = height',
                        data: data
                            .filter(row => row.width === row.height)
                            .map(row => ({
                                x: row.width,
                                y: row.height,
                                r: row.count
                            }))
                    },
                    {
                        label: 'width > height',
                        data: data
                            .filter(row => row.width > row.height)
                            .map(row => ({
                                x: row.width,
                                y: row.height,
                                r: row.count
                            }))
                    },
                    {
                        label: 'width < height',
                        data: data
                            .filter(row => row.width < row.height)
                            .map(row => ({
                                x: row.width,
                                y: row.height,
                                r: row.count
                            }))
                    }
                ]
            }

        }
    );
})();
