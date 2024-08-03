"use client";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {firestore} from '@/app/firebase';
import { collection, getDocs, query, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";


const item= [
  'tomato',
  'potato',
  'onion',
  'garlic',
  'ginger',
  'carrot'
]
export default function Home() {
  //state for invtory
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory =  async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
          name: doc.id, // Use document ID as 'name'
          quantity: doc.data().quantity,
        });
    })
    setInventory(inventoryList);
  }

  const removeItem = async (item) => {
    // console.log(item);
    const docRef = doc(collection(firestore, 'inventory'), item);
    // console.log(docRef);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap);

    if(docSnap.exists()) {
      const {quantity} = docSnap.data();
      if(quantity == 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {quantity: quantity - 1});
      }
    }

    await updateInventory();
  }


  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1});
    } else {
      await setDoc(docRef, {quantity: 1});
    }

    await updateInventory();
  }


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    updateInventory()
  }, []);
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
          
        
      </Box>
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

            <Button variant="contained" onClick={(e)=>removeItem(item.name)}>Remove</Button>
            
          </Box>
        ))}
      </Stack>
      
      
    </Box>
      
  );
}
