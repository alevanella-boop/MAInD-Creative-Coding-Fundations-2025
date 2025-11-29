const canvas = document.getElementById('myCanvas');

//declaration of the context ctx
const ctx = canvas.getContext ('2d');


//define the starting point of the rectangle

const width = canvas.innerWidth;
const height = canvas.innerHeight;

canvas.width = width;
canvas.height = height;

//console.log(width, height)

const size = 200;


function draw(){
    console.log('ciao')

    ctx.clearRect(0, 0, width, height)
    
    circlePos += 0,5;

    ctx.fillStyle = 'black';
    ctx.font = '40px Arial';
    ctx.fillText('Ciao', 100, 100);


    ctx.save();
    ctx.translate(300, 500);


        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, size, size);


        ctx.fillStyle = 'orange';
        ctx.arc(size/2, size/2, 50, 0, Math.PI  *2)
        ctx.fill();

    ctx.restore();

    requestAnimationFrame(draw);

}

draw()

