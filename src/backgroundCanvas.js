const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function init(){
    window.requestAnimationFrame(draw)
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
    ctx.fill();
}

init()