#pragma strict

var lVelocity : float;
var aVelocity : int;
var shot : GameObject;
var gun : GameObject;
var left: KeyCode;
var right: KeyCode;
var lifeScrolle:int;
var returnPower:int;


private var enemyAngle : float;

private var aSpeed : int;


function Start () {
aSpeed=0;
}

function FixedUpdate () {
	if(Input.GetKey(left) && Input.GetKey(right))  
		fireOn();
	else angleControll();  

		moveShip();
		outOfRange();
}

function OnTriggerEnter(other : Collider) 
{
    if (other.tag == "laser2")
    {
    lifeScrolle--;
    Destroy(other.gameObject);
    if(lifeScrolle==0)
    	Destroy(gameObject);
        }
    // else if(other.tag == "enemy"){
	//	lifeScrolle=lifeScrolle==1?0:1;
    // }
}
function fireOn(){
if(lVelocity>-3){
	lVelocity-=returnPower*Time.deltaTime;
	Instantiate(shot, gun.transform.position, this.transform.rotation);
	}
}

function moveShip(){
	lVelocity+=lVelocity>20?1*Time.deltaTime:5*Time.deltaTime;
	// if(Input.GetKey(KeyCode.UpArrow))
		this.transform.Translate(Vector3.left*Time.deltaTime*lVelocity);
	this.transform.Rotate(Vector3.up*Time.deltaTime*aSpeed);
}

function angleControll(){
if(Input.GetKey(left))
	aSpeed=-aVelocity;
else if(Input.GetKey(right))
	aSpeed=aVelocity;
else aSpeed=0;
}

function outOfRange(){
	if(this.transform.position.x>50 || 
	this.transform.position.x<-50 || 
	this.transform.position.z<-30 || 
	this.transform.position.z>30)
		Destroy(gameObject);
}
