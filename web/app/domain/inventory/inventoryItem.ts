export class InventoryItem {
  public id: number;
  public characterId: number;
  public itemId: number;
  public quantity: number;
  public item: Item;

  constructor(
    id: number,
    characterId: number,
    itemId: number,
    quantity: number,
    item: Item
  ) {
    this.id = id;
    this.characterId = characterId;
    this.itemId = itemId;
    this.quantity = quantity;
    this.item = item;
  }
}

export class Item {
  id: number;
  name: string;
  type: string;
  description: string;
  rarity: string;
  image?: URL;
  tags: string[];
  weight: number;
  cost: number;
  filterType: string;

  constructor(
    id: number,
    name: string,
    type: string,
    description: string,
    rarity: string,
    tags: string[],
    weight: number,
    cost: number,
    filterType: string,
    image?: URL
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.rarity = rarity;
    this.tags = tags;
    this.weight = weight;
    this.cost = cost;
    this.filterType = filterType;
    this.image = image;
  }
}
