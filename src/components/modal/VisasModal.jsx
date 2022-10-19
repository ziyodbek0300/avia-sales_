import React, {useEffect, useState} from 'react';
import {Box, Button, InputLabel, Modal, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import regions from "../../api/projectApi/regions";
import {toast} from "react-toastify";
import Select from "react-select";
import {InputNumber} from "rsuite";
import flights from "../../api/projectApi/flights";
import {getAllFlights} from "../../redux/flights/actions";
import {useDispatch} from "react-redux";
import moment from "moment";
import ReactSelect from "react-select";
import weekdays from "../../constants/weekdays";

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

function VisasModal({open, handleClose, type, values, setRegions}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [regionsList, setRegionsList] = useState([]);
    const [wDays, setWDays] = useState([]);
    const [data, setData] = useState({
        fromId: null, toId: null, startTime: null, endTime: null, duration: null, price: null, description: null
    })

    useEffect(() => {
        if (open) {
            regions.getAllRegions().then(res => {
                setRegionsList(res.data.result.map(r => {
                    return {value: r.id, label: r.name}
                }))
            })
        }


    }, [open])

    const handlePressSubmit = () => {
        flights.addNew({
            ...data,
            startTime: moment(data.startTime).toDate(),
            endTime: moment(data.endTime).toDate(),
            description: data + "",
            price: +data.price,
            duration: +data.duration,
            weekDays: wDays
        })
            .then(r => {
                dispatch(getAllFlights())
            })
            .catch(e => {
                toast(`${e.message}`, {type: "error"})
            })
        handleClose();
    }

    const wds = weekdays.map((wd, ind) => {
        return {value: ind, label: wd}
    })

    return (<div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{...style, width: matches ? '50%' : "70%"}}>
                <Typography fontSize={24}>
                    {type === "create" ? `Создать регион` : ''}
                </Typography>
                <Box style={{marginTop: 8}}>
                    <Box style={{marginBottom: 8}}>
                        <InputLabel>From</InputLabel>
                        <Select
                            options={regionsList}
                            style={{width: "100%", padding: 0}}
                            variant={"outlined"}
                            onChange={e => {
                                setData({...data, fromId: e.value})
                            }}
                        />
                    </Box>
                    <Box style={{marginBottom: 8}}>
                        <InputLabel>To</InputLabel>
                        <Select
                            options={regionsList}
                            style={{width: "100%", padding: 0}}
                            variant={"outlined"}
                            onChange={e => {
                                setData({...data, toId: e.value})
                            }}
                        />
                    </Box>
                    <Box style={{marginBottom: 8}}>
                        <InputLabel>Start Time</InputLabel>
                        <input
                            style={{width: "100%"}}
                            className={"px-2 py-[0.4rem] border-[.122rem] border-gray-300 rounded-md"}
                            type={"datetime-local"}
                            onChange={(event) => setData({...data, startTime: event.target.value})}
                        />
                    </Box>
                    <Box style={{marginBottom: 8}}>
                        <InputLabel>End Time</InputLabel>
                        <input
                            style={{width: "100%"}}
                            className={"px-2 py-[0.4rem] border-[.122rem] border-gray-300 rounded-md"}
                            type={"datetime-local"}
                            onChange={(event) => setData({...data, endTime: event.target.value})}
                        />
                    </Box>
                    <Box style={{marginBottom: 8}}>
                        <InputLabel>Week Days</InputLabel>
                        <ReactSelect
                            isMulti
                            style={{width: "100%"}}
                            options={wds}
                            onChange={(e) => {
                                let a = [];
                                e.map(q => a.push(q.value));
                                setWDays(a);
                            }}
                        />
                    </Box>
                    <Box style={{marginBottom: 8}}>
                        <InputLabel>Duration</InputLabel>
                        <InputNumber
                            style={{width: "100%"}}
                            className={"px-0 py-0 border-2 border-gray-300 rounded-md z-0"}
                            type={"datetime-local"}
                            onChange={(event) => setData({...data, duration: event})}
                        />
                    </Box>
                    <Box style={{marginTop: 4}}>
                        <InputLabel>Price</InputLabel>
                        <TextField
                            value={values.price}
                            style={{width: "100%"}}
                            className={"p-3"}
                            variant={"outlined"}
                            onChange={(event) => setData({...data, price: event.target.value})}
                        />
                    </Box>
                </Box>
                <Button
                    onClick={handlePressSubmit}
                    style={{width: '100%', borderRadius: 10, height: 35, marginTop: 16}}
                    variant={"outlined"}
                >
                    <Typography>
                        Сохранять
                    </Typography>
                </Button>
            </Box>
        </Modal>
    </div>);
}

export default VisasModal;
