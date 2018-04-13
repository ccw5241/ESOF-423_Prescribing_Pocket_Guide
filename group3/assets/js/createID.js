//finds a unique ID
function uniqueid() {
    var ALPHABET = '023456789abcdefghijkmnopqrstuvwxyz';//no l, 1, or uppercases here
    var ID_LENGTH = 12;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}


//create unit test to make sure the uppercase didnot work
var unitTests = {};

unitTests.uniqueid = function(method){
	var str = "anything"
	var result = str.toUpperCase();
	if(method(str) === result){
		return false;
	}else{
		return true;
	}
};

console.log(unitTests.uniquied(uniquied));
