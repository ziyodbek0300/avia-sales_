import React, {useEffect, useState} from 'react';
import {Box, Button, InputLabel, Modal, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import regions from "../../api/projectApi/regions";
import {toast} from "react-toastify";
import Select from "react-select";
import DateInput from "react-date-range/dist/components/DateInput";
import {DatePicker} from "@mui/x-date-pickers";
import {InputNumber} from "rsuite";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 0,
    p: 4,
    borderRadius: 5
};

function FlightsModal({open, handleClose, type, values, setRegions}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [regionsList, setRegionsList] = useState([]);
    const [data, setData] = useState({
        name: '',
        ...values,
    })

    useEffect(() => {
        if (open) {
            setData(values)
        }

        regions.getAllRegions().then(res => {
            setRegionsList(res.data.result[0].map(r => {
                return {value: r.id, label: r.name}
            }))
        })
    }, [values])

    const handlePressSubmit = () => {
        regions.addNew({name: data.name}).then(res => setRegions(prev => [...prev, res.data.result]))
        handleClose();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{...style, width: matches ? '50%' : "70%"}}>
                    <Typography fontSize={24}>
                        {type === "create" ? `Create region` : ''}
                    </Typography>
                    <Box style={{marginTop: 8}}>
                        <Box style={{marginBottom: 8}}>
                            <InputLabel>From</InputLabel>
                            <Select
                                options={regionsList}
                                style={{width: "100%", padding: 0}}
                                variant={"outlined"}
                            />
                        </Box>
                        <Box style={{marginBottom: 8}}>
                            <InputLabel>To</InputLabel>
                            <Select
                                options={regionsList}
                                style={{width: "100%", padding: 0}}
                                variant={"outlined"}
                            />
                        </Box>
                        <Box style={{marginBottom: 8}}>
                            <InputLabel>Start Time</InputLabel>
                            <input
                                style={{width: "100%"}}
                                className={"px-2 py-[0.4rem] border-[.122rem] border-gray-300 rounded-md"}
                                type={"datetime-local"}
                                onChange={(event) => setData({...values, name: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginBottom: 8}}>
                            <InputLabel>End Time</InputLabel>
                            <input
                                style={{width: "100%"}}
                                className={"px-2 py-[0.4rem] border-2 border-gray-300 rounded-md"}
                                type={"datetime-local"}
                                onChange={(event) => setData({...values, name: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginBottom: 8}}>
                            <InputLabel>Duration</InputLabel>
                            <InputNumber
                                style={{width: "100%"}}
                                className={"px-0 py-0 border-2 border-gray-300 rounded-md"}
                                type={"datetime-local"}
                                onChange={(event) => console.log(event)}
                            />
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <InputLabel>Price</InputLabel>
                            <TextField
                                value={values.name}
                                style={{width: "100%"}}
                                className={"p-3"}
                                variant={"outlined"}
                                placeholder={"Name and short name"}
                                onChange={(event) => setData({...values, name: event.target.value})}
                            />
                        </Box>
                    </Box>
                    <Button
                        onClick={handlePressSubmit}
                        style={{width: '100%', borderRadius: 10, height: 35, marginTop: 16}}
                        variant={"outlined"}
                    >
                        <Typography>
                            Save
                        </Typography>
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default FlightsModal;
