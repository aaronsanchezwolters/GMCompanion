import { useEffect, useState } from "react";
import type { Character } from "~/domain/character/character";
import { signalRManager } from "~/lib/WebSocketManager";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    signalRManager.connect("http://localhost:5000/characters/inventory");

    signalRManager.connection?.on("SendCharacters", (payload: Character[]) => {
      setCharacters(payload);
    });

    signalRManager.connection?.on("UpdateCharacter", (payload: Character) => {
      setCharacters((prevItems) =>
        prevItems.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        )
      );
    });

    signalRManager.connection?.on("DeleteCharacter", (payload: Character) => {
      setCharacters((prevItems) =>
        prevItems.filter((item) => item.id !== payload.id)
      );
    });

    signalRManager.connection?.on("AddCharacter", (payload: Character) => {
      setCharacters((prevItems) => [...prevItems, payload]);
    });

    return () => {
      signalRManager.connection?.off("SendCharacters");
      signalRManager.connection?.off("UpdateCharacter");
      signalRManager.connection?.off("DeleteCharacter");
      signalRManager.connection?.off("AddCharacter");
    };
  }, []);

  return { characters };
}
