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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default async function InventoryTable({prefix}: {prefix: string}) {

    let inventory = await getItemsWithPrefix(prefix);
    // console.log("inventory", inventory);
    return(

      <Box width="800px" height="400px" overflow="auto">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 , }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" ><b>Item Name</b></TableCell>
            <TableCell align="center"><b>Quantity</b></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center"><RemoveItem item={item}/></TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    );
}