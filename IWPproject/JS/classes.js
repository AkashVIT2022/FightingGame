class Sprite{
    constructor({position, imageSrc, scale=1, framesMax, offset={x:0,y:0}}){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    }

    draw(){
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height, 
            this.position.x-this.offset.x,
            this.position.y-this.offset.y, 
            (this.image.width/this.framesMax)*this.scale, 
            this.image.height*this.scale
            )
    }

    animateFrame(){
        this.framesElapsed++;
        if (this.framesElapsed%this.framesHold==0){
            if (this.frameCurrent<this.framesMax-1){
                this.frameCurrent++;
            } else {
                this.frameCurrent = 0;
            }
        }
    }

    update(){
        this.draw()
        this.animateFrame();
    }
}

class Fighter extends Sprite{
    constructor({position, velocity, color='red', imageSrc, scale=1, framesMax, offset={x:0,y:0}, sprites,attackBox={ offset: {}, width: undefined, height: undefined }}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset            
        })
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.color = color;
        this.isAttacking
        this.health=100
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    update(){
        this.draw()
        if (!this.dead){this.animateFrame();}
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // draw the attack boxes

        // c.fillRect(this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height-96){
            this.velocity.y=0
            this.position.y=330
        }else{
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttacking = true
        this.switchSprite('attack')
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }

    takeHit1(){
        this.health-=20
        this.switchSprite('takehit1')

        if (this.health<=0){
            this.switchSprite('death')
        } else {
            this.switchSprite('takehit1')
        }
    }

    takeHit2(){
        this.health-=30
        this.switchSprite('takehit2')

        if (this.health<=0){
            this.switchSprite('death')
        } else {
            this.switchSprite('takehit2')
        }
    }

    switchSprite(sprite){
        if (this.image==this.sprites.death.image){
            if (this.frameCurrent==this.sprites.death.framesMax-1){
                this.dead=true;
                return;
            }
        }

        if (this.image==this.sprites.attack.image && this.frameCurrent<this.sprites.attack.framesMax-1) return

        if (this.image==this.sprites.takehit.image && this.frameCurrent<this.sprites.takehit.framesMax-1) return

        switch (sprite){
            case 'idle':
                if (this.image!=this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.frameCurrent = 0;
            }
                break;
            case 'run':
                if (this.image!=this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image!=this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'jumpdown':
                if (this.image!=this.sprites.jumpdown.image){
                    this.image = this.sprites.jumpdown.image
                    this.framesMax = this.sprites.jumpdown.framesMax;
                    this.frameCurrent = 0;
                    }
                break;
            case 'attack':
                if (this.image!=this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax;
                    this.frameCurrent = 0;
                    }
                break;
            case 'takehit':
                if (this.image!=this.sprites.takehit.image){
                    this.image = this.sprites.takehit.image
                    this.framesMax = this.sprites.takehit.framesMax;
                    this.frameCurrent = 0;
                    }
                break;
            case 'death':
                if (this.image!=this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax;
                    this.frameCurrent = 0;
                    }
                break;
        }
    }
}