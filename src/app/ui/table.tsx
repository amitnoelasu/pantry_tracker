"use server";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { InventoryItem } from "../types";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {getItems, deleteItem, addItemToDb, getSearchItems} from '../database.queries';
import { TablesInsert, TablesUpdate } from "../database.types";
import { RemoveItem } from './buttons';
import { getItemsWithPrefix } from '../actions/actions';


export default async function Table({prefix}: {prefix: string}) {

    let inventory = await getItemsWithPrefix(prefix);
    // console.log("inventory", inventory);
    return(
      <Stack width="800px" spacing={2} overflow="auto">
        {inventory.map((item) => (
          <Box key={item.name} // Ensure each item has a unique key
            height="100px" width="100%" display="flex" justifyContent="space-between" alignItems="center" bgcolor="#f0f0f0" padding={3} >
            <Typography variant="h4" color="#333" textAlign="left">
            {item.name} 
            </Typography>
            
            <Typography variant="h4" color="#333" textAlign="center">
            {item.quantity}
            </Typography>

            <RemoveItem item={item}/>
            
          </Box>
        ))}
      </Stack>
    );
}