import { Box, Divider, Tooltip, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';


const Users = () => {
  const [data, setData] = useState()
  const [usersSelected, setUsersSelected] = useState([])

  const getData = async (data, setData) => {
    let listUsers;
    listUsers = await axios.get("http://localhost:3001/getUsers");
    listUsers = listUsers.data
    setData(data = listUsers)
  }


  const handleAllSelect = (e) => {
    const checboxes = document.getElementsByClassName("checkbox")
    if (e.target.checked) {
      for (let i = 0; i < checboxes.length; i++) {
        checboxes[i].checked = true
      }
      setUsersSelected(data)
    }
    else {
      for (let i = 0; i < checboxes.length; i++) {
        checboxes[i].checked = false
      }
      setUsersSelected([])
    }
  }

  const handleSelect = (e, user) => {
    if (e.target.checked) {
      setUsersSelected([...usersSelected, user])
    } else {
      const userList = usersSelected
      const index = userList.findIndex(el => el.id === user.id)
      userList.splice(index, 1)
      setUsersSelected(userList)
    }
  }

  const handleActiveAll = async () => {
    console.log(usersSelected);
    let response = await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, status: "ACTIVE" })
    document.getElementById("checkbox1").checked = false;
    setUsersSelected([])
    setData(null)
    // setUpdate(!update)
    window.location.reload()
  }

  const handleBannedAll = async () => {
    let response = await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, status: "BANNED" })
    document.getElementById("checkbox1").checked = false;
    setUsersSelected([])
    setData(null)
    // setUpdate(!update)
    window.location.reload()
  }

  const handleDeletedAll = async () => {
    let response = await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, status: "DELETED" })
    document.getElementById("checkbox1").checked = false;
    setUsersSelected([])
    setData(null)
    // setUpdate(!update)
    window.location.reload()
  }

  const handleAdminAll = async () => {
    let response = await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, admin: true })
    document.getElementById("checkbox1").checked = false;
    setUsersSelected([])
    setData(null)
    // setUpdate(!update)
    window.location.reload()
  }

  const handleNoAdminAll = async () => {
    let response = await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, admin: false })
    document.getElementById("checkbox1").checked = false;
    setUsersSelected([])
    setData(null)
    // setUpdate(!update)
    window.location.reload()
  }

  useEffect(() => {
    if (!data) {
      getData(data, setData);
    }
  }, [data, setData])

  return (
    <Box width='100%' height='100vw'>
      {
        usersSelected?.length
          ? <Box display='flex' alignItems='center' justifyContent='space-between' px='1%' height='3%' mx='10px' mb='10px' borderRadius='10px' bgcolor='#bbdefb' >
            <h1>Panel</h1>
            <Tooltip title="Active" arrow placement="top">
              <CheckIcon onClick={handleActiveAll} />
            </Tooltip>
            <Tooltip title="Admin" arrow placement="top">
              <GroupAddIcon onClick={handleAdminAll} />
            </Tooltip>
            <Tooltip title="No-Admin" arrow placement="top">
              <GroupRemoveIcon onClick={handleNoAdminAll} />
            </Tooltip>
            <Tooltip title="Banned" arrow placement="top">
              <BlockIcon onClick={handleBannedAll} />
            </Tooltip>
            <Tooltip title="Deleted" arrow placement="top">
              <DeleteIcon onClick={handleDeletedAll} />
            </Tooltip>
          </Box>
          : undefined
      }
      <Box display='flex' alignItems='center' justifyContent='space-between' px='1%' height='3%' mx='10px' mb='10px' bgcolor='#bbdefb'>
        <Box width='5px'> <Input type="checkbox" name="" id="checkbox1" onChange={handleAllSelect} /></Box>
        <Divider color='black' orientation="vertical" flexItem />
        <Box display='flex' justifyContent='center' alignItems='center' width='300px' fontWeight='550'>Name</Box>
        <Divider color='black' orientation="vertical" flexItem />
        <Box display='flex' justifyContent='center' alignItems='center' width='300px' fontWeight='550' >Email</Box>
        <Divider color='black' orientation="vertical" flexItem />
        <Box display='flex' justifyContent='center' alignItems='center' width='300px' fontWeight='550'  > Admin</Box >
        <Divider color='black' orientation="vertical" flexItem />
        <Box display='flex' justifyContent='center' alignItems='center' width='300px' fontWeight='550'  > Status </Box >
      </Box >
      {
        data?.map(e => {
          const { id, fullName, emailAddress, admin, status } = e;
          return (
            <Box key={id} display='flex' alignItems='center' justifyContent='space-between' px='1%' height='3%' fontSize='20px' mx='10px' bgcolor={status === "BANNED" ? '#ef9a9a' : status === "ACTIVE" ? '#a5d6a7' : '#eeeeee'}>
              <Box width='5px'> <input className="checkbox" type="checkbox" name={id} onChange={(event) => handleSelect(event, e)} />  </Box>
              <Divider color='black' orientation="vertical" flexItem />
              <Box display='flex' justifyContent='center' width='300px'>{fullName}</Box>
              <Divider color='black' orientation="vertical" flexItem />
              <Box display='flex' justifyContent='center' width='300px'>{emailAddress}</Box>
              <Divider color='black' orientation="vertical" flexItem />
              <Box display='flex' justifyContent='center' width='300px'>{`${admin}`}</Box>
              <Divider color='black' orientation="vertical" flexItem />
              <Box display='flex' justifyContent='center' width='300px'>{status === "BANNED" ? <Button variant="outlined" color="error" disabled >Banned</Button> : status === "ACTIVE" ? <Button variant="contained" color="success" disabled>Active</Button> : <Button variant="contained" disabled>Deleted</Button>} </Box>
            </Box >
          )
        })
      }
    </Box >

  );
}

export default Users;
