include(".cre.js");

reader.processCommand("C","(7A)ffffffff");	// Set bt addr index -1
reader.processCommand('C',"(9D)0");		// Target Tolerance: 0
reader.processCommand('C',"(32)0");		// Bluetooth readers: Active Mode Countdown Timer: 30

var text = new gui.Text("Codeshelf v1.0");
var rawText = "";
gui.statusText = null;
gui.show(text);

reader.onCommandFinishOld = reader.onCommandFinish;
reader.onCommandFinish = function(commandSuccess, responseType, responseData) {
	reader.onCommandFinishOld(commandSuccess, responseType, responseData);
}

reader.onCommandOld = reader.onCommand;
reader.onCommand = function(commandType, commandData) {

	reader.onCommandOld(commandType, commandData);
	if (commandType == '|') {
		
		if (commandData == "clear") {
			rawText = "";
			text = new gui.Text(rawText);
		} else {
			rawText = rawText.concat(commandData + '\n');
			text = new gui.Text(rawText);
		}
		
		gui.statusText = null;
		gui.show(text);

		return false;
	} else {
		lastCmdType = '';
		return true;
	}

}

ready.showOld = ready.show;
ready.show = function(text, busy) {
	// Do nothing
}

reader.onDecodeOld = reader.onDecode;
reader.onDecode = function(decode) {
	return reader.onDecodeOld(decode);
}
