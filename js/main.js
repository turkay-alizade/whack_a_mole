let moles = document.querySelectorAll('.mole');
let timer = document.getElementById('timer');
let score = document.getElementById('score');
let audio = document.querySelector('audio');
let startBtn = document.getElementById('start-btn');
let startDiv = document.querySelector('.start');
let resetBtn = document.getElementById('reset');
let gameArea = document.querySelector('.game-area');
let highScore = document.getElementById('high-score');
let game = true;
let gameScore = 0;
let gameTimer = 60;
let lastMole;

function randomTime(min,max){
  return ( Math.round(Math.random() * (max - min) + min))
}

function randomMole(){
    let i = Math.floor (Math.random() * moles.length);
    let mole = moles[i];
    if(lastMole === mole){
        return randomMole()
    }else{
        lastMole = mole
    }
    return mole
}

function show(){
    let time= randomTime(1000,2000);
    let mole=randomMole();
    mole.classList.add("active");
    if(gameScore >= 7){
        time= randomTime(600,1200);
    };
    setTimeout(() => {
        mole.classList.remove('active');
        if(game) show()
    }, time);
};

function game_Timer(){
    if(gameTimer<=10 && gameTimer>0){
        gameTimer--;
        timer.innerText = `00:0${gameTimer}`;
        timer.classList.add('timer')
    }else if(gameTimer>0){
        gameTimer--;
        timer.innerHTML = `00:${gameTimer}`
    }
    if(gameTimer===0){
        timer.classList.remove('timer')
    }
};

startBtn.addEventListener('click',()=>{
    game=true;
    gameTimer=60;
    gameScore=0;
    score.innerText = `Score: ${gameScore}`;
    setInterval(game_Timer, 1000);
    show();
    setTimeout(()=>{
        game=false;
    },60000);
    startDiv.style.opacity='0';
    startDiv.style.zIndex='-1';
});

moles.forEach(mole=>{
    mole.addEventListener('mousedown',()=>{
        gameArea.style.cursor='url(images/img4.png), auto';
        if(mole.classList.contains('active')){
            mole.classList.remove('active');
            gameScore ++ ;
            score.innerText = `Score: ${gameScore}`;
            audio.play();
            if(localStorage.getItem('score') !=null){
                localStorage.setItem('new-score',gameScore);
            }else{
                localStorage.setItem('score',gameScore)
            };
        }
    });
    mole.addEventListener('mouseup',()=>{
        gameArea.style.cursor='url(images/img3.png), auto';
    });
});

function local_storage(){
    if(localStorage.getItem('score') !=null){
        if(Number(localStorage.getItem('score')) >= Number(localStorage.getItem('new-score'))){
            highScore.innerText = `High Score: ${localStorage.getItem('score')}`;
        }else{
            localStorage.setItem('score',localStorage.getItem('new-score'))
        };
    }
}

local_storage();

resetBtn.addEventListener('click',()=>{
    local_storage();
    location.reload();
});
 