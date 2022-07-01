import React, {useEffect, useState} from "react"
import {Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {userRole} from "../../constants/userRole";

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

const UserModal = ({open, handleClose, type, values}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [data, setData] = useState(values)

    useEffect(() => {
        if (open) {
            setData(values)
        }
    }, [values])

    const handlePressSubmit = () => {
        if (type==="create"){

        } else {

        }
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
                    <Typography fontSize={32}>
                        {type === "create" ? `Create ${userRole.admin===data.role ? "Admin" : "Agent"}` : `Update ${userRole.admin===data.role ? "Admin" : "Agent"}`}
                    </Typography>
                    <Box style={{marginTop: 8}}>

                    </Box>
                    <Button
                        onClick={handlePressSubmit}
                        style={{width: '100%', borderRadius: 10, height: 48, marginTop: 16}}
                        variant={"outlined"}
                    >
                        <Typography>
                            Login
                        </Typography>
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UserModal