const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7;
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './img/backgroundreall.png',
    scale:1,
    framesMax:1
})

const shopimg = new Sprite({
    position:{
        x:600,
        y:183
    },
    imageSrc: './img/shop_anim.png',
    scale:2.75,
    framesMax:6
})



const player = new Fighter({
    position:{
    x:0,
    y:0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Sprite/Idle.png',
    framesMax:10,
    scale:2.5,
    offset:{
        x:12,
        y:7
    },
    sprites:{
        idle:{
            imageSrc:'./img/Sprite/Idle.png',
            framesMax:10
        },
        run:{
            imageSrc:'./img/Sprite/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./img/Sprite/GoingUp.png',
            framesMax:3
        },
        jumpdown:{
            imageSrc:'./img/Sprite/GoingDown.png',
            framesMax:3
        },
        attack:{
            imageSrc:'./img/Sprite/Attack1.png',
            framesMax:7
        },
        takehit:{
            imageSrc:'./img/Sprite/takehit.png',
            framesMax:3
        },
        death:{
            imageSrc:'./img/Sprite/Death.png',
            framesMax:11
        }
    },
    attackBox:{
        offset:{
            x:200,
            y:-20
        },
        width:100,
        height:80
    }
});

const enemy = new Fighter({
    color:'blue',
    position:{
    x:400,
    y:120
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: -50,
        y: 0
    },
    imageSrc: './img/Sprite2/Sprites/Idle.png',
    framesMax:8,
    scale:2.5,
    offset:{
        x:215,
        y:52
    },
    sprites:{
        idle:{
            imageSrc:'./img/Sprite2/Sprites/Idle.png',
            framesMax:8
        },
        run:{
            imageSrc:'./img/Sprite2/Sprites/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./img/Sprite2/Sprites/Jump.png',
            framesMax:2
        },
        jumpdown:{
            imageSrc:'./img/Sprite2/Sprites/Fall.png',
            framesMax:2
        },
        attack:{
            imageSrc:'./img/Sprite2/Sprites/Attack1.png',
            framesMax:4
        },
        takehit:{
            imageSrc:'./img/Sprite2/Sprites/takehit.png',
            framesMax:4
        },
        death:{
            imageSrc:'./img/Sprite2/Sprites/Death.png',
            framesMax:6
        }
    },
    attackBox:{
        offset:{
            x:-180,
            y:0
        },
        width:140,
        height:50
    }
});

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

decreaseTimer();

animate()
 
window.addEventListener('keydown', (event)=>{
    if (!player.dead){
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case ' ':
            player.attack();
            break;
    }}
    if (!enemy.dead){
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey='ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey='ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.attack();
            break;
    }}
})

window.addEventListener('keyup', (event)=>{
        switch(event.key){
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
})