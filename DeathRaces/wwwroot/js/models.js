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
    }

    intervals() {
        this.run_car = setInterval(() => {
            if (this.is_run_top_or_down) {
                switch (this.top_or_down) {
                    case 1:
                        this.V += this.a

                        if (this.V >= this.max_V)
                            this.V = this.max_V

                        this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                        this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                        this.y -= this.Vh
                        this.x += this.Vw

                        this.el.style.left = `${this.x}px`
                        this.el.style.top = `${this.y}px`

                        break

                    case 2:
                        this.V -= this.a

                        if (this.V <= -this.max_V)
                            this.V = -this.max_V

                        this.Vh = -this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                        this.Vw = -this.V * Math.cos((90 - this.degrees) * Math.PI / 180)
                        this.y += this.Vh
                        this.x -= this.Vw

                        this.el.style.left = `${this.x}px`
                        this.el.style.top = `${this.y}px`
                        break
                }
            }


            if (this.is_run_left_or_right && this.is_run_top_or_down || this.is_run_left_or_right && this.V != 0) {
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
                    this.direction_breaking(1)
                }
                else {
                    this.direction_breaking(-1)
                }
            }

        }, fps)

        this.run_bullet = setInterval(() => {
            let bullets = document.querySelectorAll('.bullet')
            bullets.forEach((el) => {
                let rad = el.getAttribute('rad')
                let Vh = bullet.V * Math.sin(rad)
                let Vw = bullet.V * Math.cos(rad)

                let top = Number(el.style.top.slice(0, el.style.top.length - 2))
                let left = Number(el.style.left.slice(0, el.style.left.length - 2))

                //FIXME
                if (top >= 850 - bullet.length || top <= bullet.length || left <= bullet.width || left >= 900 - bullet.width)
                    el.parentNode.removeChild(el)

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

                if (this.degrees >= 360)
                    this.degrees -= 360
                else if (this.degrees <= 0)
                    this.degrees += 360

                this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                this.el.style.transform = `rotate(${this.degrees}deg)`
                break

            case 2:
                this.degrees += coeff * this.speed_degree

                if (this.degrees >= 360)
                    this.degrees -= 360
                else if (this.degrees <= 0)
                    this.degrees += 360

                this.Vh = this.V * Math.sin((90 - this.degrees) * Math.PI / 180)
                this.Vw = this.V * Math.cos((90 - this.degrees) * Math.PI / 180)

                this.el.style.transform = `rotate(${this.degrees}deg)`
                break
        }
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