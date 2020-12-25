function init()
{
    gameZone.innerHTML += `<div class="main-car" style="left: ${car.x}px; top: ${car.y}px; transform: rotate(${car.degrees}deg);"><span class="nav-link waves-effect" style="color:red;">You</span></div>`
    car.el = document.querySelector('.main-car')
}

function game()
{
    init()
    movement()
    car.intervals()
}

function startHub()
{
    hubConnection.start()

    setTimeout(game, 100)
}

async function verify() {
    let response = await fetch("users/verifyid", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({id: paramValue })
    });
    if (response.ok === true) {
        const data = await response.json()
        client = data.client
        token = data.access_token
        let userName = document.getElementById("userName")
        userName.textContent = client.userName
        startHub()
    }
    else {
        document.location.href = "login.html"
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

let gameZone = document.querySelector('.game-zone')

let fps = 1000 / 60

let is_conected = true

let length = 75
let width = 35
let degrees = 0
let x = randomInteger(10, 400)
let y = randomInteger(15, 400)
let max_V = 5
let speed_degrees = 1
let a = 0.03

let car = new Car(length, width, degrees, x, y, max_V, speed_degrees, a)

let length_bullet = 16
let width_bullet = 16
let speed = 10
let damage = 20

let bullet = new Bullet(length_bullet, width_bullet, speed, damage)

let users = []


let token = ""
let client
const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/game", { accessTokenFactory: () => token })
    .build()

hubConnection.on('Notify', function (connectionId, status) {

    if (status == 1) 
        hubConnection.invoke('Send', { 'connectionId': "", 'x': car.x, 'y': car.y, 'degrees': car.degrees, 'isShot': false, 'userName': client.userName })    
    else {
        let user = users.find((element) => {
            if (element.connectionId = connectionId)
                return true
        })

        let mass = []
        for (let i = 0; i < users.length; i++) {
            if (i != users.indexOf(user))
                mass.push(users[i])
        }

        users.length = 0
        for (let i = 0; i < mass.length; i++)
            users.push(mass[i])

        let element = document.getElementById(connectionId)
        element.parentNode.removeChild(element)
    }
});

hubConnection.on('Receive', function (enemy) {

    let user = users.find((element) => {
        if (element.connectionId = enemy.connectionId)
            return true
    })

    if (user === undefined) {
        let enemyCar = new Car(length, width, enemy.degrees, enemy.x, enemy.y, max_V, speed_degrees, a)
        let user = new User(enemyCar, enemy.connectionId)

        gameZone.innerHTML += `<div class="car" id='${enemy.connectionId}' style="left: ${enemy.x}px; top: ${enemy.y}px; transform: rotate(${enemy.degrees}deg);"><span class="nav-link waves-effect" style="color:white;">${enemy.userName}</span></div>`
        user.car.el = document.getElementById(enemy.connectionId)
        users.push(user)
        hubConnection.invoke('Send', { 'connectionId': "", 'x': user.car.x, 'y': user.car.y, 'degrees': user.car.degrees, 'isShot': false, 'userName': client.userName })
    }
    else if (enemy.isShot)
        gameZone.innerHTML += `<div class="bullet" style="left: ${enemy.x + bullet.width / 2}px; top: ${enemy.y + car.length / 2}px;" rad='${(90 - enemy.degrees) * Math.PI / 180}'></div>`

    if (enemy.isHit) {
        user.car.el.parentNode.removeChild(user.car.el)
        let obj = document.getElementById('score')
        let score = parseInt(obj.textContent)
        obj.textContent = score + 1
    }
    else {     
        user.car.el = document.getElementById(enemy.connectionId)
        if (user.car.el == undefined)
            gameZone.innerHTML += `<div class="car" id='${enemy.connectionId}' style="left: ${enemy.x + bullet.width / 2}px; top: ${enemy.y + car.length / 2}px;" rad='${(90 - enemy.degrees) * Math.PI / 180}'><span class="nav-link waves-effect" style="color:white;">${enemy.userName}</span></div>`
        else {
            user.car.el.style.left = `${enemy.x}px`
            user.car.el.style.top = `${enemy.y}px`
            user.car.el.style.transform = `rotate(${enemy.degrees}deg)`
        }
    }
    if (enemy.img)
        user.car.el.style.backgroundImage = "url('../sprites/car(1).png')"

    if (!car.is_hits)
        car.el = document.querySelector('.main-car')
})


if (paramValue != "") {
    verify()
}
else {
    document.location.href = "login.html"
}

