var t:number;
class blob {
	size:number = 50;
	density:number = 0.00012733987;
	pos:number[] = [250,250]; // x,y
	velocity:number[] = [0,0]; // speed in px/s, angle in radians
	context:any;
	
    constructor(properties,context:any) {
		if(properties.size != undefined) this.size = properties.size;
		if(properties.density != undefined) this.density = properties.density;
		if(properties.initpos != undefined) this.pos = properties.initpos;
		if(properties.velocity != undefined) this.velocity = properties.velocity;
		this.context = context;
	}
	
	mass():number {
		return Math.PI * this.size * this.size * this.density;
	}
	
    draw() {
		this.context.beginPath();
		this.context.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI, false);
		this.context.fillStyle = 'black';
		this.context.fill();
    }
	
	step(realtime:number,index:number,theothers:blob[]) {
		if(this.pos[0]+this.size >= 500 || this.pos[0]-this.size < 0) this.velocity[1] = (2*Math.PI-this.velocity[1]);
		if(this.pos[1]+this.size >= 500 || this.pos[1]-this.size < 0) this.velocity[1] = (Math.PI-this.velocity[1]);
		
		var i:number;
		for(i = index+1;i < theothers.length;i++) {
			var a:number,b:number,c:number;
			a = this.pos[0] - theothers[i].pos[0];
			b = this.pos[1] - theothers[i].pos[1];
			c = Math.sqrt(a*a+b*b);
			if(c < this.size+theothers[i].size) {
				// clearTimeout(t);
				var delta = Math.atan((theothers[i].pos[1]-this.pos[1])/(theothers[i].pos[0]-this.pos[0]));
				
				this.velocity[1] -= delta;
				theothers[i].velocity[1] -= delta;
				
				var x1 = Math.cos(this.velocity[1]-Math.PI/2) * this.velocity[0];
				var y1 = Math.sin(this.velocity[1]-Math.PI/2) * this.velocity[0];
				var m1 = this.mass();
				
				var x2 = Math.cos(theothers[i].velocity[1]-Math.PI/2) * theothers[i].velocity[0];
				var y2 = Math.sin(theothers[i].velocity[1]-Math.PI/2) * theothers[i].velocity[0];
				var m2 = theothers[i].mass();
				
				var v1 = (x1*(m1-m2)+2*m2*x2)/(m1+m2);
				var v2 = (x2*(m2-m1)+2*m1*x1)/(m1+m2);
				
				console.log([v1,y1,v2,y2]);
				
				this.velocity[0] = Math.sqrt(v1*v1+y1*y1);
				this.velocity[1] = Math.atan(y1/v1)+delta-Math.PI/2;
				
				theothers[i].velocity[0] = Math.sqrt(v2*v2+y2*y2)
				theothers[i].velocity[1] = Math.atan(y2/v2)+Math.PI/2+delta;
				
				console.log([this.velocity[1]/Math.PI*180,theothers[i].velocity[1]/Math.PI*180]);
			}
		}
		
		this.pos[0] += Math.cos(this.velocity[1]-Math.PI/2) * this.velocity[0] * realtime;
		this.pos[1] += Math.sin(this.velocity[1]-Math.PI/2) * this.velocity[0] * realtime;
	}
	
	tick(realtime:number,index:number,theothers:blob[]) {
		this.step(realtime,index,blobs);
		this.draw();
	}
};

var blobs:blob[] = [];
var c = <HTMLCanvasElement> document.getElementById("renderCanvas");
var ctx = c.getContext("2d");

function super_tick(realtime:number) {
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,500,500);
	var i:number;
	for(i = 0;i < blobs.length;i++) blobs[i].tick(realtime,i,blobs);
	
}

blobs[0] = new blob({size:50,density:0.00012733987,initpos:[100,225],velocity:[50,2 * Math.PI * 1/4]},ctx);
blobs[1] = new blob({size:50,density:0.00012733987,initpos:[400,275],velocity:[50,2 * Math.PI * 3/4]},ctx);

// blobs[0] = new blob({size:50,density:0.00012733987,initpos:[50,250],velocity:[50,2 * Math.PI * 1/4]},ctx);
// blobs[1] = new blob({size:50,density:0.00012733987,initpos:[250,50],velocity:[50,2 * Math.PI * 2/4]},ctx);

t = setInterval(function(){super_tick(1/30);},1000/30);
// initx:number,inity:number,initvelx:number,initvely:number,size:number