const game_screen = document.getElementById('game_screen');
const board = document.createElement('TABLE');
const level = document.getElementById('level');
const btn_play = document.getElementById('btn_play');
const label = document.getElementById('label')
const message = document.getElementById('message')
let snake = {
    length : 0,
    direction: 'UP',
    position_X: 10,
    position_Y: 10,
}

tail = [];

let dimension = 50;

let is_allowed = true;

for(i=0 ; i<dimension**2 ; i++){
    tail.push({ position_X: 0,
                position_Y: 0
            });
}

let meat = {
    position_X: 15,
    position_Y: 15,
}



let rows = [];
let screen_dims = () => {
    const HEIGHT    = window.innerHeight;
    const WIDTH     = window.innerWidth;
    if(HEIGHT <= WIDTH)
        return {height: HEIGHT , width: WIDTH};
    else
        return {height: WIDTH , width: HEIGHT};
}
let board_width = Math.floor((85*screen_dims().height)/100);

const board_maker = (dim = dimension) => {

    game_screen.style.height = `${board_width}px`;
    game_screen.style.width = game_screen.style.height;

    board.style.width = '100%';
    board.style.height = '100%';
    for(i = 0 ; i < dim ; i++) {
        let tiles = [];
        let row = document.createElement(`TR`)
        row.setAttribute('id', `row_${i}`);
        
        row.style.width = '10px';
        row.style.height = '10px';
        row.style.backgroundColor = 'red';
        board.appendChild(row);
        for(j = 0 ; j < dim ; j++) {
            row = document.getElementById(`row_${i}`);
            const tile = document.createElement(`TD`);
            tile.setAttribute('id', `tile_${j}`);
            tiles.push(tile);
            tile.style.width = '10px';
            tile.style.height = '10px';
            tile.style.backgroundColor = 'red';
            row.appendChild(tile);
        }
        rows.push(tiles);
        
    }


    
}

const meat_generator = () => {
    
    tail[snake.length].position_X = meat.position_X;
    tail[snake.length].position_Y = meat.position_Y;
   
    meat.position_X = Math.floor(Math.random()*(dimension-1));
    meat.position_Y = Math.floor(Math.random()*(dimension-1));
    
    snake.length++;
    level.innerText = `Level : ${snake.length}`;

}


const tail_movement = () =>  {
    temp_X = [];
    temp_Y = [];

    for(i = 0; i< snake.length ; i++) {
        if(i==0) {
            temp_X.push(tail[0].position_X);
            temp_Y.push(tail[0].position_Y);
            tail[0].position_X = snake.position_X;
            tail[0].position_Y = snake.position_Y;
        }
        else {
            temp_X.push(tail[i].position_X);
            temp_Y.push(tail[i].position_Y);
            tail[i].position_X = temp_X[i-1];
            tail[i].position_Y = temp_Y[i-1];
        }
    }
    is_bitten();
}

const is_bitten = () => {
    for(i=1 ; i < snake.length ; i++){
        if((snake.position_X === tail[i].position_X) && (snake.position_Y === tail[i].position_Y)) {
            console.log('biiiiit');
            game_over();
        }
    }
}

const snake_movement = () => {
    document.querySelectorAll('TD').forEach(i => {
        i.style.backgroundColor = 'red';
    });

    if((snake.position_Y === meat.position_Y) && (snake.position_X === meat.position_X)){
        meat_generator();
    }

    rows[meat.position_Y][meat.position_X].style.backgroundColor = 'blue';
    //rows[meat.position_Y][meat.position_X].style.borderRadius = '10px';

    for(i = 0; i < snake.length ; i++) {
        rows[tail[i].position_Y][tail[i].position_X].style.backgroundColor = 'yellow';
    }
        rows[snake.position_Y][snake.position_X].style.backgroundColor = 'yellow';
    
    
}

const game_over = () => {
    is_allowed = false;
    label.innerText = 'GAME OVER';
    btn_play.innerText = 'TRY AGAIN?';
    snake.position_X = Math.floor(Math.random()*(dimension-1));
    snake.position_Y = Math.floor(Math.random()*(dimension-1));
    snake.length = 0;
    message.style.display = 'flex';

}

btn_play.addEventListener('click' , e => {
    is_allowed = true; 
    game(is_allowed);
    message.style.display = 'none';
    level.innerText = `Level : ${snake.length}`;


})

const refresher = (position_X = snake.position_X, position_Y = snake.position_Y , directon = snake.direction) => {

    rows[meat.position_Y][meat.position_X].style.backgroundColor = 'blue';
    tail_movement();
    //console.log(direction);
    switch(directon) {
        case 'UP':
            snake.position_Y--;
            if(snake.position_Y < 0){
                snake.position_Y = dimension-1;
            }
            break;
        case 'DOWN':
            snake.position_Y++;
            if(snake.position_Y > dimension-1){
                snake.position_Y = 0;
            }
            break;
        case 'LEFT':
            snake.position_X--;
            if(snake.position_X < 0){
                snake.position_X = dimension-1;
            }
            break;
        case 'RIGHT':
            snake.position_X++;
            if(snake.position_X > dimension-1){
                snake.position_X = 0;
            }
            break;
         
    }

    //console.log(snake.length);

    snake_movement();   

}

game_screen.appendChild(board);


board_maker(dim = dimension);



document.addEventListener('keydown', e => {

    //console.log(snake.length);
    switch(e.key.toString()) {
        case 'ArrowUp':
            if(snake.length){
                if(snake.position_Y-1 === tail[0].position_Y){
                    break;
                }
            }
            snake.direction = 'UP';
            break;
        
        case 'ArrowDown':
            if(snake.length){
                if(snake.position_Y+1 === tail[0].position_Y){
                    break;
                }
            }
            snake.direction = 'DOWN';
            break;
        
        case 'ArrowLeft':
            if(snake.length){
                if(snake.position_X-1 === tail[0].position_X){
                    break;
                }
            }
            snake.direction = 'LEFT';
            break;
        
        case 'ArrowRight':
            if(snake.length){
                if(snake.position_X+1 === tail[0].position_X){
                    break;
                }
            }
            snake.direction = 'RIGHT';
            break;                       
    }

    //console.log(snake.direction);
});


let game = (allow) => {
    if(allow){
        setTimeout(() => {
            refresher();
            game(is_allowed);
        }, 25);
    }
}











