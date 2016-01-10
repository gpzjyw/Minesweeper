var mineArray = [[1,0,0,0,0,0,0,0,0,1,0,0,0,0],
				 [0,1,0,0,0,0,0,0,0,0,1,0,0,0],
				 [0,0,1,0,0,0,0,0,0,0,0,1,0,0],
				 [0,0,0,1,0,0,0,0,0,0,0,0,1,0],
				 [0,0,0,0,1,0,0,0,0,0,0,0,0,1],
				 [0,0,0,0,0,1,0,0,0,0,0,0,1,0],
				 [0,0,0,0,0,0,1,0,0,0,0,1,0,0],
				 [0,0,0,0,0,0,0,1,0,0,1,0,0,0],
				 [0,0,0,0,0,0,0,0,1,1,0,0,0,0]];
var mineAround =[[],[],[],[],[],[],[],[],[]];
var rowLength = mineArray.length;
var columnLength = mineArray[0].length;

//确认一个方块周围8（或3或5）个方块雷的数目，并存入mineAround中
for(var i=0; i<rowLength; i++){
	for(var j=0; j<columnLength; j++){
		var count = 0;
		if((i-1)>=0 && (j-1)>=0){
			if(mineArray[i-1][j-1]){count++;}
		}
		if((i-1)>=0){
			if(mineArray[i-1][j]){count++;}
		}
		if((i-1)>=0 && (j+1)<columnLength){
			if(mineArray[i-1][j+1]){count++;}
		}
		if((j-1)>=0){
			if(mineArray[i][j-1]){count++;}
		}
		if((j+1)<columnLength){
			if(mineArray[i][j+1]){count++;}
		}
		if((i+1)<rowLength && (j-1)>=0){
			if(mineArray[i+1][j-1]){count++;}
		}
		if((i+1)<rowLength){
			if(mineArray[i+1][j]){count++;}
		}
		if((i+1)<rowLength && (j+1)<columnLength){
			if(mineArray[i+1][j+1]){count++;}
		}
		mineAround[i][j] = count;
	}
}

//为有雷的方块添加alert事件，为无雷的方块添加扫雷程序
for(var i=0; i<rowLength; i++){
	for(var j=0; j<columnLength; j++){
		var row = document.getElementsByClassName("row"+i)[0];
		var column = row.getElementsByClassName("column"+j)[0];
		var btn = column.getElementsByTagName("button")[0];
		if(mineArray[i][j]==1){
			addEvent(btn, "click", function(){
				alert("This is a mine");
			});
		}else{
			addEvent(btn, "click", function(x, y){
				return function(){
					sweepMine(x, y);	
				};
			}(i, j));
//			addEvent(btn, "click", function(i){
//				return function(){
//					addAlert(i);
//				};
//			}(mineAround[i][j]));
		}
	}
}

function sweepMine(i, j){
	if(mineAround[i][j]==0){
		showMineAround(i, j);
		//左上方	↖
		if((i-1)>=0 && (j-1)>=0){
			if(isSweeped(i-1, j-1)==false){
				showMineAround(i-1, j-1);
				if(mineAround[i-1][j-1]==0){
					sweepMine(i-1, j-1);
				}
			}
		}
		//正上方	↑
		if((i-1)>=0){
			if(isSweeped(i-1, j)==false){
				showMineAround(i-1, j);
				if(mineAround[i-1][j]==0){
					sweepMine(i-1, j);
				}
			}
		}
		//右上方	↗
		if((i-1)>=0 && (j+1)<columnLength){
			if(isSweeped(i-1, j+1)==false){
				showMineAround(i-1, j+1);
				if(mineAround[i-1][j+1]==0){
					sweepMine(i-1, j+1);
				}
			}
		}
		//正左方	←
		if((j-1)>=0){
			if(isSweeped(i, j-1)==false){
				showMineAround(i, j-1);
				if(mineAround[i][j-1]==0){
					sweepMine(i, j-1);
				}
			}
		}
		//正右方	→
		if((j+1)<columnLength){
			if(isSweeped(i, j+1)==false){
				showMineAround(i, j+1);
				if(mineAround[i][j+1]==0){
					sweepMine(i, j+1);
				}
			}
		}
		//左下方	↙
		if((i+1)<rowLength && (j-1)>=0){
			if(isSweeped(i+1, j-1)==false){
				showMineAround(i+1, j-1);
				if(mineAround[i+1][j-1]==0){
					sweepMine(i+1, j-1);
				}
			}
		}
		//正下方	↓
		if((i+1)<rowLength){
			if(isSweeped(i+1, j)==false){
				showMineAround(i+1, j);
				if(mineAround[i+1][j]==0){
					sweepMine(i+1, j);
				}
			}
		}
		//右下方	↘
		if((i+1)<rowLength && (j+1)<columnLength){
			if(isSweeped(i+1, j+1)==false){
				showMineAround(i+1, j+1);
				if(mineAround[i+1][j+1]==0){
					sweepMine(i+1, j+1);
				}
			}
		}
	}else{
		showMineAround(i, j);
	}
}

function showMineAround(i, j){
	var row = document.getElementsByClassName("row"+i)[0];
	var column = row.getElementsByClassName("column"+j)[0];
	var btn = column.getElementsByTagName("button")[0];
	if(mineArray[i][j]==0){
		btn.innerHTML = mineAround[i][j];
	}
}

//根据button中是否有内容判断某无雷方块是否已被扫过，若已被扫过，返回ture，否则，返回false
function isSweeped(i, j){
	var row = document.getElementsByClassName("row"+i)[0];
	var column = row.getElementsByClassName("column"+j)[0];
	var btn = column.getElementsByTagName("button")[0];
	if(btn.innerHTML == ""){
		return false;
	}else{
		return true;
	}
}