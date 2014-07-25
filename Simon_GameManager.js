#pragma strict

var red_high : Renderer;
var yellow_high : Renderer;
var green_high : Renderer;
var blue_high : Renderer;

var red_sound : AudioSource;
var yellow_sound : AudioSource;
var green_sound : AudioSource;
var blue_sound : AudioSource;

var round : int = 0;

var thePattern = new ArrayList();
var playerPattern = new ArrayList();

var sequence : int = 0;

var playersTurn : int = 0;

function Start () {
	
	red_high.sortingOrder = 0;
	yellow_high.sortingOrder = 0;
	blue_high.sortingOrder = 0;
	green_high.sortingOrder = 0;
	
}

function Update () {

}

function OnGUI() {
	if(GUI.Button(new Rect(15,15,100,50), "New Game")) {
		newGame();
	}
	GUI.Label(new Rect(15,75,100,50), "Round: " + round);
}

function newGame() {
	
	playersTurn = 0;
	round = 0;
	sequence = 0;
	startRound();
	
}

function startRound() {

	playerPattern = new ArrayList();
	generatePattern(round);
	round++;
	
}

function generatePattern(round : int) {

	//Round 1 -- Generates 3 sequence
	//Round 2 -- Generates 4 sequence
	//Round 3 -- Generates 5 sequence etc...
	
	thePattern = new ArrayList();
	
	sequence = round + 3;
	
	for(var x : int = 0; x < sequence; x++) {
		var rndNumber : int = Random.Range(1,5);
		thePattern.Add(rndNumber);
	}
	lightUp();

}


function lightUp() {

	var delay : float = 0.25;

	for(var y : int = 0; y < thePattern.Count; y++) {
		
		switch(thePattern[y]) {
			case 1:
				red_sound.Play();
				red_high.sortingOrder = 10;
				yield WaitForSeconds(delay);
				red_high.sortingOrder = 0;
				break;
			case 2:
				green_sound.Play();
				green_high.sortingOrder = 10;
				yield WaitForSeconds(delay);
				green_high.sortingOrder = 0;
				break;
			case 3:
				blue_sound.Play();
				blue_high.sortingOrder = 10;
				yield WaitForSeconds(delay);
				blue_high.sortingOrder = 0;
				break;
			case 4:
				yellow_sound.Play();
				yellow_high.sortingOrder = 10;
				yield WaitForSeconds(delay);
				yellow_high.sortingOrder = 0;
				break;
		}
		yield WaitForSeconds(delay);
	}
	playersTurn = 1;
}

public function createPlayerPattern(color : String) {
	
	switch(color) {
		case "red_low":
			playerPattern.Add(1);
			break;
		case "green_low":
			playerPattern.Add(2);
			break;
		case "blue_low":
			playerPattern.Add(3);
			break;
		case "yellow_low":
			playerPattern.Add(4);
			break;
	}
	
	if(playerPattern.Count == sequence) {
		playersTurn = 0;
		for(var x : int = 0; x < sequence; x++) {
			if(playerPattern[x] == thePattern[x]) {
				//Good
				if(x == sequence - 1) {
					yield WaitForSeconds(2);
					startRound();
					break;
				}
			}
			else {
				gameOver();
				break;
			}
		}
	}
	
}

public function getPlayersTurn() {
	return playersTurn;
}

function gameOver() {
	Debug.Log("-- Game Over -- You Got to Round " + round);
}





















