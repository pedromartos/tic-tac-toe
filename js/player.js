class Player {
  constructor(type) {
    this.name;
    this.type = type;
    this.wins = JSON.parse(localStorage.getItem(`${this.type}-wins`)) || [];

    this.setName();
  }

  getType() {
    return this.type;
  }

  setName() {
    switch (this.type) {
      case "empire":
        this.name = "Galactic Empire";
        break;
      case "rebel":
        this.name = "Rebel Alliance";
        break;
    }
  }

  getName() {
    return this.name;
  }

  getIcon() {
    return `img/${ this.type }.svg`;
  }

  getWins() {
    return this.wins;
  }

  addWin(board) {
    this.wins.push(board);
    localStorage.setItem(`${this.type}-wins`, JSON.stringify(this.wins));
  }
}