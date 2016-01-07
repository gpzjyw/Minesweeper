
var mineArray = [[0,0,1,0,1],[1,0,0,1,0],[0,1,0,0,1],[0,0,0,0,1],[1,0,0,0,0]];
var mineAround =[[],[],[],[],[]];

for(var i=0; i<5; i++){
	for(var j=0; j<5; j++){
		var count = 0;
		if((i-1)>=0 && (j-1)>=0){
			if(mineArray[i-1][j-1]){count++;}
		}
		if((i-1)>=0){
			if(mineArray[i-1][j]){count++;}
		}
		if((i-1)>=0 && (j+1)<5){
			if(mineArray[i-1][j+1]){count++;}
		}
		if((j-1)>=0){
			if(mineArray[i][j-1]){count++;}
		}
		if((i+1)<5 && (j-1)>=0){
			if(mineArray[i+1][j-1]){count++;}
		}
		if((j+1)<5){
			if(mineArray[i][j+1]){count++;}
		}
		if((i+1)<5){
			if(mineArray[i+1][j]){count++;}
		}
		if((i+1)<5 && (j+1)<5){
			if(mineArray[i+1][j+1]){count++;}
		}
		
		mineAround[i][j] = count;
	}
}

for(var i=0; i<5; i++){
	for(var j=0; j<5; j++){
		
		var row = document.getElementsByClassName("row"+i)[0];
		var column = row.getElementsByClassName("column"+j)[0];
		var btn = column.getElementsByTagName("button")[0];
		
		if(mineArray[i][j]){	
			btn.innerHTML = 1;
		}else{
			btn.innerHTML = 0;
		}
	}
}
