//challenge 5 
let blackjackGame = {
    'you': {'scoreboard': '#your-score', 'id':'your-flexbox', 'score':0},
    'bot': {'scoreboard': '#bot-score', 'id':'bot-flexbox', 'score':0},
    'card': ['2', '3' , '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ],
    'cardmap': {'2':2, '3':3 , '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A':[1,11]},
    'win': 0,
    'loss':0,
    'draw':0,
    'stand':false,
    'turnisover': false,
    'hit': false,
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['card'][randomIndex]; 
}

const YOU = blackjackGame['you'];
const BOT = blackjackGame['bot'];
const hitSound = new Audio('./sounds/swish.m4a');
const winSound = new Audio ('./sounds/cash.mp3');
const lostSound = new Audio ('./sounds/aww.mp3');


function blackjackHit() {
    if(blackjackGame['stand']===false){
    let card = randomCard();
    console.log(card);
    showCard(YOU, card);
    updateScore(card,YOU);
    showScore(YOU);
    blackjackGame['hit']=true
}
}


function showCard(player, card) {
if(player['score']<=21) {
    let cardImage = document.createElement('img');
    cardImage.src = './images/'+card+'.png';
    document.getElementById(player['id']).appendChild(cardImage);
    hitSound.play();
}
}

function blackjackDeal() {
    if(blackjackGame['turnisover']===true) {
    let yourImages = document.querySelector('#your-flexbox').querySelectorAll('img');
    for(i=0; i <yourImages.length; i++) {
        yourImages[i].remove();
    }

    let botImages = document.querySelector('#bot-flexbox').querySelectorAll('img');
    for(i=0; i <botImages.length; i++) {
        botImages[i].remove();
    }

    YOU['score'] = 0;
    BOT['score'] = 0;

    document.querySelector(YOU['scoreboard']).textContent = ' 0';
    document.querySelector(YOU['scoreboard']).style.color = 'white';
    document.querySelector(BOT['scoreboard']).textContent = ' 0';
    document.querySelector(BOT['scoreboard']).style.color = 'white';
    document.querySelector('#blackjack-result').textContent = "Let's play!";
    document.querySelector('#blackjack-result').style.color = 'gray';

    blackjackGame['stand']=false;
    blackjackGame['turnisover']=false;

}
}

function updateScore(card, player){
if(player['score']<=21) {     if(card === 'A'){
       if((player['score'] + blackjackGame['cardmap'][card][1]) <=21) {
           player['score'] += blackjackGame['cardmap'][card][1];
       } else {
        player['score'] += blackjackGame['cardmap'][card][0];
    };
    } else {
        player['score'] += blackjackGame['cardmap'][card];
}
}
}

function showScore(player) {
    if(player['score']<=21) {
        document.querySelector(player['scoreboard']).textContent = ' ' + player['score'];
} else {
        document.querySelector(player['scoreboard']).textContent = ' QUẮC';
        document.querySelector(player['scoreboard']).style.color = 'red';
}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand(){
    if(blackjackGame['hit']===true) {
    
    while(BOT['score']<18) {  
    let card = randomCard();
    showCard(BOT, card);
    updateScore(card,BOT);
    showScore(BOT);
    await sleep(1000);
    }
    showWinner();
    blackjackGame['turnisover']=true;
    blackjackGame['stand']=true;
}
}

function computeWinner() {
    let winner;
    console.log(YOU['score']);
    console.log(BOT['score']);
    if((YOU['score']>=16) && YOU['score']<=21) {
        if((YOU['score']>BOT['score']) || (BOT['score']>21) || (BOT['score']<16))  {
            winner = YOU;
            console.log('You won!');
            blackjackGame['win']++;
        } else if((YOU['score']<BOT['score']) && (BOT['score']<=21) && (BOT['score']>=16)) {
            winner = BOT;
            console.log('You lost!');
            blackjackGame['loss']++;
        } else if(YOU['score']=BOT['score']) {
            console.log('You drew!');
            blackjackGame['draw']++;
        } 
    }   else if ((YOU['score']>21) || (YOU['score']<16)) {
        if((BOT['score']>= 16) && (BOT['score']<=21)) {
            winner = BOT;
            console.log('You lost!');
            blackjackGame['loss']++;

        } else if((BOT['score']< 16) || (BOT['score']>21)) {
            console.log('You drew!');
            blackjackGame['draw']++;

        }
    }
    console.log('Winner is ',winner);
    return winner;
    }

function showWinner() {
    if(blackjackGame['turnisover']===false){
    let winner = computeWinner();
    console.log(winner);
    if(winner=== YOU) {
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    } else if (winner=== BOT) {
        message = "You lost!";
        messageColor = 'red';
        lostSound.play();
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    } else {
        message = 'You drew!';
        messageColor = 'cyan';
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    }
document.querySelector('#win-score').textContent=blackjackGame['win'];
document.querySelector('#loss-score').textContent=blackjackGame['loss'];
document.querySelector('#draw-score').textContent=blackjackGame['draw'];

}
}











