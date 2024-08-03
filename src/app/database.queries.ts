import db from './database.config';
import { TablesInsert, Tables, TablesUpdate } from './database.types';
// Database["public"]["Tables"]["items"]["Insert"]


const addItemToDb = async (item: TablesInsert<"items">) => {
    try {
        const { data, error } = await db.from("items").select().eq('name', item.name as string);
        
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
        const { data, error } = await db.from("items").select();
        
        if (error) {
            throw new Error(`Error retrieveing items`);
        }

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

export {addItemToDb, getItems, deleteItem};