var xValues = ["Ocjena 1", "Ocjena 2", "Ocjena 3", "Ocjena 4", "Ocjena 5"];
var barColors = ["red", "green", "blue", "orange", "brown"];

console.log(rating_numbers);

new Chart("statistics-chart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: rating_numbers,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Statistika ocjenjivanja",
    },
    responsive: true,
    cutoutPercentage: 50,
    legend: {
      display: false,
    },
  },
});
