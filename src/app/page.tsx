"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { InventoryItem } from "./types";
import {getItems, deleteItem, addItemToDb, getSearchItems} from './database.queries';
import { TablesInsert, TablesUpdate } from "./database.types";
import Search from "./ui/search";
import Table from "./ui/table";




export default function Page({
  searchParams,
}: {
  searchParams?: {
    item?: string;
  };
}) {
  //state for invtory
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [itemName, setItemName] = useState('');

  const updateInventory =  async () => {
    let docs = await getItems();
    console.log(docs);
    const inventoryList : InventoryItem[] = [];
    if(searchParams?.item) {
      docs = await getSearchItems(prefix);
    } 
    docs.forEach((doc) => {
      inventoryList.push({
          id: doc.id,
          name: doc.name,
          quantity: doc.quantity,
        });
    })
    
    
    setInventory(inventoryList);
    // console.log('inventoryList', inventory);
  }


  


  const addItem = async (item: string) => {
    const newItem: TablesInsert<"items"> = {
      name: item,
      quantity: 1
    }

    await addItemToDb(newItem);
    await updateInventory();
  }


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    updateInventory()
  }, [searchParams?.item]);


  const prefix = searchParams?.item || '';

  const getSearchResults = async (prefix: string) => {
    
  }


  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Modal open={open} onClose={handleClose}>
      <Box position="absolute" top="50%" left="50%"  width={400} bgcolor="white" border="2px solid #000" boxShadow={24} p={4} display="flex" sx={{transform: 'translate(-50%,-50%)'}}flexDirection="column" gap={3}>
          
          <Typography variant="h3">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField variant='outlined' fullWidth value={itemName} onChange={(e) => {setItemName(e.target.value)}}></TextField>
            <Button onClick={(e) => {addItem(itemName); setItemName(''); handleClose()}}>Add</Button>
          </Stack>
      </Box>

      </Modal>
      <Button variant="outlined" onClick={()=>{handleOpen()}}>Add New Item</Button>
      <Box
        width="800px"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff0f1"
        mb={2} // Adds margin-bottom to separate heading from inventory items
      >
        <Typography variant="h3">Inventory Management System</Typography>
        <Search placeholder="Search for an item" />
        
      </Box>
      
      <Table inventory={inventory} onDelete={updateInventory}/>
      
      
    </Box>
      
  );
}
