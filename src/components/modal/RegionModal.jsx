import React, {useEffect, useState} from "react"
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import regions from "../../api/projectApi/regions";
import Select from "react-select";
import hotelsTownLists from "../../constants/hotelsTownLists";
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

const RegionModal = ({open, handleClose, type, values, setRegions}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [data, setData] = useState({
        name: '',
        regionId: null,
        ...values,
    })

    useEffect(() => {
        if (open) {
            let id = values?.regionId
            let a
            for (let i = 0; i < hotelsTownLists.length; i++) {
                if (hotelsTownLists[i].id === id) {
                    a = hotelsTownLists[i]
                    break;
                }
            }
            setData({
                name: '',
                ...values,
                regionId: a?.id ? {
                    value: a?.id,
                    label: a?.title
                } : null,
            })
        }
    }, [values])

    const handlePressSubmit = () => {
        if (type === "create") {
            regions.addNew({
                name: data.name,
                regionId: data.regionId?.value
            }).then(res => {
                regions.getAllRegions().then(res => setRegions(res.data.result))
            }).catch(e => {
                toast(e.message, {type: "error"})
            })
        } else {
            regions.update(data.id, {
                name: data.name,
                regionId: data.regionId?.value
            }).then(res => {
                regions.getAllRegions().then(res => setRegions(res.data.result))
            }).catch(e => {
                toast(e.message, {type: "error"})
            })
        }
        handleClose();
    }
    const handleChange = (event) => {
        setData({...data, regionId: event});
    };
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
                                value={data.name}
                                style={{width: "100%"}}
                                className={"p-3"}
                                variant={"outlined"}
                                placeholder={"Name and short name"}
                                onChange={(event) => setData({...data, name: event.target.value})}
                            />
                        </Box>
                    </Box>
                    <Box style={{marginTop: 8}}>
                        <Box style={{marginTop: 4}}>
                            <Select
                                // defaultValue={data.regionId.}
                                value={data.regionId}
                                label="Region"
                                onChange={handleChange}
                                options={hotelsTownLists.map(e => ({value: e.id, label: e.title}))}
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
    )
}

export default RegionModal
