import axios from 'axios';
import { useEffect, useState } from 'react';

const Courses = () => {

    const [courses, setCourses] = useState();

    const getCourses = async () => {
        setCourses(await axios.get('https://easylearning-owau.onrender.com/getAllCourses'));
    };

    useEffect(() => {
        getCourses();
    }, []);


    return (
        <section>
            <div>
                {courses?.data.map(course => {
                    return <div>{course.name}</div>
                })}
            </div>
        </section>
    )


};

export default Courses;