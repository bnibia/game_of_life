




var ctx, w, h;
var grid0;
var grid1;


var grid, i, j, x, y;
var size = 5;

var LIVE = 1;
var DEAD = 0;


window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");
	
	
    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
        
		w = canvas.width; 
        h = canvas.height; 
		
		grid0 = [];
		grid1 = [];
		
		for(x=0, i=0;i<w;i+=size, x++)
		{	
			grid0[x] = [];
			grid1[x] = [];
			
			for(y=0, j=0;j<h;j+=size, y++)
			{
				let state = Math.floor(Math.random()*2);
				let color_state = color(state);
				
				grid0[x][y] = state;
				grid1[x][y] = state;
				
				ctx.fillStyle = color_state;
				ctx.fillRect(i, j, size, size);
			}
		}
		
		window.requestAnimationFrame(draw);
    
    }

};



function color(c)
{
	
	if(c) return "#ffffff";
	return "#000000";
}

function swap()
{
	let temp = grid0;
	grid0 = grid1;
	grid1 = temp;
}

function draw()
{
	
	//ctx.clearRect(0, 0, w, h);
	for(x=0, i=0;i<w;i+=size, x++)
	{	for(y=0, j=0;j<h;j+=size, y++)
		{
			let next_state, color_state;
			let cur_state = grid0[x][y]; 
			
			let neighboors = alive_around(x, y);
			
			if(cur_state == LIVE)
			{
				if(neighboors == 2 || neighboors == 3) next_state = LIVE;
				else 
				{
					if(neighboors < 2) next_state = DEAD;
					else if(neighboors > 3) next_state = DEAD;
				//else next_state = cur_state;
				}
			}
			else
			{	if(neighboors == 3) next_state = LIVE;
				else next_state = cur_state;
			}

			color_state = color(cur_state);
			grid1[x][y] = next_state;
			ctx.fillStyle = color_state;
			ctx.fillRect(i, j, size, size);
		}
	}
	
	swap();
	window.requestAnimationFrame(draw);
        
}



function alive_around(x, y)
{
	var alive = 0;
	var row, col;
	
	for(let a=-1;a<2;a++)
	{	
		row = x+a;
		if(row < 0 || row >= grid0.length) continue;
		
		for(let b=-1;b<2;b++)
		{	
			if(!a && !b) continue;
			
			col = y+b;
			if(col < 0 || col >= grid0.length) continue;
				
			alive += grid0[row][col];
		}
		
	}
	
	return alive;
}




        

 
 

 
 
 
 
