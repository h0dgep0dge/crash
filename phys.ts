class blob {
	size:number;
	pos:number[] = [10,10]; // x,y
	velocity:number[] = [20,10];
	context:any;
    constructor(initx:number,inity:number,initvelx:number,initvely:number,size:number,context:any) {
		this.size = size;
		this.pos[0] = initx;
		this.pos[1] = inity;
		this.velocity[0] = initvelx;
		this.velocity[1] = initvely;
		this.context = context;
	}
	
    draw() {
		this.context.beginPath();
		this.context.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI, false);
		this.context.fillStyle = 'green';
		this.context.fill();
    }
	
	step(realtime:number,index:number,theothers:blob[]) {
		if(this.pos[0]+this.size >= 500 || this.pos[0]-this.size < 0) this.velocity[0] = -this.velocity[0];
		if(this.pos[1]+this.size >= 500 || this.pos[1]-this.size < 0) this.velocity[1] = -this.velocity[1];
		
		
		
		this.pos[0] += this.velocity[0] * realtime;
		this.pos[1] += this.velocity[1] * realtime;
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
	ctx.clearRect(0,0,c.width,c.height);
	var i:number;
	for(i = 0;i < blobs.length;i++) blobs[i].tick(realtime,i,blobs);
}

blobs[0] = new blob(250,250,(Math.random()-0.5)*500,(Math.random()-0.5)*500,Math.random()*50,ctx);
blobs[1] = new blob(250,250,(Math.random()-0.5)*500,(Math.random()-0.5)*500,Math.random()*50,ctx);
blobs[2] = new blob(250,250,(Math.random()-0.5)*500,(Math.random()-0.5)*500,Math.random()*50,ctx);
blobs[3] = new blob(250,250,(Math.random()-0.5)*500,(Math.random()-0.5)*500,Math.random()*50,ctx);
blobs[4] = new blob(250,250,(Math.random()-0.5)*500,(Math.random()-0.5)*500,Math.random()*50,ctx);

setInterval(function(){super_tick(1/30);},1000/30);
