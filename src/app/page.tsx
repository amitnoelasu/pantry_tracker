"use server";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Search from "./ui/search";
import Table from "./ui/table";
import { Suspense } from 'react';
import AddNewItem from './ui/addNewItem';




export default async function Page({
  searchParams,
}: {
  searchParams?: {
    item?: string;
  };
}) {
  
  const prefix = searchParams?.item || '';


  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column"  justifyContent="center"  alignItems="center">

      <Box width="800px"  height="100px"  display="flex"  justifyContent="center" alignItems="center"  bgcolor="#fff0f1"  mb={2} >
        <Typography variant="h3">Inventory Management System</Typography>
      </Box>
      <Box width="800px" height="100px" display="flex" justifyContent="space-between"  alignItems="center" paddingLeft={8} paddingRight={8}>
        <Search placeholder="Search for an item" />
        <AddNewItem />
      </Box>
      
    
      <Table prefix={prefix}/>
      
      
    </Box>
      
  );
}
