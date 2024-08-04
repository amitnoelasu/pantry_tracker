import Image from "next/image";
import styles from "./page.module.css";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { InventoryItem } from "../types";
import { deleteItem } from "../database.queries";


interface TableProps {
    inventory: InventoryItem[];
    onDelete: () => void; // Define the type for the updateInventory function
  }
  

export default function Table({ inventory, onDelete }: TableProps) {
    const removeItem = async (item : InventoryItem) => {
        await deleteItem(item);
        await onDelete();
     }
    return(
        <Stack
        width="800px"
        spacing={2} // Adds spacing between inventory items
        overflow="auto"
      >
        {inventory.map((item) => (
          <Box
            key={item.name} // Ensure each item has a unique key
            height="100px"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#f0f0f0"
            padding={3}
          >
            <Typography variant="h4" color="#333" textAlign="left">
            {item.name} 
            </Typography>
            
            <Typography variant="h4" color="#333" textAlign="center">
            {item.quantity}
            </Typography>

            <Button variant="contained" onClick={(e)=>removeItem(item)}>Remove</Button>
            
          </Box>
        ))}
      </Stack>
    );
}