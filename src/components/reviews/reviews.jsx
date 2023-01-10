import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Reviews = ()=> {
  const [value, setValue] = React.useState('1');

  const [update, setUpdate] = useState(false)
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
 const [state, setState] = useState(null);

 const getAllReviews = async () => {
    const result = await axios.get("http://localhost:3001/getAllReviewTotal")
    setState(result.data)
 }


 useEffect(() => {
    if(!state)
    getAllReviews()
 }, [state, setState, update])

 const handleDeleted = async (id, string) => {
  console.log(id, string);
  let response = await axios.delete(`http://localhost:3001/deleteComments/${id}/${string}`)
  window.location.reload()
  
}
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Reviews Page:" value="1" />
            <Tab label="Reviews Courses:" value="2" />
            <Tab label="Comments Videos:" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"> 
        {state?state[0].map(comment => (
          <h2 key={comment.id}>
            <button onClick={() => handleDeleted(comment.id, "ReviewsPage")}>X</button>
            <h4>{comment.title}</h4>
            <h4>{comment.comments}</h4>
          </h2>
        )):undefined}</TabPanel>
        <TabPanel value="2">
          
        {state?state[1].map(comment => (
          <h2 key={comment.id}>
            <button onClick={() => handleDeleted(comment.id, "ReviewsCourses")}>X</button>
            <h4>{comment.title}</h4>
            <h4>{comment.comments}</h4>
          </h2>
        )):undefined}</TabPanel>
        <TabPanel value="3"><h2></h2>
        {state?state[2].map(comment => (
          <h2 key={comment.id}>
            <button onClick={() => handleDeleted(comment.id, "CommentsVideos")}>X</button>
            <h4>{comment.title}</h4>
            <h4>{comment.description}</h4>
          </h2>
        )):undefined}</TabPanel>
      </TabContext>
    </Box>
  );
}
export default Reviews;