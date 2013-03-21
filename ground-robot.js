function GroundRobot(position) {

   this._defaultPosition = {x: 0, y: 0, z: 0, direction: 'N'};
   
   position = position || this._defaultPosition;

   this._x = position.x || this._defaultPosition.x;

   this._y = position.y || this._defaultPosition.y;

   this._z = position.z || this._defaultPosition.z;

   this._direction = position.direction || this._defaultPosition.direction;

   this._cache = {};

}

GroundRobot.prototype = {

	constructor: GroundRobot,

	isValidCommand: function(command){

        var validCommand = /^[RLF]+$/;

        return validCommand.test(command);
            
    },

	rotateRight: function() {

		if(!this._cache.directionMapRight) {

			this._cache.directionMapRight = {

			    N: 'E',
                E: 'S',
                S: 'W',
                W: 'N'
			};
		}

		this._direction = this._cache.directionMapRight[this._direction];
	},

	rotateLeft: function() {
        
        if(!this._cache.directionMapLeft) {

			this._cache.directionMapLeft = {
			    
                N: 'W',
                W: 'S',
                S: 'E',
                E: 'N'
			};
		}

		this._direction = this._cache.directionMapLeft[this._direction];

	},

	moveForward: function() {
        
        if(!this._cache.coordinatePosition) {

			this._cache.coordinatePosition = {
			    
                N: function() { ++this._y },
                E: function() { ++this._x },
                S: function() { --this._y },
                W: function() { --this._x }
			};
		}

		 this._cache.coordinatePosition[this._direction].call(this);

	},	

	parseCommand: function(command) {

		if(!this.isValidCommand(command)) {
           throw "Invalid Command";
		}

		var commandLen = command.length,
            index;

        if(!this._cache.commands) {

        	this._cache.commands = {

        		R: this.rotateRight,
                L: this.rotateLeft,
                F: this.moveForward
        	};
        }

        for(index = 0; index < commandLen; index++)  {

           this._cache.commands[command[index]].call(this);
        }  
	},

	getDirection: function() {

		return this._direction;
	},

	getPosition: function() {

		return "(" + this._x + "," + this._y + "," + this._z + ")";
	}

}