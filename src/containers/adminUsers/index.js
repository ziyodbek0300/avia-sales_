import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUser} from "../../redux/user/actions";
import MuiTable from "../../components/table";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AdminUsers() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
        dispatch(getAllUser())
    },[])

    const users = useSelector(state => state.user.users)
    console.log(users)
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Admins" {...a11yProps(0)} />
                    <Tab label="Agents" {...a11yProps(1)} />
                    <Tab label="New Agents" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <MuiTable/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MuiTable/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MuiTable/>
            </TabPanel>
        </Box>
    );
}
