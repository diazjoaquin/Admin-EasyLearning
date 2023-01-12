import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import s from './Navbar.module.css';
import BasicMenu from '../basicMenu/BasicMenu';
import axios from 'axios';
import { Button, Input, Modal } from '@mui/material';
import { ErrorSharp } from '@mui/icons-material';

export default function PrimarySearchAppBar() {

  const [errors, setErrors] = React.useState({
    email: "Incorrect email", password: "Incorrect password"
  })
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userDB = JSON.parse(sessionStorage.getItem("user"))

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );



  const handleChangeEmail = async (e) => {
    let response = await axios.get(`/getUserByEmail?email=${e.target.value}`)
    response?.data.admin ?
      setErrors({
        ...errors,
        email: null
      })
      : setErrors({
        ...errors,
        email: "no sos admin"
      })
  }

  const handleChangePassword = (e) => {
    if (e.target.value !== "4s>;=ThI") {
      setErrors({
        ...errors,
        password: "Password incorrect!"
      })
    } else {
      setErrors({
        ...errors,
        password: null
      })
    }
  }

  const handleSubmit = () => {
    if(errors.email === null && errors.password === null){
      handleClose()
      sessionStorage.setItem("user", JSON.stringify("on"))
    }
  }

  // logout
  const [update, setUpdate] = React.useState(false)
  const handleLogout = () => {
     sessionStorage.clear()
     setErrors({
      email: "Incorrect email", password: "Incorrect password"
    })
     setUpdate(!update)
  }

  React.useEffect(() => {
    if (!userDB)
      handleOpen()
  }, [userDB, update, errors])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,

        }}>
          <label htmlFor="">Email:</label>
          <br />
          <input onChange={handleChangeEmail}></input>
          {errors?.email?.length && <p> {errors.email}</p>}
          <br />
          <label htmlFor="">Password:</label>
          <br />
          <input type='password' onChange={handleChangePassword}></input>
          {errors?.password?.length && <p> {errors.password}</p>}
          <button onClick={handleSubmit} disabled={(errors?.email === null && errors?.password === null) ? false : true}> Submit </button>
        </Box>
      </Modal >
      <AppBar position="static">
        <Toolbar>
          <Link className={s.link} to='/'>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              EASYLEARNING - ADMIN
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <BasicMenu />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          </Box>
        <button onClick={handleLogout}>Log Out</button>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box >
  );
}