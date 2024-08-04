"use server";
import { TablesInsert, Tables, TablesUpdate } from './database.types';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { revalidatePath } from 'next/cache';
const db = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

const addItemToDb = async (itemName: string) => {
    try {
        // console.log(itemName);
        const { data, error } = await db.from("items").select().eq('name', itemName.trim() as string);
        
        if(data && data?.length > 0) {
            const newQuantity = data[0].quantity + 1;
            const {error} = await db.from("items").update({quantity: newQuantity}).eq('id', data[0].id); //using id instead of name
        } else {
            // Insert the item into the "items" table
            const newItem : TablesInsert<"items"> = {name: itemName, quantity: 1};
            // console.log("newItem", newItem);
            const { data, error } = await db.from("items").insert(newItem);
            
            if (error) {
                throw new Error(`Error adding new item: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getItems = async () => {
    try {
        const { data, error } = await db.from("items").select("*");
        if (error) {
            throw new Error(`Error retrieveing items`);
        }
        // console.log("im in getItems", data)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteItem = async (itemId: number) => {
    try {
        const { data, error } = await db.from("items").select().eq('id', itemId as number);
        // console.log("item data", data);
        if(data && data.length > 0) {
            // console.log("existing item", data);
            const newQuantity = data[0].quantity - 1;
            if(newQuantity <= 0) {
                const {error} = await db.from("items").delete().eq('id', data[0].id); //using id instead of name
            } else {
                const {error} = await db.from("items").update({quantity: newQuantity}).eq('id', data[0].id); //using id instead of name
            }
            
            return data;
        } else {
            throw new Error(`Error updating item ${itemId}`);
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }

}

const getSearchItems = async (prefix: string) => {
    try {
       
        const { data, error } = await db.from("items").select("*").ilike('name',`${prefix}%`).order('quantity', {ascending: false});
        if (error) {
            throw new Error(`Error retrieveing items`);
        }
        revalidatePath('/');
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {addItemToDb, getItems, deleteItem, getSearchItems};