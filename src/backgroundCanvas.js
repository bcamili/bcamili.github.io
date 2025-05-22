const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lowColor = 'rgba(57, 62, 70, 1)';
const midColor = 'rgba(148, 137, 121, 1)';
const highlight = 'rgba(223, 208, 184, 1)';

const pageContainer = document.getElementById("pageContainer")

window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    reset()
});

let lastScrollPosition = pageContainer.scrollTop

pageContainer.addEventListener("scroll", (e)=>{
    let scrollY = pageContainer.scrollTop
    let direction = lastScrollPosition - scrollY
    scrollCircles(direction)
    lastScrollPosition = scrollY
})

let circles = {
    "low": [],
    "mid": [],
    "high": []
}


let speed = .1

let circle = (pos, vel, rad) =>{
    let newCircle = {
        "radius": rad,
        "position": {
            "x": pos[0],
            "y": pos[1]
        },
        "velocity" : {
            "x": vel[0] * (speed + Math.random()/20),
            "y": vel[1] * (speed + Math.random()/20)
        },
        "color": Math.random() <(1/3) ? highlight : (Math.random() < 0.5 ? midColor : lowColor), 
        "randomLayer": Math.random(),
        "draw": (()=>{
                ctx.beginPath();
                ctx.arc(newCircle.position.x, newCircle.position.y, newCircle.radius, 0, Math.PI * 2);
                ctx.fillStyle = newCircle.color;
                ctx.fill();
            }),
        "update": (()=>{
            let newPosition = [newCircle.position.x + newCircle.velocity.x, newCircle.position.y + newCircle.velocity.y]
            if(newPosition[0]<0 || newPosition[0]>canvas.width){
                newCircle.velocity.x = -newCircle.velocity.x
            }
            if(newPosition[1]<0 || newPosition[1]>canvas.height){
                newCircle.velocity.y = -newCircle.velocity.y
            }
            newPosition = [newCircle.position.x + newCircle.velocity.x, newCircle.position.y + newCircle.velocity.y]
            
            newCircle.position.x = newPosition[0]
            newCircle.position.y = newPosition[1]
        }),
        "scrollCircle": ((direction)=>{
            if(newCircle.color == lowColor){
                direction = -0.1* direction * (1 + newCircle.randomLayer)
            }
            if(newCircle.color == midColor){
                direction = 0.1* direction * (1 + newCircle.randomLayer)
            }

            if(newCircle.color == highlight){
                direction = 0.3* direction * (1 + newCircle.randomLayer)
            }

            let newY = newCircle.position.y + direction
            if(newY>canvas.height){
                newY = newY - canvas.height
            }

            if(newY<0){
                newY = canvas.height - newY
            }

            newCircle.position.y = newY
        })
    }

    return newCircle
}



function init(){
    reset()
    window.requestAnimationFrame(draw)
}

function reset(){
    circles = {
        "low": [],
        "mid": [],
        "high": []
    }
    for(let i=0; i<Math.max(canvas.width, canvas.height);i++){
        let pos = [Math.random()*canvas.width, Math.random()*canvas.height]
        let vel = [(Math.random()-0.5)*2, (Math.random()-0.5)*2]
        let rad = Math.random()*10
        let newCircle = circle(pos, vel, rad)
        if(newCircle.color == highlight){
            circles["high"].push(newCircle)
        }
        if(newCircle.color == midColor){
            circles["mid"].push(newCircle)
        }
        if(newCircle.color == lowColor){
            circles["low"].push(newCircle)
        }
    }
}

function draw(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let circle of circles["low"]){
        circle.update()
        circle.draw()
    }

    for(let circle of circles["mid"]){
        circle.update()
        circle.draw()
    }

    for(let circle of circles["high"]){
        circle.update()
        circle.draw()
    }
    

    window.requestAnimationFrame(draw)
}

function scrollCircles(direction){
    for(let [shade, group] of Object.entries(circles)){
        for(let circle of group){
            circle.scrollCircle(direction)
        }
    }
}


init()