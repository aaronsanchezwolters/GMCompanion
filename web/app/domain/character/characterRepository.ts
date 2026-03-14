import type { Character } from "./character";

export interface CharacterRepository {
  getAll(): Promise<Character[]>;
  update(character: Character): Promise<Boolean>;
  delete(character: Character): Promise<Boolean>;
  add(character: Character): Promise<Character>;
}
