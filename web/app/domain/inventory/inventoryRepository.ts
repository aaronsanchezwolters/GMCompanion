import type { InventoryItem } from "./inventoryItem";

export interface InventoryRepository {
  getAll(): Promise<InventoryItem[]>;
  update(character: InventoryItem): Promise<Boolean>;
  delete(character: InventoryItem): Promise<Boolean>;
  add(character: InventoryItem): Promise<InventoryItem>;
}
