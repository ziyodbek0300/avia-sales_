import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {acceptAgent, deleteUser, getAllUser} from "../../redux/user/actions";
import MuiTable from "../../components/table";
import {Button} from "@mui/material";
import {GrView, GrTrash, GrCheckmark, GrEdit} from "react-icons/gr";
import {MainApi} from "../../api/projectApi";
import UserModal from "../../components/modal/UserModal";
import {userRole} from "../../constants/userRole";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
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


const headCells = [
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
        isTime: false
    },
    {
        id: 'fullName',
        numeric: true,
        disablePadding: false,
        label: 'Fullname',
        isTime: false
    },
    {
        id: 'city',
        numeric: true,
        disablePadding: false,
        label: 'City',
        isTime: false
    },
    {
        id: 'phone',
        numeric: true,
        disablePadding: false,
        label: 'Phone',
        isTime: false
    },
    {
        id: 'nameCompany',
        numeric: true,
        disablePadding: false,
        label: 'Company name',
        isTime: false
    },
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'Created time',
        isTime: true
    },
    {
        id: 'edit',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
        isTime: false
    },
];

export default function AdminUsers() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getAllUser())
    }, [])

    const users = useSelector(state => state.user.users)

    const handlePressAccept = (id) => {
        dispatch(acceptAgent(id))
    }

    const handlePressDelete = (id) => {
        dispatch(deleteUser(id))
    }

    const [userModal, setUserModal] = useState({
        typeModal: "create",
        openModal: false,
        values: {}
    })

    const handleClose = () => {
        setUserModal({
            typeModal: "create",
            openModal: false,
            values: {}
        })
    }

    const handlePressItemEdit = (type, item) => {
        console.log(item)
        setUserModal({
            typeModal: type,
            openModal: true,
            values: item
        })
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Admins" {...a11yProps(0)} />
                    <Tab label="Agents" {...a11yProps(1)} />
                    <Tab label="New Agents" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box style={{display: 'flex', justifyContent: 'flex-end', height: 56, alignItems: 'center'}}>
                    <Button onClick={() => handlePressItemEdit("create", {role: userRole.admin})}>
                        <Typography>
                            Create Admin
                        </Typography>
                    </Button>
                </Box>
                <MuiTable
                    tableName={"Admins"}
                    rows={users.admin?.map(r => {
                        return {
                            ...r,
                            edit: (item) => (
                                <div>
                                    <Button variant={"outlined"} onClick={() => handlePressDelete(item.id)}>
                                        <GrTrash color="blue" fontSize="1.5em"/>
                                    </Button>
                                    <Button variant={"outlined"} onClick={() => handlePressItemEdit("update", item)}>
                                        <GrEdit fontSize="1.5em"/>
                                    </Button>
                                </div>
                            )
                        }
                    })}
                    headCells={headCells}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box style={{display: 'flex', justifyContent: 'flex-end', height: 56, alignItems: 'center'}}>
                    <Button onClick={() => handlePressItemEdit("create", {role: userRole.agent})}>
                        <Typography>
                            Create Agent
                        </Typography>
                    </Button>
                </Box>
                <MuiTable
                    tableName={"Agents"}
                    rows={users.agent?.map(r => {
                        return {
                            ...r,
                            edit: (item) => (
                                <div>
                                    <Button variant={"outlined"} onClick={() => handlePressDelete(item.id)}>
                                        <GrTrash color="blue" fontSize="1.5em"/>
                                    </Button>
                                    <Button variant={"outlined"} onClick={() => handlePressItemEdit("update", item)}>
                                        <GrEdit fontSize="1.5em"/>
                                    </Button>
                                </div>
                            )
                        }
                    })}
                    headCells={headCells}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MuiTable
                    tableName={"New Agents"}
                    rows={users.newAgent?.map(r => {
                        return {
                            ...r,
                            edit: (item) => (
                                <div>
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => window.open(
                                            `${MainApi}/${item.doc}`,
                                            '_blank',
                                            'noopener,noreferrer')
                                        }
                                    >
                                        <GrView fontSize="1.5em"/>
                                    </Button>
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => handlePressAccept(item.id)}
                                    >
                                        <GrCheckmark fontSize="1.5em"/>
                                    </Button>
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => handlePressDelete(item.id)}
                                    >
                                        <GrTrash fontSize="1.5em"/>
                                    </Button>
                                </div>
                            )
                        }
                    })}
                    headCells={headCells}
                />
            </TabPanel>
            <UserModal
                type={userModal.typeModal}
                open={userModal.openModal}
                handleClose={handleClose}
                values={userModal.values}
            />
        </Box>
    );
}
