function init()
{
    gameZone.innerHTML += `<div class="car" style="left: ${car.x}px; top: ${car.y}px; transform: rotate(${car.degrees}deg);"></div>`
    car.el = document.querySelector('.car')
}

function game()
{
    init()
    movement()
    interval.intervals()
}

let gameZone = document.querySelector('.game-zone')

let fps = 1000 / 60

let length = 75
let width = 35
let degrees = 0
let x = 500
let y = 500
let max_V = 5
let speed_degrees = 1
let a = 0.03

let car = new Car(length, width, degrees, x, y, max_V, speed_degrees, a)

let length_bullet = 16
let width_bullet = 16
let speed = 5

let bullet = new Bullet(length_bullet, width_bullet, speed)
let interval = new Interval();

game()