import { useRef, useState } from "react";
import { InventoryItem } from "~/domain/inventory/inventoryItem";
import type { InventoryRepository } from "~/domain/inventory/inventoryRepository";
import { InventoryApiRepository } from "~/infrastructure/inventory/inventoryApiRepository";

export default function ItemList({ items }: { items: InventoryItem[] }) {
  const inventoryRepository: InventoryRepository = new InventoryApiRepository();

  const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>(
    undefined
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHolding = (action: () => void) => {
    action(); // Execute once immediately
    intervalRef.current = setInterval(action, 200); // Repeat every 150ms
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Tags</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {items.map((inventoryItem: InventoryItem) => (
            <tr key={inventoryItem.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{inventoryItem.item.name}</div>
                    <div className="text-sm opacity-50">
                      {inventoryItem.item.type}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  {inventoryItem.item.tags.map((tag, index) => (
                    <div key={index} className="badge badge-primary">
                      {tag}
                    </div>
                  ))}
                </div>
              </td>
              <th>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-circle"
                    onMouseDown={() =>
                      startHolding(() => {
                        if (inventoryItem.quantity <= 0) {
                          setSelectedItem(inventoryItem);
                          document.getElementById("my_modal_2")?.showModal();
                          return;
                        }
                        inventoryItem.quantity--;
                        inventoryRepository.update(inventoryItem);
                      })
                    }
                    onMouseUp={stopHolding}
                    onMouseLeave={stopHolding}
                  >
                    -
                  </button>
                  <span className="inline-block w-10 text-center">
                    {inventoryItem.quantity}
                  </span>
                  <button
                    className="btn btn-circle"
                    onMouseDown={() =>
                      startHolding(() => {
                        inventoryItem.quantity++;
                        inventoryRepository.update(inventoryItem);
                      })
                    }
                    onMouseUp={stopHolding}
                    onMouseLeave={stopHolding}
                  >
                    +
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot></tfoot>
      </table>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Whant to delete item {selectedItem?.item?.name}!
          </h3>
          <form method="dialog">
            <button
              className="btn"
              onClick={() => {
                if (selectedItem) inventoryRepository.delete(selectedItem);
              }}
            >
              Delete
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
