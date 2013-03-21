function AirRobot(position) {

	GroundRobot.call(this, position);
}

inheritPrototype(AirRobot, GroundRobot);

AirRobot.prototype.isValidCommand = function(command){

   var validCommand = /^[RLFDU]+$/;
   return validCommand.test(command);            
};

AirRobot.prototype.moveHigher = function() {

	this._z += 10;
};

AirRobot.prototype.moveLower = function() {

	this._z -= 10;
};

AirRobot.prototype.parseCommand = function(command) {

	if(!this._cache.commands) {

       this._cache.commands = {

          R: this.rotateRight,
          L: this.rotateLeft,
          F: this.moveForward,
          U: this.moveHigher,
          D: this.moveLower
      };
    }

    GroundRobot.prototype.parseCommand.call(this, command);
};




