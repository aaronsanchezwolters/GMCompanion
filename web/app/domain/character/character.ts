export class Character {
    public id: number;
    public name: string;
    public player: string;
  
    constructor(id: number, name: string, player: string) {
      this.id = id;
      this.name = name;
      this.player = player;
    }

  }