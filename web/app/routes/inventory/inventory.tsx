import { useInventory } from "~/hooks/useInventory";
import type { Route } from "./+types/inventory";
import type { InventoryRepository } from "~/domain/inventory/inventoryRepository";
import { InventoryApiRepository } from "~/infrastructure/inventory/inventoryApiRepository";
import { useRef, useState } from "react";
import { InventoryItem } from "~/domain/inventory/inventoryItem";
import ItemList from "../components/ItemList";

export default function Inventory({ params }: Route.ComponentProps) {
  const { inventoryItems } = useInventory(Number(params.cid));

  if (!inventoryItems) {
    return (
      <div>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <main>
      <button
        className="btn btn-primary"
        onMouseDown={() => {
          document.getElementById("my_modal_3")?.showModal();
          return;
        }}
      >
        Add Items
      </button>
      <ItemList items={inventoryItems} />

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-5 mb-100">
          <ItemList items={inventoryItems} />
          </div>
        </div>
      </dialog>
    </main>
  );
}
