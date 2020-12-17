function movement() {
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 32:
                shot()
                hubConnection.invoke('Send', `${e.keyCode}`, "keydown")
                break
        }
    })

    // Top or down
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 38:
                car.is_run_top_or_down = true
                car.top_or_down = 1
                hubConnection.invoke('Send', `${e.keyCode}`, "keydown")
                car.el = document.querySelector('.car')
                break

            case 40:
                car.is_run_top_or_down = true
                car.top_or_down = 2
                hubConnection.invoke('Send', `${e.keyCode}`, "keydown")
                car.el = document.querySelector('.car')
                break
        }
    })

    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case 38:
                car.is_run_top_or_down = false;
                hubConnection.invoke('Send', `${e.keyCode}`, "keyup")
                car.el = document.querySelector('.car')
                break

            case 40:
                car.is_run_top_or_down = false;
                hubConnection.invoke('Send', `${e.keyCode}`, "keyup")
                car.el = document.querySelector('.car')
                break
        }
    })

    // Left or right
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 39:
                car.is_run_left_or_right = true
                car.left_or_right = 2
                hubConnection.invoke('Send', `${e.keyCode}`, "keydown")
                car.el = document.querySelector('.car')
                break

            case 37:
                car.is_run_left_or_right = true
                car.left_or_right = 1
                hubConnection.invoke('Send', `${e.keyCode}`, "keydown")
                car.el = document.querySelector('.car')
                break
        }
    })

    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case 39:
                car.is_run_left_or_right = false;
                hubConnection.invoke('Send', `${e.keyCode}`, "keyup")
                car.el = document.querySelector('.car')
                break

            case 37:
                car.is_run_left_or_right = false;
                hubConnection.invoke('Send', `${e.keyCode}`, "keyup")
                car.el = document.querySelector('.car')
                break
        }
    })
}

function shot() {
    gameZone.innerHTML += `<div class="bullet" style="left: ${car.x + bullet.width / 2}px; top: ${car.y + car.length / 2}px;" rad='${(90 - car.degrees) * Math.PI / 180}'></div>`
    car.el = document.querySelector('.car')
}