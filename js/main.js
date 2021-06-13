// const player1 = new Player("1", "X");
// const player2 = new Player("2", "O");
const game = new Game();

const updateTitle = function() {
  const h1 = document.getElementsByTagName("h1")[0];

  if (game.getWinner() === false) {
    h1.innerHTML = "it's a draw!";
  } else if (game.getWinner() == null) {
    h1.innerHTML = `${game.getCurrentPlayer().getName()}'s turn`;
  } else {
    h1.innerHTML = `${game.getCurrentPlayer().getName()} won!`;
  }
}

const updateWins = function() {
  const players = [game.getRebel(), game.getEmpire()];

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const el = document.getElementById(player.getType());
    el.querySelector("h3").innerHTML = `${player.getWins().length} wins`;

    displayWins(player, el);
  }
}
const displayWins = function(player, el) {
  el.querySelector(".wins").innerHTML = "";
  const wins = player.getWins();

  if (wins.length % 3 != 0) {
    fill = 3 - (wins.length % 3);
    for (let i = 0; i < fill; i++) {
      wins.push(null);
    }
  }

  for (let j = 0; j < wins.length; j++) {
    const win = wins[j];

    if (win == null) {
      const empty = document.createElement("LI")
      empty.classList.add("empty");
      el.querySelector(".wins").appendChild(empty);
    } else {
      const board = buildBoard(win);
      el.querySelector(".wins").appendChild(board);
    }
  }
}

const buildBoard = function(win) {
  const board = document.createElement("LI");

  for (let k = 0; k < win.length; k++) {
    const square = win[k];
    let piece;

    if (square == null) {
      piece = document.createElement("SPAN");
    } else {
      piece = document.createElement("IMG");

      if (square == "empire") {
        piece.src = game.getEmpire().getIcon();
      } else {
        piece.src = game.getRebel().getIcon();
      }
    }

    board.appendChild(piece);
  }

  return board;
}

updateTitle();
updateWins();

const buttons = Array.prototype.slice.call(document.querySelectorAll(".board button"));

const clearBoard = function() {
  buttons.forEach(btn => btn.removeAttribute("class"))
  updateTitle();
  updateWins();
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    if (game.getWinner() != null) {
      game.newGame();
      clearBoard();
      return false;
    }

    if(e.target.classList.length != 0) {
      return false;
    }

    e.target.classList.add(game.currentPlayer.getType());
    const index = buttons.indexOf(e.target);

    game.clicked(index);
    updateTitle();
  });
};