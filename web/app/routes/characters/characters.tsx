import { useCharacters } from "~/hooks/useCharacters";
import type { Route } from "./+types/characters";
import { Link } from "react-router";

export default function Characters() {
  const { characters } = useCharacters();

  if (!characters || characters.length == 0) {
    return (
      <div>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <main>
      <div className="flex items-center min-h-screen flex-col gap-2.5">
        {characters.map((character) => (
          <div key={character.id} className="flex flex-col bg-[#1e1e1e] min-w-[275px] p-4 rounded-lg shadow-md">
            <p className="text-md">{character.name}</p>
            <p className="text-small text-default-500">{character.player}</p>
            <Link to="/inventory/2">Home</Link>

          </div>

        ))}
      </div>
    </main>
  );
}
