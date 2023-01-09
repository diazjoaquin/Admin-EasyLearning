import axios from "axios";
import { useEffect, useState } from "react";

const Reviews = () => {
 const [state, setState] = useState(null);

 const getAllReviwes = async () => {
    const result = await axios.get("http://localhost:3001/getAllReviewTotal")
    setState(result.data)
 }


 useEffect(() => {
    if(!state)
    getAllReviwes()
 }, [state, setState])
 

 return (
    <div>
        <h2>Reviwes Page:</h2>
        {state?state[0].map(comment => (
          <h2 key={comment.id}>
            <h4>{comment.title}</h4>
            <h4>{comment.comments}</h4>
          </h2>
        )):undefined}
        
        <h2>Comments Courses:</h2>
        {state?state[1].map(comment => (
          <h2 key={comment.id}>
            <h4>{comment.title}</h4>
            <h4>{comment.comments}</h4>
          </h2>
        )):undefined}

       <h2>Comments Videos:</h2>
        {state?state[2].map(comment => (
          <h2 key={comment.id}>
            <h4>{comment.title}</h4>
            <h4>{comment.description}</h4>
          </h2>
        )):undefined}

    </div>
 )
}
export default Reviews;