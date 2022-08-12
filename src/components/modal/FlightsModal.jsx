import React, {useEffect, useState} from 'react';
import {Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import regions from "../../api/projectApi/regions";
import {toast} from "react-toastify";

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
    borderRadius: 8
};

function FlightsModal({open, handleClose, type, values, setRegions}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [data, setData] = useState({
        name: '',
        ...values,
    })

    useEffect(() => {
        if (open) {
            setData(values)
        }
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
                        <Box style={{marginTop: 4}}>
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
