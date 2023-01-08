import axios from "axios";
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Statistics = () => {

    const [state, setState] = useState();

    const getStatistics = async () => {
        setState(await axios.get("http://localhost:3001/getStatistics"))
    }

    useEffect(() => {
        getStatistics()
    }, [])

    const data = {
        labels:["Only students", "Teachers"],
        datasets: [{
            label: "Partidos",
            backgroundColor: ["gray", "white"],
            borderColor: "black",
            borderWidth: 2,
            hoverBackgroundColor: "yellow",
            hoverBorderColor: "white",
            data:[state?.data?.users-state?.data?.teachers, state?.data?.teachers]

          }]
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false
    }


    return (
        <div>
            <h1>Statistics:</h1>
            <div>
                <h4>Users: </h4>
                {state?.data?.users}
                <h4>Teachers: </h4>
                {state?.data?.teachers}
                <h4>Only students: </h4>
                {state?.data?.onlyStudents}
                <h4>Courses: </h4>
                {state?.data?.courses}
                <h4>Videos: </h4>
                {state?.data?.videos}
            </div>
            <div style={{width:"500px", height:"500px"}}>
                <h2>Chart</h2>
                <Pie data={data} options={options}/>
            </div>
        </div>
    )
}

export default Statistics;