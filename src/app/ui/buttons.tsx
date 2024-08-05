import { Button, Modal } from "@mui/material";
import { handleAddItemAction, handleDeleteAction } from "../actions/actions";
import { deleteItem } from "../database.queries";
import { InventoryItem } from "../types";


export function RemoveItem({item}:{item: InventoryItem}) {

    return(
        <form action={handleDeleteAction}>
            <input type="hidden" name="itemId" value={item.id} />
            <Button variant="outlined" type="submit">Delete</Button>
        </form>
    );
}
