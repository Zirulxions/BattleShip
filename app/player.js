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
    this.shots[i] = 0;
    this.shipGrid = -1;
  }
  if (!this.createRandomShips()) {
    this.ships = [];
    this.createShips();
  }
};

Player.prototype.createRandomShips = function() {
  var shipIndex;
  for(shipIndex = 0; shipIndex < Settings.ships.length; shipIndex++){
    this.ships.push(ship);
    if (!this.placeShipsRandom(ship, shipIndex)) {
      return false;
    }
  }
  return true;
};

Player.prototype.placeShipsRandom = function (ship, shipIndex) {
  var tryMax = 25;
  for(var i = 0; i < tryMax){
    ship.horizontal = Math.random() < 0.5;
    console.log("Generated times: " + i);
  }
};

Player.prototype.createShips = function() {
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
