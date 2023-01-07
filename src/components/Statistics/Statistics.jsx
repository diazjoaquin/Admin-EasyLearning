import axios from "axios";
import { useEffect, useState } from "react";

const Statistics = () => {

    const [state, setState] = useState();

    const getStatistics = async () => {
        setState(await axios.get("http://localhost:3001/getStatistics"))
    }

    useEffect(() => {
        getStatistics()
    }, [])

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
        </div>
    )
}

export default Statistics;