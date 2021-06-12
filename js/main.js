// const player1 = new Player("1", "X");
// const player2 = new Player("2", "O");

const game = new Game();

const buttons = Array.prototype.slice.call(document.querySelectorAll(".board button"));
for (var i = 0; i < buttons.length; i++) {
  var btn = buttons[i];

  btn.addEventListener("click", (e) => {
    if(e.target.innerHTML != "") {
      return false;
    }

    e.target.innerHTML = game.currentPlayer.icon;
    const index = buttons.indexOf(e.target);

    game.clicked(index);
  });
};