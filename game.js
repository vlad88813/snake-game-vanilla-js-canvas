const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/1562688808.png';

const foodImg = new Image();
foodImg.src = 'img/1562688805.png';

const crab_img = new Image();
crab_img.src = 'img/crab.png';

const head_snake = new Image();
head_snake.src = 'img/head_snake.png';

const mouse_img = new Image();
mouse_img.src = 'img/mouse_gray.png';

const diamond_img = new Image();
diamond_img.src = 'img/diamond.png'; 


//звуковые файлы 

let ate_audio = new Audio ();
let hitting_the_wall_audio = new Audio();
let hit_myself_audio = new Audio();

ate_audio.src = 'audio/ate_an_item.mp3';
hitting_the_wall_audio.src = 'audio/hitting_the_wall.mp3';
hit_myself_audio.src = 'audio/hit_myself.mp3';

const box = 32;

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};




document.addEventListener('keydown', direction);


let dir;

function direction(event){
    if (event.keyCode == 37 && dir != 'right')
        dir = 'left';
    else if (event.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if (event.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if (event.keyCode == 40 && dir != 'up')
        dir = 'down';
}

function eatTail (head, arr){
    for (let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
        clearInterval(game); 
        hit_myself_audio.play();
        } 
    }
}



//  игра string 80 - 164;

let snakeX = snake[0].x;
let snakeY = snake[0].y;

function drawGame() {
ctx.drawImage(ground,0,0); // загружаем фон 
//дальше мы загружаем еду в зависимости от счета. Доступно 4 вида еды. 
if (score % 2 == 0){
ctx.drawImage(foodImg, food.x, food.y)
}
else if  (score % 3 == 0){ 
ctx.drawImage(crab_img, food.x, food.y)
}
else if ( score % 2.5 == 0.5){
ctx.drawImage(diamond_img, food.x, food.y)
    if (snakeX == food.x && snakeY == food.y) {
        score = score + (Math.floor(Math.random()*10));  // когда змея ест бриллиант рандомно прибавляет очков (от 1 до 10)
    }
}
else {
ctx.drawImage(mouse_img, food.x, food.y)    
}

// цвет червяка 
for (let i = 0; i < snake.length; i++){
    let gradient = ctx.createLinearGradient(food.x-10,food.y-10, snake[i].x+50,snake[i].y+50); // меняет градиент у еды 
    // let gradient = ctx.createLinearGradient(snake[i].x-10,snake[i].y-10, snake[i].x+20,snake[i].y+20); // черняк с чешуёй 
    gradient.addColorStop(0,'Crimson');
    gradient.addColorStop(.5,'cyan');
    gradient.addColorStop(1,'Crimson');
    ctx.fillStyle = i == 0 ? 'green' : gradient;
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

}

 ctx.fillStyle = 'white';
 ctx.font = '50px Setif';
 ctx.fillText(score, box * 2.5, box * 1.7);

 ctx.fillText(Timer_sek, box * 16, box * 1.7);
 ctx.font = '30px Verdana';
 ctx.strokeText('Game time', box * 9, box * 1.7);






// let snakeX = snake[0].x;
// let snakeY = snake[0].y;


if(snakeX == food.x && snakeY == food.y ){
    score++;
    ate_audio.play();
    ctx.drawImage(head_snake, food.x, food.y); // голова во время еды
    if (score == 1){
    setInterval(plus_sek,1000); //таймер секундный
    }
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
        };

} else {
    snake.pop();
}

// код выхода за рамки поля => конец игры; 

if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17){ 
clearInterval(game);
hitting_the_wall_audio.play();
}

if (dir == "left") snakeX -= box;
if (dir == 'right') snakeX += box;
if (dir == 'up') snakeY -= box;
if (dir == 'down') snakeY += box; 


let newHead = {
    x: snakeX,
    y: snakeY   
};


eatTail(newHead, snake)

snake.unshift(newHead);
}


const game = setInterval(drawGame, 200);



// таймер тут 

let Timer_sek = 0;

function plus_sek () {
    Timer_sek++
 }

    


