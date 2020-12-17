function init()
{
    gameZone.innerHTML += `<div class="car" style="left: ${car.x}px; top: ${car.y}px; transform: rotate(${car.degrees}deg);"></div>`
    car.el = document.querySelector('.car')
}

function game()
{
    init()
    movement()
    car.intervals()
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

let users = []

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/game")
    .build()



hubConnection.on('Notify', function (connectionId, status) {

    if (status == 1)
    {
        let enemyCar = new Car(length, width, degrees, 500, 500, max_V, speed_degrees, a)
        let user = new User(enemyCar, connectionId)
  
        gameZone.innerHTML += `<div class="car" id='${connectionId}' style="left: ${500}px; top: ${500}px; transform: rotate(${0}deg);"></div>`
        user.car.el = document.getElementById(connectionId)

        user.car.V = 2

        user.car.intervals()
        users.push(user)

        car.el = document.querySelector('.car')
    }
    else
    {
        let user = users.find((element) => {
            if (element.connectionId = connectionId)
                return true
        })  
        delete users[users.indexOf(user)]
        let element = document.getElementById(connectionId)
        element.parentNode.removeChild(element)
    }
});

hubConnection.on('Receive', function (key, eventType, connectionId) {

    console.log(connectionId)
    
    let user = users.find((element) => {
        if (element.connectionId = connectionId)
            return true
    })

    switch (eventType)
    {
        case "keydown":
            switch (key) {
                case "32":
                    gameZone.innerHTML += `<div class="bullet" style="left: ${car.x + bullet.width / 2}px; top: ${car.y + car.length / 2}px;" rad='${(90 - car.degrees) * Math.PI / 180}'></div>`
                    break

                case "38":
                    user.car.is_run_top_or_down = true
                    user.car.top_or_down = 1
                    user.car.el = document.getElementById(connectionId)
                    break

                case "40":
                    user.car.is_run_top_or_down = true
                    user.car.top_or_down = 2
                    user.car.el = document.getElementById(connectionId)
                    break

                case "39":
                    user.car.is_run_left_or_right = true
                    user.car.left_or_right = 2
                    user.car.el = document.getElementById(connectionId)
                    break

                case "37":
                    user.car.is_run_left_or_right = true
                    user.car.left_or_right = 1
                    user.car.el = document.getElementById(connectionId)
                    break
            }
            break

        case "keyup":
            switch (key) {
                case "38":
                    user.car.is_run_top_or_down = false;
                    break

                case "40":
                    user.car.is_run_top_or_down = false;
                    break

                case "39":
                    user.car.is_run_left_or_right = false;
                    break

                case "37":
                    user.car.is_run_left_or_right = false;
                    break
            }
            break
    }
})

hubConnection.start()
game()



