#pragma strict
var lVelocity : float;
function Start () {

}

function Update () {
	if(this.transform.position.x>30 || this.transform.position.x<-30 || this.transform.position.z<-15 || this.transform.position.z>15)
		Destroy(gameObject);
		
	this.transform.Translate(Vector3.left*Time.deltaTime*lVelocity);
} 