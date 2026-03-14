import { useEffect, useState } from "react";
import type { InventoryItem } from "~/domain/inventory/inventoryItem";
import { signalRManager } from "~/lib/WebSocketManager";

export function useInventory(characterId: number) {
  const [inventoryItems, setInventoryItem] = useState<InventoryItem[]>([]);

  useEffect(() => {
    async function effect() {
      await signalRManager.connect(
        "http://localhost:5000/characters/inventory"
      );

      signalRManager.connection?.on("SendInventory", (payload: any) => {
        setInventoryItem(payload);
      });

      signalRManager.connection?.on(
        "SendInventoryItemUpdate",
        (payload: InventoryItem) => {
          setInventoryItem((prevItems) =>
            prevItems.map((item) =>
              item.id === payload.id ? { ...item, ...payload } : item
            )
          );
        }
      );

      signalRManager.connection?.on(
        "SendInventoryItemDelete",
        (payload: InventoryItem) => {
          setInventoryItem((prevItems) =>
            prevItems.filter((item) => item.id !== payload.id)
          );
        }
      );

      signalRManager.connection?.on(
        "SendInventoryItemAdd",
        (payload: InventoryItem) => {
          setInventoryItem((prevItems) => [...prevItems, payload]);
        }
      );

      signalRManager.connection?.on("SendTask", (payload: any) => {
        console.log(payload);
      });

      if (
        !signalRManager.connection ||
        signalRManager.connection.state !== "Connected"
      ) {
        console.error("Connection not established");
        return;
      }

      signalRManager.send("ConnectToInventory", characterId);
    }

    effect(); // Call the async function

    return () => {
      signalRManager.connection?.off("SendInventoryItemUpdate");
      signalRManager.connection?.off("SendInventoryItemDelete");
      signalRManager.connection?.off("SendInventoryItemAdd");
      signalRManager.send("DisconectToInventory", characterId);
    };
  }, []);

  return { inventoryItems };
}
