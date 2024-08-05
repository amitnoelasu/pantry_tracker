"use server";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Search from "./ui/search";
import InventoryTable from "./ui/table";
import { Suspense } from 'react';
import AddNewItem from './ui/addNewItem';



import Image from 'next/image';
const imagePath = './background_food_image.jpg';
const pantryImagePath = './pantry_image.jpg';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    item?: string;
  };
}) {
  
  const prefix = searchParams?.item || '';


  return (
    <>
    
    
    <Box width="100vw" height="100vh" display="flex" flexDirection="column"  justifyContent="center"  alignItems="center" 
    sx={{
      backgroundImage:`url(${imagePath})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      }}>
    {/* <Image
        src="/background_food_image.jpg"
        fill
        alt="Picture of the author"
      /> */}
      <Box sx={{borderRadius:"50px"}}>
        <Box width="800px"  height="220px"  display="flex"  justifyContent="center" alignItems="center"  color="white" sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)', 
        }}>
          <Typography variant="h3" color="#4E342E" border={2} padding={2} >Pantry Tracker</Typography>
        </Box>
        <Box width="800px" height="100px" display="flex" justifyContent="space-between"  alignItems="center" bgcolor="#ffffff" padding={5}>
          <Search placeholder="Search for an item" />
          <AddNewItem />
        </Box>
        
      
        <InventoryTable prefix={prefix}/>
      </Box>
      
      
      
    </Box>
    </>
      
  );
}
