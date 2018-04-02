//finds a unique ID
function uniqueID(start) {
    var ALPHABET = '023456789abcdefghijkmnopqrstuvwxyz';//no l, 1, or uppercases to avoid confusion
    var ID_LENGTH = 12;
    var id = start;
    for (var i = id.length; i < ID_LENGTH; i++) {
      id += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return id;
}