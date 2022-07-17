// JavaScript for a simple Snake Game with HTML Canvas

// Canvas Initializations
const canvas = document.getElementById("game")
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth * 0.9
canvas.height = window.innerHeight * 0.75

// Game Settings
const speed = 10
const tileCount = 20
const tileSize = canvas.width / tileCount - 2

// -------------- Classes ---------------

// Snake
class Snake {
    constructor() {
        this.headX = 10
        this.headY = 10
    }

    update() {
        ctx.fillStyle = 'cyan'
        ctx.fillRect(this.headX*tileCount,
            this.headY*tileCount,
            tileCount,
            tileCount)
    }
}

const snake = new Snake()

// Game loop
function main(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    snake.update()
    setTimeout(main, 1000 / speed)
}

main()
