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
import Swal from "sweetalert2";


const Users = () => {
  const [data, setData] = useState()
  const [usersSelected, setUsersSelected] = useState([])
  const [update, setUpdate] = useState(false)

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
    setUpdate(!update)
  }

  const handleActiveAll = async () => {
    Swal.fire({
      text: `Are you sure you want to activate ${usersSelected.length} users?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, status: "ACTIVE" })
        document.getElementById("checkbox1").checked = false;
        await setUsersSelected([])
        await setData(null)
        await setUpdate(!update)

      }
    })

  }

  const handleBannedAll = async () => {
    Swal.fire({
      text: `Are you sure you want to banned ${usersSelected.length} users?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, status: "BANNED" })
        document.getElementById("checkbox1").checked = false;
        await setUsersSelected([])
        await setData(null)
        await setUpdate(!update)

      }
    })
  }

  const handleDeletedAll = async () => {
    Swal.fire({
      text: `Are you sure you want to deleted ${usersSelected.length} users?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, status: "DELETED" })
        document.getElementById("checkbox1").checked = false;
        await setUsersSelected([])
        await setData(null)
        await setUpdate(!update)

      }
    })
  }

  const handleAdminAll = async () => {
    Swal.fire({
      text: `Are you sure you want to admin ${usersSelected.length} users?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, admin: true })
        document.getElementById("checkbox1").checked = false;
        await setUsersSelected([])
        await setData(null)
        await setUpdate(!update)

      }
    })
  }

  const handleNoAdminAll = async () => {
    Swal.fire({
      text: `Are you sure you want to No-Admin ${usersSelected.length} users?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("http://localhost:3001/updateUserDashboard", { array: usersSelected, admin: false })
        document.getElementById("checkbox1").checked = false;
        await setUsersSelected([])
        await setData(null)
        await setUpdate(!update)

      }
    })
  }

  useEffect(() => {
    if (!data) {
      getData(data, setData);
    }
  }, [data, setData, update])

  return (
    <Box width='100%' height='100vw'>
      {
        <Box display='flex' alignItems='center' justifyContent='space-between' px='1%' height='3%' mx='10px' mb='10px' borderRadius='10px' bgcolor='#bbdefb' >
          <Tooltip title="Active" arrow placement="top">
            <Button onClick={handleActiveAll} disabled={usersSelected?.length ? false : true}><CheckIcon /></Button>
          </Tooltip>
          <Tooltip title="Admin" arrow placement="top">
            <Button onClick={handleAdminAll} disabled={usersSelected?.length ? false : true}><GroupAddIcon /></Button>
          </Tooltip>
          <Tooltip title="No-Admin" arrow placement="top">
            <Button onClick={handleNoAdminAll} disabled={usersSelected?.length ? false : true}><GroupRemoveIcon /></Button>
          </Tooltip>
          <Tooltip title="Banned" arrow placement="top">
            <Button onClick={handleBannedAll} disabled={usersSelected?.length ? false : true}><BlockIcon /></Button>
          </Tooltip>
          <Tooltip title="Deleted" arrow placement="top">
            <Button onClick={handleDeletedAll} disabled={usersSelected?.length ? false : true}><DeleteIcon /></Button>
          </Tooltip>
        </Box>
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
              <Box display='flex' justifyContent='center' width='300px'>{status === "BANNED" ? <Button variant="outlined" color="error"  >Banned</Button> : status === "ACTIVE" ? <Button variant="contained" color="success" >Active</Button> : <Button variant="contained" >Deleted</Button>} </Box>
            </Box >
          )
        })
      }
    </Box >

  );
}

export default Users;
