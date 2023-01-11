import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import s from './Sidebar.module.css'
import ReviewsIcon from '@mui/icons-material/Reviews';

const Sidebar = () => {
    return (
        <div>
        <React.Fragment>
            <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <Link className={s.link} to='/courses'>
            <ListItemText primary="Courses" />
            </Link>
            </ListItemButton>
            <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <Link className={s.link} to='users'>
                        <ListItemText primary="Users" />
                    </Link>
            </ListItemButton>
            <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <Link className={s.link} to='/statistics'>
                <ListItemText primary="Statistics" />
            </Link>
                </ListItemButton>
            <ListItemButton>
            <ListItemIcon>
                <ReviewsIcon />
            </ListItemIcon>
            <Link className={s.link} to='/reviews'>
                <ListItemText primary="Reviews" />
            </Link>
            </ListItemButton>
            
        </React.Fragment>
        </div>
        )
    }

           


export default Sidebar;