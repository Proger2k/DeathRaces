class Car {
    constructor(length, width, degrees, x, y, max_V, speed_degree, a) {
        this.length = length
        this.width = width
        this.degrees = degrees
        this.x = x
        this.y = y
        this.max_V = max_V
        this.V = 0
        this.Vh = this.V * Math.sin((90 - degrees) * Math.PI / 180)
        this.Vw = this.V * Math.cos((90 - degrees) * Math.PI / 180)
        this.speed_degree = speed_degree
        this.a = a
        this.top_or_down = 1
        this.left_or_right = 1
        this.el = false
        this.is_run_top_or_down = false
        this.is_run_left_or_right = false
        this.bullet_is_run = false
        this.is_shot = false
        this.is_hits = false
    }

    intervals() {
        this.run_car = setInterval(() => {
            if (this.is_hits) {
                this.is_hits = false
                setTimeout(this.restart, 3000)
            }

            if (this.is_run_top_or_down) {
                switch (this.top_or_down) {
                    case 1:
                        this.V += this.a

                        if (this.V >= this.max_V)
                            this.V = this.max_V

                        this.is_barrier()
                        this.update_coordinates(1)

                        break

                    case 2:
                        this.V -= this.a

                        if (this.V <= -this.max_V)
                            this.V = -this.max_V

                        this.is_barrier()
                        this.update_coordinates(-1)

                        break
                }
            }

            if (this.is_run_left_or_right && this.is_run_top_or_down && this.V != 0 || this.is_run_left_or_right && this.V != 0) {
                switch (this.top_or_down) {
                    case 1:
                        this.direction(1)
                        break

                    case 2:
                        this.direction(-1)
                        break
                }
            }

            if (!this.is_run_top_or_down) {
                if (this.V > 0) {
                    this.is_barrier()
                    this.direction_breaking(1)
                }
                else {
                    this.is_barrier()
                    this.direction_breaking(-1)
                }
            }

            if (is_conected)
                hubConnection.invoke('Send', { 'connectionId': "", 'x': this.x, 'y': this.y, 'degrees': this.degrees, 'isShot': false, 'userName': client.userName, 'isHit': false })

        }, fps)

        this.run_bullet = setInterval(() => {
            let bullets = document.querySelectorAll('.bullet')
            bullets.forEach((el) => {  
                let rad = el.getAttribute('rad')
                let Vh = bullet.V * Math.sin(rad)
                let Vw = bullet.V * Math.cos(rad)

                let top = Number(el.style.top.slice(0, el.style.top.length - 2))
                let left = Number(el.style.left.slice(0, el.style.left.length - 2))

                if (top >= gameZone.getBoundingClientRect().bottom - bullet.length || top <= bullet.length || left <= bullet.width || left >= gameZone.getBoundingClientRect().right - bullet.width)
                    el.parentNode.removeChild(el)

                let is_main = el.getAttribute('main_bullet')
                if (is_main != "true" && this.is_hit(el)) {
                    this.el.parentNode.removeChild(this.el)
                    el.parentNode.removeChild(el)
                    is_conected = false
                    this.is_hits = true
                    hubConnection.invoke('Send', { 'connectionId': "", 'x': this.x, 'y': this.y, 'degrees': this.degrees, 'isShot': false, 'userName': client.userName, 'isHit': true })
                }

                el.style.top = top - Vh + 'px'
                el.style.left = left + Vw + 'px'

            })
        }, fps)

    }

    direction_breaking(coeff) {
        switch (this.left_or_right) {
            case 1:
                this.V = (coeff) * this.V - this.a

                if (this.V <= 0)
                    this.V = 0

                this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                this.y = (-coeff) * this.Vh + this.y
                this.x += (coeff) * this.Vw

                this.V *= coeff

                this.el.style.left = `${this.x}px`
                this.el.style.top = `${this.y}px`

                break

            case 2:
                this.V = (coeff) * this.V - this.a

                if (this.V <= 0)
                    this.V = 0

                this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                this.y = (-coeff) * this.Vh + this.y
                this.x = coeff * this.Vw + this.x

                this.V *= coeff

                this.el.style.left = `${this.x}px`
                this.el.style.top = `${this.y}px`

                break
        }
    }

    direction(coeff) {
        switch (this.left_or_right) {
            case 1:
                this.degrees += (-coeff) * this.speed_degree

                this.update_degrees() 
                break

            case 2:
                this.degrees += coeff * this.speed_degree

                this.update_degrees()   
                break
        }
    }

    update_coordinates(coeff) {
        this.Vh = coeff * this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
        this.Vw = coeff * this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

        this.y = this.y - coeff * this.Vh
        this.x = this.x + coeff * this.Vw

        this.el.style.left = `${this.x}px`
        this.el.style.top = `${this.y}px`
    }

    update_degrees() {
        if (this.degrees >= 360)
            this.degrees -= 360
        else if (this.degrees <= 0)
            this.degrees += 360

        this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
        this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

        this.el.style.transform = `rotate(${this.degrees}deg)`
    }

    is_barrier() {
        if (car.y >= gameZone.getBoundingClientRect().bottom - car.length * 3 + 30 || car.y <= 15 || car.x <= 15 || car.x >= gameZone.getBoundingClientRect().right - car.length) {
            if (this.is_run_top_or_down) {

                let x
                let y

                switch (this.top_or_down) {
                    case 1:
                        this.V += this.a

                        if (this.V >= this.max_V)
                            this.V = this.max_V

                        this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                        this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                        x = this.x
                        y = this.y

                        this.y -= this.Vh
                        this.x += this.Vw

                        if (this.is_outside_the_map(x, y)) {
                            this.x = x
                            this.y = y
                            this.V = 0
                        }

                        break

                    case 2:
                        this.V -= this.a

                        if (this.V <= -this.max_V)
                            this.V = -this.max_V

                        this.Vh = -this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                        this.Vw = -this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                        x = this.x
                        y = this.y

                        this.y += this.Vh
                        this.x -= this.Vw

                        if (this.is_outside_the_map(x, y)) {
                            this.x = x
                            this.y = y
                            this.V = 0
                        }

                        break
                }
            }

            if (!this.is_run_top_or_down) {
                if (this.V > 0) {
                    this.V = this.V - this.a

                    if (this.V <= 0)
                        this.V = 0

                    this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                    this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                    x = this.x
                    y = this.y

                    this.y -= this.Vh
                    this.x += this.Vw

                    if (this.is_outside_the_map(x, y)) {
                        this.x = x
                        this.y = y
                        this.V = 0
                    }
                }
                else {
                    this.V = -this.V - this.a

                    if (this.V <= 0)
                        this.V = 0

                    this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                    this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                    x = this.x
                    y = this.y

                    this.y += this.y
                    this.x -= this.x

                    this.V *= -1

                    if (this.is_outside_the_map(x, y)) {
                        this.x = x
                        this.y = y
                        this.V = 0
                    }
                }
            }
        }
    }

    is_outside_the_map(x, y) {
        if (car.y >= gameZone.getBoundingClientRect().bottom - car.length * 3 - 30 && y >= car.y) 
            return false

        else if (car.y <= 20 && y <= car.y) 
            return false

        if (car.x <= 30 && x < car.x)
            return false

        else if (car.x >= gameZone.getBoundingClientRect().right - 2*car.length && x >= car.x)
            return false

        return true
    }

    is_hit(el) {
        if (el.getBoundingClientRect().bottom > this.el.getBoundingClientRect().top &&
            el.getBoundingClientRect().right > this.el.getBoundingClientRect().left &&
            el.getBoundingClientRect().left < this.el.getBoundingClientRect().right &&
            el.getBoundingClientRect().top < this.el.getBoundingClientRect().bottom)
            return true
        else
            return false
    }

    restart() {
        this.x = randomInteger(10, 400)
        this.y = randomInteger(15, 400)
        gameZone.innerHTML += `<div class="main-car" style="left: ${this.x}px; top: ${this.y}px; transform: rotate(${this.degrees}deg);"><span class="nav-link waves-effect" style="color:red;">You</span></div>`
        car.el = document.querySelector('.main-car')
        is_conected = true
    }
}

class Bullet {
    constructor(length, width, speed) {
        this.length = length
        this.width = width
        this.V = speed
    }
}

class User
{
    constructor(car, connectionId)
    {
        this.car = car
        this.connectionId = connectionId
    }
}