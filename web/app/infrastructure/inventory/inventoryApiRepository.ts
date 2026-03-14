import type { InventoryItem } from "~/domain/inventory/inventoryItem";
import type { InventoryRepository } from "~/domain/inventory/inventoryRepository";

export class InventoryApiRepository implements InventoryRepository {
  async update(inventoryItem: InventoryItem): Promise<Boolean> {
    try {
      const response = await fetch(
        `http://localhost:5000/characters/${inventoryItem.characterId}/inventory/${inventoryItem.itemId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: inventoryItem.quantity,
          }),
        }
      );

      // You can check if the request was successful with response.ok
      return response.ok;
    } catch (error) {
      console.error("Failed to update inventory item:", error);
      return false;
    }
  }
  async delete(inventoryItem: InventoryItem): Promise<Boolean> {
    try {
      const response = await fetch(
        `http://localhost:5000/characters/${inventoryItem.characterId}/inventory/${inventoryItem.itemId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );

      // You can check if the request was successful with response.ok
      return response.ok;
    } catch (error) {
      console.error("Failed to update inventory item:", error);
      return false;
    }
  }
  async add(inventoryItem: InventoryItem): Promise<InventoryItem> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<InventoryItem[]> {
    // Fetch from API
    return [];
  }
}
