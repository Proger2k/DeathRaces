function movement() {
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 32:
                shot()
                break
        }
    })


    // Top or down
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 38:
                is_conected = true
                car.is_run_top_or_down = true
                car.top_or_down = 1
                break

            case 40:
                car.is_run_top_or_down = true
                car.top_or_down = 2
                break
        }
    })

    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case 38:
                car.is_run_top_or_down = false;
                break

            case 40:
                car.is_run_top_or_down = false;
                break
        }
    })

    // Left or right
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 39:
                car.is_run_left_or_right = true
                car.left_or_right = 2
                break

            case 37:
                car.is_run_left_or_right = true
                car.left_or_right = 1
                break
        }
    })

    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case 39:
                car.is_run_left_or_right = false;
                break

            case 37:
                car.is_run_left_or_right = false;
                break
        }
    })
}

function shot() {
    hubConnection.invoke('Send', { 'connectionId': "", 'x': car.x, 'y': car.y, 'degrees': car.degrees, 'isShot': true, 'userName': client.userName })
    gameZone.innerHTML += `<div class="bullet" style="left: ${car.x + bullet.width / 2}px; top: ${car.y + car.length / 2}px;" rad='${(90 - car.degrees) * Math.PI / 180}'></div>`
    car.el = document.querySelector('.car')
}