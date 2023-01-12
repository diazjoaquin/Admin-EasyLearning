import axios from 'axios';
import { useEffect, useState } from 'react';
import s from './Courses.module.css'

const Courses = () => {

    const [courses, setCourses] = useState();
    const [update, setUpdate] = useState(false);

    const getCourses = async () => {
        setCourses(await axios.get('/getAllCourses'));
    };

    useEffect(() => {
        getCourses();
    }, [update]);

    const handleClick = async (e, id) =>  {
        await axios.patch('/updateCourse',{ id, status: e.target.value})
        setUpdate(!update)
    }
    

    return (
        <section>
            <div>
                {courses?.data.map(course => {
                    return (
                        <div className={s.course} key={course.id}>
                            <h4>Name: {course.name}</h4>
                            <img src={course.image}/>
                            <h4>Description: {course.description}</h4>
                            <h4>Rating: {course.rating}</h4>
                            <h4>Price: {course.price}</h4>
                            <h4>Teacher: {course.teacherName}</h4>
                            <h4>Status: {course.status}</h4>
                            <button disabled={course.status === "BANNED"} onClick={(e) => handleClick(e, course.id)} value='BANNED'>Ban</button>
                            <button disabled={course.status === "APPROVED"} onClick={(e) => handleClick(e, course.id)} value='APPROVED'>Approve</button>
                        </div>
                    )
                })}
            </div>
        </section>
    )


};

export default Courses;