"use client";

import { Modal, Typography, Button, Box, TextField, Stack } from "@mui/material";
import { FormEvent, useState } from "react";
// import { AddItem } from "./buttons";
import { handleAddItemAction } from "../actions/actions";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function AddNewItem() {
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const handleClose = () =>  {setOpen(false); setItemName("")}
    const handleOpen = () => setOpen(true);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    }

    return (
        <Box>
        <Button variant="outlined" onClick={handleOpen}>Add Item</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            </Typography>
            <form action={handleAddItemAction}>
                <Box flexDirection="column" >
                    <Box padding={2}><TextField variant="outlined" placeholder="Enter item name" name="itemName" value={itemName} onChange={handleOnChange}></TextField></Box>
                    <Box padding={2}><Button variant="outlined" type="submit">
                        Add New Item
                    </Button></Box>
                    
                </Box>
                
            </form>
            
        </Box>
        </Modal>
        </Box>
    );
}