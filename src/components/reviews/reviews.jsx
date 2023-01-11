import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Reviews = ()=> {
  const [value, setValue] = React.useState('1');

  // const [update, setUpdate] = useState(false)
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
 const [state, setState] = useState(null);

 const getAllReviews = async () => {
    const result = await axios.get("http://localhost:3001/getAllReviewTotal")
    setState(result.data)
 }
console.log(state);

 useEffect(() => {
    if(!state)
    getAllReviews()
 }, [state, setState])

 const handleDeleted = async (id, string) => {
  console.log(id, string);
  await axios.delete(`http://localhost:3001/deleteComments/${id}/${string}`)
  window.location.reload()
  
}
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
            <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => handleDeleted(comment.id, "ReviewsPage")}/>
                    </IconButton>
            <Divider variant="inset" component="li" />
           <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar src={comment.user.avatar} />
           </ListItemAvatar>
           <ListItemText
             primary={comment.title}
             secondary={
               <React.Fragment>
                 <Typography
                   sx={{ display: 'inline' }}
                   component="span"
                   variant="body2"
                   color="text.primary"
                   >
                   {comment.user.fullName} 
                 </Typography>
                 {" — "}{comment.comments}
               </React.Fragment>
             }
             />
         </ListItem>
             </h2>
        )):undefined}</TabPanel>
        
        
        <TabPanel value="2">
          
        {state?state[1].map(comment => (
          <h2 key={comment.id}>
            <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => handleDeleted(comment.id, "ReviewsCourses")}/>
                    </IconButton>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar src={comment.user.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.user.fullName} 
              </Typography>
              {" — "}{comment.comments}
            </React.Fragment>
          }
        />
      </ListItem>
          </h2>
        )):undefined}</TabPanel>
        <TabPanel value="3"><h2></h2>
        {state?state[2].map(comment => (
          <h2 key={comment.id}>
            <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => handleDeleted(comment.id, "CommentsVideos")}/>
                    </IconButton>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={comment.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.userName} 
              </Typography>
              {" — "}{comment.description}
            </React.Fragment>
          }
        />
        </ListItem>
          </h2>
        )):undefined}</TabPanel>
        </List>
      </TabContext>
    </Box>
  );
}
export default Reviews;

