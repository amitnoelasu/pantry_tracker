"use server";
// import db from './database.config';
import { TablesInsert, Tables, TablesUpdate } from './database.types';
// Database["public"]["Tables"]["items"]["Insert"]
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// console.log(process.env);
const db = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

const addItemToDb = async (item: TablesInsert<"items">) => {
    try {
        console.log(item);
        const { data, error } = await db.from("items").select().eq('name', item.name.trim() as string);
        
        if(data && data?.length > 0) {
            const newQuantity = data[0].quantity + 1;
            const {error} = await db.from("items").update({quantity: newQuantity}).eq('id', data[0].id); //using id instead of name
        } else {
            // Insert the item into the "items" table
            const { data, error } = await db.from("items").insert(item);
            
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

const deleteItem = async (item: TablesUpdate<"items">) => {
    try {
        const { data, error } = await db.from("items").select().eq('id', item.id as number);
        
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
            throw new Error(`Error updating item ${item.name}`);
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }

}

const getSearchItems = async (prefix: string) => {
    try {
        console.log("searching for prefix")
        const { data, error } = await db.from("items").select("*").ilike('name',`${prefix}%`);
        if (error) {
            throw new Error(`Error retrieveing items`);
        }
        console.log("im in searchItems", data)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {addItemToDb, getItems, deleteItem, getSearchItems};