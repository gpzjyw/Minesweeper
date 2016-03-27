var mineModel = (function() {
	
	var rowLength,
		columnLength,
		mineNum,
		mineNumLeft,
		mineArray,
		mineAround,
		flagMarked,
		showFlagMarked,
		showMineAround,
		sweepMine,
		initMine,
		updateMineArrayAround,
		createMinesMap;
		
	//将第i行j列设置为被标记，若已被标记，则取消标记
	showFlagMarked = function(i, j) {
		var row = document.getElementsByClassName("row" + i)[0],
			column = row.getElementsByClassName("column" + j)[0],
			p = column.getElementsByTagName("p")[0];
		
		if (flagMarked[i][j] == 0) {
			flagMarked[i][j] = 1;
			p.className = "j-flag"
		} else if (flagMarked[i][j] == 1) {
			flagMarked[i][j] = 0;
			p.className = "";
		}
	},
	
	//显示第i行第j列的方块的mineAround
	showMineAround = function(i, j) {
		var row = document.getElementsByClassName("row" + i)[0],
			column = row.getElementsByClassName("column" + j)[0],
			p = column.getElementsByTagName("p")[0];
		
		flagMarked[i][j] = 2;
		p.innerHTML = mineAround[i][j];
		p.className = "j-sweeped";
	};
	
		
	//扫雷程序，当点击不是雷的方块时，根据方块周围8个方块的mineAround，确定如何继续扫雷
	sweepMine = function(i, j) {
		if (mineAround[i][j]==0) {
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
		} else {
			showMineAround(i, j);
		}
		/* 
		 * 先判断第i行j列的方块是否存在；若存在，则判断是否被扫过或被标记；
		 * 若未被扫过或被标记，则检查其周边8（或5或3）个方块是否有雷；
		 * 若无雷，则递归调用sweepMine；
		 */
		function sweepMineAction(x, y) {
			console.log('row:'+x+'; column:'+y);
			if (x>=0 && x<rowLength && y>=0 && y<columnLength) {
				if (flagMarked[x][y] == 0) {
					showMineAround(x, y);
					if (mineAround[x][y] == 0) {
						sweepMine(x, y);
					}
				}
				return true;
			}
		}
	};
	
	//传入雷图的行列数和雷的总数，初始化各项参数的基本值
	initMine = function(row, column, mine) {
		var i, j;
		
		rowLength = row;
		columnLength = column;
		mineNum = mine;
		mineArray = [];
		mineAround = [];
		flagMarked = [];
		
		//生成空矩阵（用数组模拟）
		for (i=0; i<rowLength; i++) {
			mineAround.push([]);
			mineArray.push([]);
			flagMarked.push([]);
			for (j=0; j<columnLength; j++) {
				mineArray[i].push(0);
				flagMarked[i].push(0);
			}
		}
	},
	
	//更新mineArray和mineAround
	updateMineArrayAround = function() {
		var i, j;
		//根据雷的总数生成雷的分布，更新mineArray
		for (i=0; i<mineNum; ) {
			var randomRow = Math.floor(rowLength * Math.random()),
				randomColumn = Math.floor(columnLength * Math.random());
			
			if (mineArray[randomRow][randomColumn] == 0) {
				mineArray[randomRow][randomColumn] = 1;
				i++;
			}
		}

		//确认一个方块周围8（或3或5）个方块雷的数目，更新mineAround
		for (i=0; i<rowLength; i++) {
			for (j=0; j<columnLength; j++) {
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
	};
	
	//判断x行y列是否为雷
	isMine = function(x, y) {
		if (mineArray[x][y] == 1) {
			return true;
		} else {
			return false;
		}
	};
	
	createMinesMap = function() {

		var childs = $_id("m-table").childNodes,
			i, j;
			
		//移除table标签下的所有子节点
		for (i=childs.length-1; i>=0; i--) {
			$_id("m-table").removeChild(childs.item(i));
		}
		
		//根据rowLength和columnLength增加table标签下的节点
		for (i=0; i<rowLength; i++) {
			var tr = document.createElement("tr");
			tr.className = "row"+i;
			for (j=0; j<columnLength; j++) {
				var td = document.createElement("td"),
					pElement = document.createElement("p");
					
				td.className = "column"+j;
				td.appendChild(pElement);
				tr.appendChild(td);
			}
			$_id("m-table").appendChild(tr);
		}
		$_id("j-minenum").innerHTML = mineNum;
		
	};
	
	return {
		initMine : initMine,
		
		updateMineArrayAround : updateMineArrayAround,
		
		createMinesMap : createMinesMap,
		
		sweepMine : sweepMine,
		
		showFlagMarked : showFlagMarked,
		
		isMine : isMine
	};
		
}());

var mainMapSelect = function(rowLength, columnLength, mineNum) {
	mineModel.initMine(rowLength, columnLength, mineNum);
	mineModel.updateMineArrayAround();
	mineModel.createMinesMap();
};

addEvent($_id("f-low"), "click", function() {
	mainMapSelect(9, 9, 10);
});
addEvent($_id("f-middle"), "click", function() {
	mainMapSelect(16, 16, 40);
});
addEvent($_id("f-high"), "click", function() {
	mainMapSelect(16, 30, 99);
});
//添加事件代理
addEvent($_id("m-table"), "mouseup", function(event) {
	var target = event.target,
		column = target.parentNode.className.slice(6),
		row = target.parentNode.parentNode.className.slice(3);
	
	if ( target.nodeName.toLowerCase() !== "p") {
		return ;
	}
	
	switch (event.button){
		//左键触发事件
		case 0:
			if ( mineModel.isMine(+row, +column) ) {
				alert("This is a mine, you failed!");
				// restart a new game
			} else {
				mineModel.sweepMine(+row, +column);
			}
			break;
		//右键触发事件
		case 2:
			mineModel.showFlagMarked(+row, +column);
			break;
		default:
			break;
	}
});










