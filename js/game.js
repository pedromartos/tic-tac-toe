class Game {
  constructor() {
    this.playerOne      = new Player("1", "X");
    this.playerTwo      = new Player("2", "O");
    this.currentPlayer  = this.playerOne;
    this.board          = new Array(9);
    this.winningMoves   = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];
  }

  clicked(pos) {
    this.board[pos] = this.currentPlayer.name;

    console.log(this.isWinningMove());

    if (this.currentPlayer == this.playerOne) {
      this.currentPlayer = this.playerTwo;
    } else {
      this.currentPlayer = this.playerOne;
    }
  }

  getCurrentPlayerMoves() {
    let indexes = [];

    for (var i = 0; i < this.board.length; i++) {
      var item = this.board[i];

      if (item == this.currentPlayer.name) {
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
}