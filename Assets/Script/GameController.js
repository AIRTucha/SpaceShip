#pragma strict
var ship1:GameObject;
var ship2:GameObject;

function Start () {
createShip(ship1);
createShip(ship2);
}

function createShip(ship:GameObject){
	var rand: int;
	rand=Random.Range(0,3);
	if(rand<1){
	Instantiate(ship,new Vector3(25,0,Random.Range(-7,7)),new Quaternion.Euler(0,0,0));
	} else if(rand<2){
	Instantiate(ship,new Vector3(-25,0,Random.Range(-7,7)),new Quaternion.Euler(0,180,0));
	} else if(rand<3){
  Instantiate(ship,new Vector3(Random.Range(-15,15),0,13),new Quaternion.Euler(0,-90,0));
	}  else{
	Instantiate(ship,new Vector3(Random.Range(-15,15),0,-13),new Quaternion.Euler(0,90,0));
	}
}