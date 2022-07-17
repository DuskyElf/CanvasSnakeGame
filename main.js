// JavaScript for a simple Snake Game with HTML Canvas

// Canvas Initializations
const canvas = document.getElementById("game")
const ctx = canvas.getContext('2d')
const windowSize = Math.min(window.innerWidth, window.innerHeight)
canvas.width = windowSize * 0.85
canvas.height = windowSize * 0.85

// Game Settings
const speed = 5
const tileCount = 20
const tileSize = canvas.width / tileCount - 2

let foodPos = null

// -------------- Classes ---------------

// Snake
class Snake {
    constructor() {
        this.body = [
            {x: 10, y: 10}
        ]
        
        this.velocity = {x: 0, y: 0}
    }

    grow(){
        // Adding a Dummy Part to the snake
        // Which would get removed in the update
        // (Instead of the actual last part of the snake)
        snake.body.push({x: -1, y: -1})
    }

    update() {
        // Drawing the food
        ctx.fillStyle = '#FF8BA0'
        ctx.fillRect(
            foodPos.x * tileSize + 1,
            foodPos.y * tileSize + 1,
            tileSize, tileSize
        )

        // Drawing the Snake
        this.body.forEach((part, index) => {
            // Coloring the part based on if it's head or not
            if (index == 0) ctx.fillStyle = '#00ADB5'
            else ctx.fillStyle = '#393E46'

            // Drawing it
            ctx.fillRect(
                part.x * tileSize + 1,
                part.y * tileSize + 1,
                tileSize,tileSize
            )
        })

        // Moving the snake parts
        const newHeadPlace = {
            x: this.body[0].x + this.velocity.x,
            y: this.body[0].y + this.velocity.y
        }
        this.body.unshift(newHeadPlace)
        this.body.pop()
    }
}

const snake = new Snake()

function spawnFood(){
    // Setting Food's position to a random position
    const x = Math.floor(Math.random() * tileCount)
    const y = Math.floor(Math.random() * tileCount)

    foodPos = {x: x, y: y}
}

// Game loop
function main(){
    // Clearing the screen
    ctx.fillStyle = '#222831'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Drawing Everything
    snake.update()

    // Colision Detection
    // Checking for food
    if (snake.body[0].x == foodPos.x && snake.body[0].y == foodPos.y){
        snake.grow()
        spawnFood()
    }

    // Checking if the Snake died
    // Checking if the Snake hit the walls
    if  (
            snake.body[0].x < 0 ||
            snake.body[0].x > tileCount ||
            snake.body[0].y < 0 ||
            snake.body[0].y > tileCount
        ) speed = 0
    // Checking if the Snake hit itself
    snake.body.forEach((part, index) => {
        if (index != 0){
        if (snake.body[0].x == part.x && snake.body[0].y == part.y){
            speed = 0
            return
        }}
    })

    setTimeout(main, 1000 / speed)
}

// KeyBoard Events
addEventListener("keydown", event=>{
    if (event.key == 'w'){
        if (snake.velocity.y == 1) return
        snake.velocity = {x: 0, y: -1}
    }else if (event.key == 'a'){
        if (snake.velocity.x == 1) return
        snake.velocity = {x: -1, y: 0}
    }else if (event.key == 's'){
        if (snake.velocity.y == -1) return
        snake.velocity = {x: 0, y: 1}
    }else if (event.key == 'd'){
        if (snake.velocity.x == -1) return
        snake.velocity = {x: 1, y: 0}
    }
})

spawnFood()
main()
