const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let speed = .5


let circle = (pos, vel, rad) =>{
    let newCircle = {
        "radius": rad,
        "position": {
            "x": pos[0],
            "y": pos[1]
        },

        "velocity" : {
            "x": vel[0] * (speed + Math.random()*2),
            "y": vel[1] * (speed + Math.random()*2)
        },
        "draw": (()=>{
                ctx.beginPath();
                ctx.arc(newCircle.position.x, newCircle.position.y, newCircle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(223, 208, 184, 1)';
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
        })
    }

    return newCircle
}

let circles = []


function init(){
    for(let i=0; i<500;i++){
        let pos = [Math.random()*canvas.width, Math.random()*canvas.height]
        let vel = [(Math.random()-0.5)*2, (Math.random()-0.5)*2]
        let rad = Math.random()*10
        let newCircle = circle(pos, vel, rad)
        circles.push(newCircle)
    }
    window.requestAnimationFrame(draw)
}

function draw(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let circle of circles){
        circle.update()
        circle.draw()
    }

    window.requestAnimationFrame(draw)
}


init()