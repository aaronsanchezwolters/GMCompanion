import type { Character } from "~/domain/character/character";
import type { CharacterRepository } from "~/domain/character/characterRepository";

export class CharacterApiRepository implements CharacterRepository {
  async update(character: Character): Promise<Boolean> {
      throw new Error("Method not implemented.");
  }
  async delete(character: Character): Promise<Boolean> {
      throw new Error("Method not implemented.");
  }
  async add(character: Character): Promise<Character> {
      throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Character[]> {
    // Fetch from API
    return [];
  }
}