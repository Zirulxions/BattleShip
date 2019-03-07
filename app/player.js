var Ship = require('./ship.js');
var Settings = require('./settings.js');

function Player(id){
  console.log("testing player");
  var i;
  this.id = id;
  this.shots = Array(Settings.gridRows * Settings.gridCols);
  this.shipGrid = Array(Settings.gridRows * Settings.shipCols);
  this.ships = [];
  for (var i = 0; i < Settings.gridRows * Settings.shipCols; i++) {
    this.shots[i]
  }

  this.createShips();

};


//Create ships and place them in grid in a prearranged layout
function createShips() {
  var shipIndex, i, gridIndex, ship,
      x = [1, 3, 5, 8, 8], y = [1, 2, 5, 2, 8],
      horizontal = [false, true, false, false, true];

  for(shipIndex = 0; shipIndex < Settings.ships.length; shipIndex++) {
    ship = new Ship(Settings.ships[shipIndex]);
    ship.horizontal = horizontal[shipIndex];
    ship.x = x[shipIndex];
    ship.y = y[shipIndex];

    // place ship array-index in shipGrid
    gridIndex = ship.y * Settings.gridCols + ship.x;
    for(i = 0; i < ship.size; i++) {
      this.shipGrid[gridIndex] = shipIndex;
      gridIndex += ship.horizontal ? 1 : Settings.gridCols;
    }

    this.ships.push(ship);
  }
};

module.exports = Player;
