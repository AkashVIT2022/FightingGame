function rectangularCollision({rectangle1, rectangle2}){
    return(
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x
        && player.attackBox.position.x <= enemy.position.x + enemy.width
        &&player.attackBox.position.y + player.attackBox.height >= enemy.position.y
        && player.attackBox.position.y <= enemy.position.y + enemy.height
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shopimg.update()
    player.update()
    enemy.update()
    player.velocity.x=0;
    enemy.velocity.x=0;

    //player movement
    
    if (keys.a.pressed && player.lastKey=='a'){
        player.velocity.x=-5
        player.switchSprite('run');
    } else if(keys.d.pressed && player.lastKey=='d'){
        player.velocity.x=5;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    }

    if (player.velocity.y<0){
        player.switchSprite('jump');
    }

    if (player.velocity.y>0){
        player.switchSprite('jumpdown');
    }
    

    //enemy movement

    if (keys.ArrowLeft.pressed && enemy.lastKey=='ArrowLeft'){
        enemy.velocity.x=-5;
        enemy.switchSprite('run');
    } else if(keys.ArrowRight.pressed && enemy.lastKey=='ArrowRight'){
        enemy.velocity.x=5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    }

    if (enemy.velocity.y<0){
        enemy.switchSprite('jump');
    }

    if (enemy.velocity.y>0){
        enemy.switchSprite('jumpdown');
    }

    //collision detection

    if (rectangularCollision({rectangle1:player,rectangle2:enemy})
        &&player.isAttacking && player.frameCurrent==4){
            enemy.takeHit2()
            player.isAttacking = false;
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
            }

    //if player misses
    
    if (player.isAttacking && player.frameCurrent==4){
        player.isAttacking=false
    }

    if (rectangularCollision({rectangle1:enemy,rectangle2:player})
        &&enemy.isAttacking && player.frameCurrent==2){
            player.takeHit1()
            enemy.isAttacking = false;
            document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    //if enemy misses

    if (enemy.isAttacking && enemy.frameCurrent==2){
        enemy.isAttacking=false
    }

    //end game based on health

    if (enemy.health<=0||player.health<=0){
        determineWinner({player,enemy,timerId})
    }

}

function determineWinner({player,enemy,timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex';
    if (player.health==enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie';
    } else if (player.health>enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 wins';
    } else {
        document.querySelector('#displayText').innerHTML = 'Player 2 wins';
    }
}

let timer=60;
let timerId
function decreaseTimer(){
    if (timer>0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }
    if (timer==0){
        document.querySelector('#displayText').style.display = 'flex';
        determineWinner({player,enemy,timerId})
    }
}