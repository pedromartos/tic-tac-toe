class Game {
  constructor() {
    this.rebel          = new Player("rebel");
    this.empire         = new Player("empire");
    this.currentPlayer  = null;
    this.winner         = null;
    this.board          = new Array(9);
    this.winningMoves   = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

    this.setFirstPlayer();
  }

  getRebel() {
    return this.rebel;
  }

  getEmpire() {
    return this.empire;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getWinner() {
    return this.winner;
  }

  setFirstPlayer() {
    const firstPlayer = JSON.parse(localStorage.getItem("first-player"));
    if (firstPlayer && firstPlayer.type == "rebel") {
      this.currentPlayer = this.empire;
    } else {
      this.currentPlayer = this.rebel;
    }

    localStorage.setItem("first-player", JSON.stringify(this.currentPlayer));
  }

  clicked(pos) {
    this.board[pos] = this.currentPlayer.getType();

    if (this.isWinningMove()) {
      this.winner = this.currentPlayer;
      return true;
    } else {
      if (!this.board.includes(undefined)) {
        this.winner = false;
      } else {
        this.switchPlayer();
        return false;
      }
    }
  }

  switchPlayer() {
    if (this.currentPlayer.getType() == this.rebel.getType()) {
      this.currentPlayer = this.empire;
    } else {
      this.currentPlayer = this.rebel;
    }
  }

  getCurrentPlayerMoves() {
    let indexes = [];

    for (var i = 0; i < this.board.length; i++) {
      var item = this.board[i];

      if (item == this.currentPlayer.getType()) {
        indexes.push(i);
      }
    }

    return indexes;
  }

  isWinningMove() {
    if (this.getCurrentPlayerMoves().length < 3) {
      return false;
    }

    for (var i = 0; i < this.winningMoves.length; i++) {
      var correctMoves = 0;
      var move = this.winningMoves[i];

      for (var j = 0; j < move.length; j++) {
        if (this.getCurrentPlayerMoves().includes(move[j])) {
          correctMoves++;

          if (correctMoves == 3) {
            return true;
          }
        }
      }
    }

    return false;
  }

  newGame() {
    if (this.winner) {
      this.currentPlayer.addWin(this.board);
    }
    this.board = new Array(9);
    this.winner = null;
    this.setFirstPlayer();
  }
}