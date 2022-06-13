// constant
CANVAS_SIZE = 600;
CANVAS_BACKGROUND_COLOR = "D4DFE6";
GAME_SIZE = 4;
BLOCK_SIZE = 130;
GAP_SIZE = 16;
BLOCK_PLACEHOLDER_COLOR = "C4CFD6";
BLOCK_BACKGROUND_COLOR = "CADBE9";
FRAME_PER_SECOND = 30;
ANIMATION_TIME = 0.15;

// global utility functions
randInt = function(a,b){
    return a + Math.floor(Math.random()*(b+1-a));
}

randChoice = function(arr){
    return arr[randInt(0,arr.length-1)];
}

// model
class Game{
    constructor(){
        this.data = [];
        this.points = 0;
        this.initializeData();
    }

    initializeData(){
        this.data = [];
        this.points = 0;
        for(let i = 0;i<GAME_SIZE;i++){
            let tmp = [];
            for(let j = 0;j<GAME_SIZE;j++){
                tmp.push(null);
            }
            this.data.push(tmp);
        }
        this.generateNewBlock();
        this.generateNewBlock();
    }

    generateNewBlock(){
        let pos = [];
        for(let i = 0;i<GAME_SIZE;i++){
            for(let j = 0;j<GAME_SIZE;j++){
                if(this.data[i][j] == null){
                    pos.push([i,j]);
                }
            }
        }

        let randPos = randChoice(pos);
        this.data[randPos[0]][randPos[1]] = 2;
    }

    shiftBlock(arr,reverse = false){
        let head = 0;
        let tail = 1;
        let incr = 1;
        let moves = [];
        let points = 0;
        if(reverse == true){   
            head = arr.length - 1;
            tail = head - 1;
            incr = -1;
        }

        while(tail >= 0 && tail < arr.length){
            if(arr[tail] != null){
                if(arr[head] == null){
                    arr[head] = arr[tail];
                    arr[tail] = null;
                    moves.push([tail,head]);
                }else if(arr[tail] == arr[head]){
                    arr[head] = arr[head] * 2;
                    points += arr[head];
                    arr[tail] = null;
                    moves.push([tail,head]);
                    head += incr;
                }else{
                    head += incr;
                    tail -= incr;
                }
            }
            tail += incr;
            if(head == tail){
                tail += incr;
            }
        }

        return {
            "moves": moves,
            "points": points
        };
    }

    //command in [l,r,u,d]
    advance(command){
        let moves = [];
        let reverse = false;
        if(command == "l" || command == "r"){
            if(command == "r"){
                reverse = true;
            }
            for(let i = 0;i<GAME_SIZE;i++){
                let result = this.shiftBlock(this.data[i],reverse);
                for(let move of result.moves){
                    moves.push([[i,move[0]],[i,move[1]]]);
                }
                this.points += result.points;
            }
        }else if(command == "u" || command == "d"){
            for(let j = 0;j<GAME_SIZE;j++){
                let tmp = [];
                for(let i = 0;i<GAME_SIZE;i++){
                    tmp.push(this.data[i][j]);
                }
                if(command == "d"){
                    reverse = true;
                }
                let result = this.shiftBlock(tmp,reverse);
                for(let move of result.moves){
                    moves.push([[move[0],j],[move[1],j]]);
                }
                for(let i = 0;i<GAME_SIZE;i++){
                    this.data[i][j] = tmp[i];
                }
                this.points += result.points;
            }
        }
        if(moves.length != 0){
            this.generateNewBlock();
        }
        return {
            "moves": moves,
            "points": this.points
        };
    } 
}

// test
class Test{
    static compareArray(arr1,arr2){
        if(arr1.length != arr2.length){
            return false;
        }
        for(let i = 0;i<arr1.length;i++){
            if(arr1[i]!=arr2[i]){
                return false;
            }
        }
        return true;
    }

    static test_shiftBlock(){
        let gameTest = new Game();
        let testCases =[
            [[4,2,null,2],[4,4,null,null]],
            [[2,2,null,2],[4,2,null,null]]
        ]
        let errFlag = false;
        for(let test of testCases){ 
            for(let reverse of [true,false]){
                let input = test[0].slice();
                let result = test[1].slice();
                if(reverse == true){
                    input.reverse();
                    result.reverse();
                }
                gameTest.shiftBlock(input,reverse);
                if(!Test.compareArray(input,result)){
                    console.log("ERROR!");
                    console.log(input);
                    console.log(result);
                    errFlag = true;
                }
            }
        }

        if(!errFlag){
            console.log("PASS");
        }else{
            console.log("NO PASS");
        }
    }
}

