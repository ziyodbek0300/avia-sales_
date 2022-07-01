import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Outlet, useLocation, useNavigate} from "react-router-dom"
import {GoDashboard} from "react-icons/go";
import Cookies from "js-cookie";
import {logOut} from "../../redux/user/actions";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {FaUser} from "react-icons/fa";

const drawerWidth = 240;

const routes = [
    {
        name: "Dashboard",
        icon: <GoDashboard/>,
        link: '/dashboard'
    },
    {
        name: "User",
        icon: <FaUser/>,
        link: '/users'
    },
    {
        name: "Dashboard",
        icon: <GoDashboard/>,
        link: '/dashboard1'
    }
]

function AdminNavbar(props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handlePress = (link) => {
        navigate(link)
    }

    const route = useLocation()
    const drawer = (
        <div>
            <Toolbar>
                <Typography fontSize={24} style={{fontWeight: "700"}}>
                    Logo
                </Typography>
            </Toolbar>
            <List>
                {routes.map((item, index) => (
                    <div key={Math.random()}>
                        {index === 0 && <Divider/>}
                        <ListItem
                            onClick={() => handlePress(item.link)} key={Math.random()}
                            sx={{backgroundColor: route.pathname === item.link ? "rgba(142,221,239,0.38)" : "transparent"}}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const handlePressLogOut = () => {
        Cookies.remove("token")
        dispatch(logOut())
        navigate("/")
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        Logo
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Avia sales
                    </Typography>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Button onClick={handlePressLogOut} style={{color: 'white', textTransform: 'capitalize'}}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}

AdminNavbar.propTypes = {
    window: PropTypes.func,
};

export default AdminNavbar;
