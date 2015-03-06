#pragma strict
var lVelocity : float;
var aVelocity : float;
var shot : GameObject;
var gun : GameObject;
var attackAngle : int;
var attackRange : int;
var angleBack : int;
var returnPower: int;
var dangerousRange : int;
var lifeScrolle:int;

private var enemy : GameObject;
private var angleBackBuffer :int;
private var aSpeed : int;
private var enemyAngle : float;

 
function Start () {
aSpeed=0;  
enemy = GameObject.Find("Player1(Clone)");
angleBackBuffer=angleBack;
}
function FixedUpdate(){
		speedControll();
		angleToEnemy();
		attackEnemy();
		enemyIsTooClose();
			if(rangeControll());
		else if(followAim());
		

	
		moveForward();
}
 function OnTriggerEnter(other : Collider) 
{
    if (other.tag == "laser1")
    {
    lifeScrolle--;
    Destroy(other.gameObject);
    if(lifeScrolle==0)
    	Destroy(gameObject);
        }
    // else if(other.tag == "enemy"){
	//lifeScrolle=lifeScrolle==1?0:1;
    //}
}
function underAttackArea(){

}
function speedControll(){
angleBack=lVelocity>40?70:angleBackBuffer;
if(lVelocity>45)
	fireOn();
}
function attackEnemy(){
var rotation : float;
rotation=this.transform.rotation.eulerAngles.y;
if(enemyAngle+attackAngle>rotation && enemyAngle-attackAngle<rotation)
 fireOn();
}

function enemyIsTooClose(){
try{
if(Mathf.Sqrt(Mathf.Pow((enemy.transform.position.z-this.transform.position.z),2)+Mathf.Pow((enemy.transform.position.x-this.transform.position.x),2))<dangerousRange)
	enemyAngle+=enemyAngle<45?90:-90;
	}catch(UnityException){}
}

function followAim():boolean{
	if((enemyAngle>this.transform.eulerAngles.y || (enemyAngle<180 && this.transform.eulerAngles.y>270)) && !(this.transform.eulerAngles.y<180 && enemyAngle>270))
			aSpeed=aVelocity*.9;
	else if(enemyAngle<this.transform.eulerAngles.y || (this.transform.eulerAngles.y<180 && enemyAngle>270))
			aSpeed=-aVelocity*.9;
	else return false;
	return true;
}

function rangeControll():boolean{
if(this.transform.position.x<-15){
	if(this.transform.eulerAngles.y<90+angleBack && this.transform.eulerAngles.y>0)
		aSpeed=aVelocity;
	else if(this.transform.eulerAngles.y==0)
		aSpeed=this.transform.position.z>0?aVelocity:-aVelocity;
	else if(this.transform.eulerAngles.y>270-angleBack)
		aSpeed=-aVelocity;
	else aSpeed = 0;
	return true;
}else if(this.transform.position.x>15){
		if(this.transform.eulerAngles.y<270+angleBack && this.transform.eulerAngles.y>180)
			aSpeed=aVelocity;
		else if(this.transform.eulerAngles.y==180)
			aSpeed=this.transform.position.z>0?-aVelocity:   aVelocity;
		else if(this.transform.eulerAngles.y>90-angleBack)
			aSpeed=-aVelocity;
		else aSpeed = 0;
		return true;
}else if(this.transform.position.z<-5){
		if(this.transform.eulerAngles.y<270 && this.transform.eulerAngles.y>180-angleBack)
			aSpeed=-aVelocity;
		else if(this.transform.eulerAngles.y==270)
			aSpeed=this.transform.position.x>0?-aVelocity:aVelocity;
		else if(this.transform.eulerAngles.y>270 || this.transform.eulerAngles.y<angleBack)
			aSpeed=aVelocity;
		else aSpeed = 0;
		return true;
}else if(this.transform.position.z>5){
		if(this.transform.eulerAngles.y<180+angleBack && this.transform.eulerAngles.y>90)
			aSpeed=aVelocity;
		else if(this.transform.eulerAngles.y==90)
			aSpeed=this.transform.position.x>0?aVelocity:-aVelocity;
		else if(this.transform.eulerAngles.y>360-angleBack || this.transform.eulerAngles.y<90)
			aSpeed=-aVelocity;
		else aSpeed = 0;
		return true;
}
else return false;
}


function fireOn(){ 
try{
	if(Random.Range(0,attackRange)>Mathf.Sqrt(Mathf.Pow((enemy.transform.position.z-this.transform.position.z),2)+Mathf.Pow((enemy.transform.position.x-this.transform.position.x),2)))
		if(lVelocity>-3){
			lVelocity-=returnPower*Time.deltaTime;
			Instantiate(shot, gun.transform.position, this.transform.rotation);
	}
	}catch(UnityException){
	lVelocity-=returnPower*Time.deltaTime;
	Instantiate(shot, gun.transform.position, this.transform.rotation);
	}
}
function moveForward(){
	lVelocity+=lVelocity>20?1*Time.deltaTime:5*Time.deltaTime;
	this.transform.Rotate(Vector3.up*Time.deltaTime*aSpeed);
	this.transform.Translate(Vector3.left*Time.deltaTime*lVelocity);
}
function angleToEnemy(){
		try{
		enemyAngle = -Mathf.Atan ((enemy.transform.position.z-this.transform.position.z)/
						(enemy.transform.position.x-this.transform.position.x))*Mathf.Rad2Deg;

		if (enemy.transform.position.x > this.transform.position.x)
			enemyAngle += 180;
		else if(enemy.transform.position.z < this.transform.position.z)
			enemyAngle +=360;
			}catch(UnityException){
			Debug.Log("Bot Win");
			}
}
