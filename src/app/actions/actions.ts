"use server";
import { revalidatePath } from 'next/cache';
import { InventoryItem } from '../types';
import { addItemToDb, deleteItem, getSearchItems } from '../database.queries';
import { redirect } from 'next/navigation';


export async function handleDeleteAction(formData: FormData) {
    const idString = formData.get('itemId');
  
    const id = idString ? Number(idString) : NaN;
  
    if (!isNaN(id)) {
      await deleteItem(id);
    } else {
      console.error('Item ID is missing or invalid');
    }
    revalidatePath('/');
}

export async function handleAddItemAction(formData: FormData) {
    console.log("im hereaadadad")
    const itemNameString = formData.get('itemName') as string;

    if(itemNameString && itemNameString.length > 0) {
        await addItemToDb(itemNameString);
    }
    revalidatePath('/');
}


export async function getItemsWithPrefix(prefix: string) {
    const data = getSearchItems(prefix);
    revalidatePath('/');
    return data;
}