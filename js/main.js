//添加初始事件
(function(){
	addEvent($_id("low"), "click", function(){
		createMinesMap(9, 9);
	});
	addEvent($_id("middle"), "click", function(){
		createMinesMap(16, 16);
	});
	addEvent($_id("high"), "click", function(){
		createMinesMap(16, 30);
	});
})();

function createMinesMap(rowLength, columnLength){
	//移除table标签下的所有子节点
	var childs = $_id("table").childNodes;
	for(var i=childs.length-1;i>=0;i--){
		$_id("table").removeChild(childs.item(i));
	}
	//根据rowLength和columnLength增加table标签下的节点
	for(i=0; i<rowLength; i++){
		var tr = document.createElement("tr");
		tr.className = "row"+i;
		for(j=0; j<columnLength; j++){
			var td = document.createElement("td")
			td.className = "column"+j;
			var buttonNode = document.createElement("button");
			td.appendChild(buttonNode);
			tr.appendChild(td);
		}
		$_id("table").appendChild(tr);
	}
	//生成mineArray，有雷概率为80%；生成不含数据的mineAround
	var mineArray = [];
	var mineAround = [];
	var mineNum = 0;
	for(var i=0; i<rowLength; i++){
		mineArray.push([]);
		mineAround.push([]);
		for(var j=0; j<columnLength; j++){
			if(Math.random()<=0.9){
				mineArray[i].push(0);
			}else{
				mineArray[i].push(1);
				mineNum += 1;
			}
		}
	}
	$_id("j-minenum").innerHTML = mineNum;
	mainFunction(rowLength, columnLength, mineArray, mineAround);
}
//根据rowLength，columnLength，mineArray，mineAround生成扫雷的主要程序
function mainFunction(rowLength, columnLength, mineArray, mineAround){
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
				addEvent(btn, "mousedown", (function(x, y){
					return function(event){
						if(event.button==2){
							showMineAround(x, y);
						}
					}
				})(i, j));
			}else{
				addEvent(btn, "click", (function(x, y){
					return function(){
						sweepMine(x, y);
					};
				})(i, j));
			}
		}
	}
	//扫雷程序，当点击不是雷的方块时，根据方块周围8个方块的mineAround，确定如何继续扫雷
	function sweepMine(i, j){
		if(mineAround[i][j]==0){
			showMineAround(i, j);
			//左上方	↖
			sweepMineAction(i-1, j-1);
			//正上方	↑
			sweepMineAction(i-1, j);
			//右上方	↗
			sweepMineAction(i-1, j+1);
			//正左方	←
			sweepMineAction(i, j-1);
			//正右方	→
			sweepMineAction(i, j+1);
			//左下方	↙
			sweepMineAction(i+1, j-1);
			//正下方	↓
			sweepMineAction(i+1, j);
			//右下方	↘
			sweepMineAction(i+1, j+1);
		}else{
			showMineAround(i, j);
		}
	}
	//先判断第i行j列是否存在，若存在，判断是否已经扫过，若没有被扫，则执行扫雷程序，递归调用函数sweepMine
	function sweepMineAction(i, j){
		if(i>=0 && i<rowLength && j>=0 && j<columnLength){
			if(isSweeped(i, j)==false){
				showMineAround(i, j);
				if(mineAround[i][j]==0){
					sweepMine(i, j);
				}
			}
		}
	}
	//显示第i行第j列的方块的mineAround
	function showMineAround(i, j){
		var row = document.getElementsByClassName("row"+i)[0];
		var column = row.getElementsByClassName("column"+j)[0];
		var btn = column.getElementsByTagName("button")[0];
		if(mineArray[i][j]==0){
			btn.innerHTML = mineAround[i][j];
			btn.className = "j-sweeped";
		}else{
			btn.innerHTML = "*";
			btn.className = "j-mines"
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
}