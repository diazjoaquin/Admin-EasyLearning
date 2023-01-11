import axios from "axios";
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import s from "./Statistics.module.css"
import ChartBar from "./ChartBar";

const Statistics = () => {

    const [state, setState] = useState();

    const getStatistics = async () => {
        setState(await axios.get("/getStatistics"))
    }

    useEffect(() => {
        getStatistics()
    }, [])

    const data = {
        labels:["Only students", "Teachers"],
        datasets: [{
            label: "Total",
            backgroundColor: ["#304ffe", "#448aff"],
            borderColor: "black",
            borderWidth: 2,
            hoverBackgroundColor: "#bdbdbd",
            hoverBorderColor: "black",
            data:[state?.data?.users-state?.data?.teachers, state?.data?.teachers]
          }]
    }
    const data2 = {
        labels:["Reviews page", "Reviews courses", "Comments videos"],
        datasets: [{
            label: "Total",
            backgroundColor: ["#304ffe", "#448aff", "#90caf9"],
            borderColor: "black",
            borderWidth: 2,
            hoverBackgroundColor: "#bdbdbd",
            hoverBorderColor: "black",
            data:[state?.data?.reviewsPage, state?.data?.reviewsCourse, state?.data?.commentsVideo]
          }]
    }
    const data3 = {
        labels:["Courses", "Teachers"],
        datasets: [{
            label: "Total",
            backgroundColor: ["#304ffe", "#448aff"],
            borderColor: "black",
            borderWidth: 2,
            hoverBackgroundColor: "#bdbdbd",
            hoverBorderColor: "black",
            data:[state?.data?.courses, state?.data?.teachers]
          }]
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false
    }


    return (
        <div>
            <h1 className={s.title}>Statistics:</h1>
            <div className={s.infoContainer}>
                <h4 className={s.info}>Users: </h4>
                <h2 className={s.info2}>{state?.data?.users}</h2>
                <h4 className={s.info}>Teachers: </h4>
                <h2 className={s.info2}>{state?.data?.teachers}</h2>
                <h4 className={s.info}>Only students: </h4>
                <h2 className={s.info2}>{state?.data?.onlyStudents}</h2>
                <h4 className={s.info}>Courses: </h4>
                <h2 className={s.info2}>{state?.data?.courses}</h2>
                <h4 className={s.info}>Videos: </h4>
                <h2 className={s.info2}>{state?.data?.videos}</h2>
                <h4 className={s.info}>Reviews page: </h4>
                <h2 className={s.info2}>{state?.data?.reviewsPage}</h2>
                <h4 className={s.info}>Reviews courses: </h4>
                <h2 className={s.info2}>{state?.data?.reviewsCourse}</h2>
                <h4 className={s.info}>Comments videos: </h4>
                <h2 className={s.info2}>{state?.data?.commentsVideo}</h2>
                
            </div>
                <div className={s.infoContainer2}>
                    <div style={{width:"33%", height:"40vh"}}>
                    <h2 className={s.title}>Only students/Teachers</h2>
                    <Pie data={data} options={options}/>
                </div>
                <div style={{width:"33%", height:"40vh"}}>
                    <h2 className={s.title}>Reviews/Comments</h2>
                    <Pie data={data2} options={options}/>
                </div>
                <div style={{width:"33%", height:"40vh"}}>
                    <h2 className={s.title}>Courses/Teachers</h2>
                    <Pie data={data3} options={options}/>
                </div>
            </div>
            <div className={s.infoContainer3}>
                <ChartBar/>
            </div>
            
        </div>
    )
}

export default Statistics;