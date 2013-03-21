function object(o) {
   function F(){}
   F.prototype = o;
   return new F();
}

function inheritPrototype(subType, superType) {
   var prototype = object(superType.prototype); //create object
    prototype.constructor = subType; //augment object
    subType.prototype = prototype; //assign object
}

    