#pragma strict

var red_sound : AudioSource;
var yellow_sound : AudioSource;
var green_sound : AudioSource;
var blue_sound : AudioSource;

function OnMouseDown() {
	
	var managerScript : Simon_GameManager;
	managerScript = GameObject.Find("Simon_GameManager").GetComponent(Simon_GameManager);
	
	if(managerScript.getPlayersTurn() == 1) {
		
		switch(gameObject.name) {
			case "red_low":
				red_sound.Play();
				break;
			case "yellow_low":
				yellow_sound.Play();
				break;
			case "green_low":
				green_sound.Play();
				break;
			case "blue_low":
				blue_sound.Play();
				break;
		}
		
		managerScript.createPlayerPattern(gameObject.name);
		//Simon_GameManager.createPlayerPattern(gameObject.name);
		gameObject.renderer.sortingOrder = 0;
		yield WaitForSeconds(0.25);
		gameObject.renderer.sortingOrder = 5;
	}
	
}