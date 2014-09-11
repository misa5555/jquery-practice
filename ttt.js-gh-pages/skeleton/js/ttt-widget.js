(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Widget = TTT.Widget = function (game, $el) {
    this.game = game;
    this.$el = $el;
    
  };

  Widget.prototype.bindEvents = function () {
    var that = this;
    this.$el.find('.square').on("click", function(event) {
      var currentTarget = event.currentTarget;
      var $currentTarget = $(currentTarget);

      that.makeMove($currentTarget); 
    });
  };

  Widget.prototype.makeMove = function ($square) {
      if (this.game.currentPlayer === 'x') {
        $square.addClass('green');
      } else if (this.game.currentPlayer === 'o') {
        $square.addClass('red');
      } else { console.log('no player detected!')}

      this.game.playMove($square.data('pos'));
      // this.game.board.print();
      if (this.game.isOver()){
        console.log("over")
      }
  };

  Widget.prototype.play = function () {
    this.setupBoard();
    this.bindEvents();
  };

  
  Widget.prototype.setupBoard = function () { 
      for (var i = 0; i < 3; i++) {
        var $row = $("<div class='row'></div>");
        for (var j = 0; j < 3; j++) {
          var index =  [i, j];
          var $square = $("<div class='square'></div>");
          $square.data('pos', index);
          $row.append($square);
        }
        this.$el.append($row);
      }
  };
})();