// view
class View {
    constructor(game,container){
        this.game = game;
        this.blocks = [];
        this.container = container;
        this.initializeContainer();
    }

    initializeContainer(){
        this.container.style.width = CANVAS_SIZE;
        this.container.style.height = CANVAS_SIZE;
        this.container.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
        this.container.style.position = "relative";
        this.container.style.display = "inline-block";
        this.container.style.zIndex = 1;
        this.container.style.borderRadius = "15px";
    }

    animate(moves){
        this.doFrame(moves,0,ANIMATION_TIME);
    }

    gridToPosition(i,j){
        let top = i*(BLOCK_SIZE+GAP_SIZE)+GAP_SIZE;
        let left = j*(BLOCK_SIZE+GAP_SIZE)+GAP_SIZE;
        return [top,left];
    }

    doFrame(moves,currTime,totalTime){
        if(currTime < totalTime){
            setTimeout(()=>{
                this.doFrame(moves,currTime+1/FRAME_PER_SECOND,totalTime);
            }, 1 / FRAME_PER_SECOND * 1000);

            for(let move of moves){
                let block = this.blocks[[move[0][0]]][move[0][1]];
                let origin = this.gridToPosition(move[0][0],move[0][1]);
                let destination = this.gridToPosition(move[1][0],move[1][1]);
                let currPosition = [
                    origin[0] + currTime/totalTime*(destination[0]-origin[0]),
                    origin[1] + currTime/totalTime*(destination[1]-origin[1]),
                ]
                block.style.top = currPosition[0];
                block.style.left = currPosition[1];
            }
        }else{
            view.drawGame();
        }
    }

    drawGame(){
        this.container.innerHTML = "";
        this.blocks = [];
        for(let i = 0;i<GAME_SIZE;i++){
            let tmp = [];
            for(let j = 0;j<GAME_SIZE;j++){
                this.drawBackgroundBlock(i,j,BLOCK_PLACEHOLDER_COLOR);
                let block = null;
                if(this.game.data[i][j]){
                    block = this.drawBlock(i,j,this.game.data[i][j]);
                }
                tmp.push(block);
            }
            this.blocks.push(tmp);
        }
    }

    drawBackgroundBlock(i,j,color){
        let block = document.createElement("div");
        block.style.width = BLOCK_SIZE;
        block.style.height = BLOCK_SIZE;
        block.style.backgroundColor = color;
        block.style.position = "absolute";
        block.style.top = i * BLOCK_SIZE+ (i+1)*GAP_SIZE;
        block.style.left = j * BLOCK_SIZE+ (j+1)*GAP_SIZE;
        block.style.borderRadius = "10px";
        block.style.zIndex = 3;
        this.container.append(block);
        return block;
    }

    drawBlock(i,j,number){
        let span = document.createElement("span");
        let text = document.createTextNode(number);
        let block =  this.drawBackgroundBlock(i,j,BLOCK_BACKGROUND_COLOR);
        span.appendChild(text);
        block.appendChild(span);
        block.style.zIndex = 5;
        span.style.fontSize = "80px";
        span.style.position = "absolute";
        span.style.top = (BLOCK_SIZE - span.offsetHeight)/2;
        span.style.left = (BLOCK_SIZE - span.offsetWidth)/2;

        return block;
    }
}

// controller
var container = document.getElementById("game-container");
var pointsContainer = document.getElementById("points");
var game = new Game();
var view = new View(game,container);
view.drawGame();

document.onkeydown = function(event){
    let result = null;
    if(event.key == "ArrowLeft"){
        result = game.advance("l");
    }else if(event.key == "ArrowRight"){
        result = game.advance("r");
    }else if(event.key == "ArrowUp"){
        result = game.advance("u");
    }else if(event.key == "ArrowDown"){
        result = game.advance("d");
    }
    if(result && result.moves.length > 0){
        //console.log(game.points);
        pointsContainer.innerHTML = `Points: ${game.points}`;
        view.animate(result.moves);
    }
}