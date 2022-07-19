// JavaScript for a simple Snake Game with HTML Canvas

// Canvas Initializations
const canvas = document.getElementById("game")
const ctx = canvas.getContext('2d')
const scoreEle = document.getElementById("score")
const windowSize = Math.min(window.innerWidth, window.innerHeight)
canvas.width = windowSize * 0.85
canvas.height = windowSize * 0.85

// Game Settings
const speed = 10
const tileCount = 20
const tileSize = canvas.width / tileCount - 2

let foodPos = null
let score = 0
let running = true

// -------------- Classes ---------------

// Snake
class Snake {
    constructor() {
        this.body = [
            {x: 10, y: 10}
        ]
        
        this.velocity = {x: 0, y: 0}
        this.currentVelocity = {x: 0, y: 0}
    }

    grow() {
        // Adding a Dummy Part to the snake
        // Which would get removed in the update
        // (Instead of the actual last part of the snake)
        snake.body.push({x: -1, y: -1})
    }

    draw() {
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
    }

    update() {
        // Moving the snake parts
        const newHeadPlace = {
            x: this.body[0].x + this.velocity.x,
            y: this.body[0].y + this.velocity.y
        }
        this.currentVelocity = this.velocity
        this.body.unshift(newHeadPlace)
        this.body.pop()
    }
}

const friction = 0.98
// Particle Model
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        // Drawing the Particle
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.draw()
        // Moving the particle
        // And Making it interact with the friction
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.02
    }
}

const snake = new Snake()
const particles = []

function spawnFood(){
    // Setting Food's position to a random position
    const x = Math.floor(Math.random() * tileCount)
    const y = Math.floor(Math.random() * tileCount)

    foodPos = {x: x, y: y}
}

// GameState Loop
function main(){
    // Updating the Score
    if (snake.velocity.x!=0 || snake.velocity.y!=0) score += 1
    scoreEle.innerText = score

    // Snake Updates
    snake.update()

    // Colision Detection
    // Checking for food
    if (snake.body[0].x == foodPos.x && snake.body[0].y == foodPos.y){
        snake.grow()

        for(let i = 0; i < (Math.random() * (20 - 15) + 5); i++){
            particles.push(new Particle(
                (foodPos.x * tileSize) + tileSize / 2,
                (foodPos.y * tileSize) + tileSize / 2,
                Math.random() * 2,
                '#FF8BA0',
                {
                    x: (Math.random() - 0.5) * (Math.random() * 8),
                    y: (Math.random() - 0.5) * (Math.random() * 8)
                }
            ))
        }

        score += 500
        scoreEle.innerText = score
        spawnFood()
    }

    // Checking if the Snake died
    // Checking if the Snake hit the walls
    if  (
            snake.body[0].x < 0 ||
            snake.body[0].x > tileCount ||
            snake.body[0].y < 0 ||
            snake.body[0].y > tileCount
        ) running = false
    // Checking if the Snake hit itself
    snake.body.forEach((part, index) => {
        if (index != 0){
        if (snake.body[0].x == part.x && snake.body[0].y == part.y){
            running = false
            return
        }}
    })

    if (!running) return
    // Looping Logic - runs `speed` times a second
    setTimeout(main, 1000 / speed)
}

// Animation Loop
function animate(){
    // Clearing the screen
    ctx.fillStyle = '#222831'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Drawing the snake
    snake.draw()

    // Drawing the food
    ctx.fillStyle = '#FF8BA0'
    ctx.fillRect(
        foodPos.x * tileSize + 1,
        foodPos.y * tileSize + 1,
        tileSize, tileSize
    )

    // Updating Particles
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0){
            particles.splice(index, 1)
        }
        else {
            particle.update()
        }
    })
    
    if (!running) return
    // Looping Logic - runs indefinatly
    requestAnimationFrame(animate)
}

// KeyBoard Events
addEventListener("keydown", event=>{
    if (event.key == 'w'){
        if (snake.currentVelocity.y == 1) return
        snake.velocity = {x: 0, y: -1}
    }else if (event.key == 'a'){
        if (snake.currentVelocity.x == 1) return
        snake.velocity = {x: -1, y: 0}
    }else if (event.key == 's'){
        if (snake.currentVelocity.y == -1) return
        snake.velocity = {x: 0, y: 1}
    }else if (event.key == 'd'){
        if (snake.currentVelocity.x == -1) return
        snake.velocity = {x: 1, y: 0}
    }
})

spawnFood()
main()
animate()
