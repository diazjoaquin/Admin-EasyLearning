import { Bar, } from 'react-chartjs-2';
import 'chart.js/auto';
import s from './ChartBar.module.css';

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
  labels: labels,
  datasets: [{
    label: 'Registered users',
    data: [65, 59, 80, 81, 56, 55, 40], //hacer ruta que traiga usuarios registrados por mes
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
const options = {
    responsive: true,
    maintainAspectRatio: false
}

const ChartBar = () => {
    return(
        <Bar className={s.chartBar} data={data} options={options}/>
    )
}

export default ChartBar;