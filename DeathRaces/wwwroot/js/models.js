class Car
{
    constructor(length, width, degrees, x, y, max_V, speed_degree, a)
    {
        this.length = length
        this.width = width
        this.degrees = degrees
        this.x = x
        this.y = y
        this.max_V = max_V
        this.V = 0
        this.Vh = this.V * Math.sin((90-degrees)*Math.PI/180)
        this.Vw = this.V * Math.cos((90-degrees)*Math.PI/180)
        this.speed_degree = speed_degree  
        this.a = a
        this.top_or_down = 1
        this.left_or_right = 1
        this.el = false
        this.is_run_top_or_down = false
        this.is_run_left_or_right = false
    }
}

class Bullet
{
    constructor(length, width, speed)
    {
        this.length = length
        this.width = width
        this.V = speed
    }
}

class Interval
{
    constructor()
    {
        this.is_run_top_or_down = false
        this.is_run_left_or_right = false
        this.bullet_is_run = false
    }

    intervals()
    {
        this.run_car = setInterval(()=>{
            if(car.is_run_top_or_down)
            {
                switch(car.top_or_down)
                {
                    case 1:
                        car.V += car.a

                        if(car.V >= car.max_V) 
                            car.V = car.max_V

                        car.Vh = car.V * Math.sin((90 - car.degrees)*Math.PI/180)
                        car.Vw = car.V * Math.cos((90 - car.degrees)*Math.PI/180)

                        car.y -= car.Vh
                        car.x += car.Vw

                        car.el.style.left = `${car.x}px`
                        car.el.style.top = `${car.y}px`

                        break

                    case 2: 
                        car.V -= car.a

                        if(car.V <= -car.max_V) 
                            car.V = -car.max_V

                        car.Vh = -car.V * Math.sin((90 - car.degrees)*Math.PI/180)
                        car.Vw = -car.V * Math.cos((90 - car.degrees)*Math.PI/180)
                        car.y += car.Vh
                        car.x -= car.Vw

                        car.el.style.left = `${car.x}px`
                        car.el.style.top = `${car.y}px`
                        break
                }
            }

            
            if(car.is_run_left_or_right && car.is_run_top_or_down || car.is_run_left_or_right && car.V != 0)
            {
                switch(car.top_or_down)
                {
                    case 1:
                        this.direction(1)
                        break

                    case 2:
                        this.direction(-1)
                        break
                }
            }

            if(!car.is_run_top_or_down)
            {
                if(car.V > 0)
                {
                    this.direction_breaking(1)
                }
                else
                {
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
                if(top >= 850 - bullet.length || top <= bullet.length || left <= bullet.width || left >= 900 - bullet.width)
                    el.parentNode.removeChild(el)

                el.style.top = top - Vh + 'px'
                el.style.left = left + Vw + 'px'

                
            })
        }, fps)
    }

    direction_breaking(coeff)
    {
        switch(car.left_or_right)
        {
            case 1:
                car.V = (coeff) * car.V - car.a

                if(car.V <= 0)
                    car.V = 0

                car.Vh = car.V * Math.sin((90 - car.degrees)*Math.PI/180)
                car.Vw = car.V * Math.cos((90 - car.degrees)*Math.PI/180)

                car.y = (-coeff)*car.Vh + car.y
                car.x += (coeff)*car.Vw

                car.V *= coeff

                car.el.style.left = `${car.x}px`
                car.el.style.top = `${car.y}px`

                break

            case 2:
                car.V = (coeff) * car.V - car.a

                if(car.V <= 0)
                    car.V = 0

                car.Vh = car.V * Math.sin((90 - car.degrees)*Math.PI/180)
                car.Vw = car.V * Math.cos((90 - car.degrees)*Math.PI/180)

                car.y = (-coeff)*car.Vh + car.y
                car.x = coeff*car.Vw + car.x

                car.V *= coeff

                car.el.style.left = `${car.x}px`
                car.el.style.top = `${car.y}px`

                break
        }
    }

    direction(coeff)
    {
        switch(car.left_or_right)
        {
            case 1:
                car.degrees += (-coeff) * car.speed_degree

                if(car.degrees >= 360)
                    car.degrees -= 360
                else if(car.degrees <= 0)
                    car.degrees += 360

                car.Vh = car.V * Math.sin((90 - car.degrees)*Math.PI/180)
                car.Vw = car.V * Math.cos((90 - car.degrees)*Math.PI/180)

                car.el.style.transform = `rotate(${car.degrees}deg)`
                break

            case 2:
                car.degrees += coeff * car.speed_degree

                if(car.degrees >= 360)
                    car.degrees -= 360
                 else if(car.degrees <= 0)
                    car.degrees += 360

                car.Vh = car.V * Math.sin((90 - car.degrees)*Math.PI/180)
                car.Vw = car.V * Math.cos((90 - car.degrees)*Math.PI/180)

                car.el.style.transform = `rotate(${car.degrees}deg)`
                break
        }
    }
}