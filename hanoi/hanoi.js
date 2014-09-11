(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var TowersUI = Hanoi.TowersUI = function (game, $hanoi) {
    this.game = game;
    this.$hanoi = $hanoi;
    this.pileNumberStart = -1;
    this.prev_target = null;
  };
  
  TowersUI.prototype.bindEvents = function () {
    var that = this;
    this.$hanoi.find('.tower').on("click", function(event) {
      var currentTarget = event.currentTarget;
      var $currentTarget = $(currentTarget);
      if (that.pileNumberStart !== -1) {
        that.makeMove(that.pileNumberStart, $currentTarget.index());
        that.pileNumberStart = -1;
        this.prev_target.css("border", "1px solid black");
      } else {
        that.pileNumberStart = $currentTarget.index();
        $currentTarget.css("border", "1px solid blue");
        this.prev_target = $currentTarget;
      }
    });

  }
  
  TowersUI.prototype.makeMove = function(startTowerIdx, endTowerIdx) {
    var $validMove = this.game.move(startTowerIdx, endTowerIdx);
    
    if ($validMove) {
      var $towers =  this.$hanoi.find('.tower');
      var $startTower = $($towers[startTowerIdx]);
      var $endTower = $($towers[endTowerIdx]);
    
      var $startDisc = $startTower.find('.disc:first').detach();
      // $endTower.prepend($startDisc);
    
      if ($endTower.find('.disc').length > 0) {
        $startDisc.insertBefore($endTower.find('.disc:first')); 
      } else {
        $endTower.append($startDisc);
      }
    
      $endTower.find('.blank:first').remove();
      $startTower.prepend('<div class="blank"></div>');
    } else {
      alert('Not a valid move!')
    }
  }
  
  TowersUI.prototype.play = function () {
    this.setupBase();
    this.bindEvents();
  }
  
  TowersUI.prototype.setupBase = function () {
    // 3 towers, 9 fake discs
    for (var i = 0; i < 3; i++) {
      var $tower = $("<div class='tower'></div>");
      $tower.data("index", i);
      for (var j = 1; j <=3 ; j++) {
        var $disc = $("<div class='disc'></div>");
        if (i===0) {
          $disc.data("size", j);
          $disc.css("display", "block")
          $disc.css("width", Math.floor(j * 70) + "px")
          $tower.append($disc);
        }
        else {
          $tower.append("<div class='blank'></div>");
        }
      }
      this.$hanoi.append($tower);
    }
  
  }
  
})();