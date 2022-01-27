const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined
}

const mouseRadius = 50;
const maxRadius = 80

const colors = [
    '#190204',
    '#FF8976',
    '#CB4E47',
    '#FFCBA4',
]

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

function Circle(x, y, dx, dy, radius, fillColor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.fillStyle = fillColor;
    }

    this.update = () => {
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + 30 > window.innerWidth || this.x - 30 < 0) {
            this.dx = -this.dx
        }

        if(this.y + 30 > window.innerHeight || this.y - 30 < 0) {
            this.dy = -this.dy
        }

        if(mouse.x - this.x < mouseRadius && mouse.x - this.x > - mouseRadius
            && mouse.y - this.y < mouseRadius && mouse.y - this.y > - mouseRadius) {
            if(this.radius < maxRadius) {
                this.radius += 4;
            }
        }
        else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }
    }
}



const circleArray = [];

for(let i = 0; i < 1000; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let dx = (Math.random() * -5) + 3;
    let dy = (Math.random() * -5) + 3;
    let radius = Math.floor(Math.random() * 30);
    let fillColor = colors[Math.floor((Math.random() * 4 ))];
    circleArray.push(new Circle(x, y, dx,dy,radius, fillColor))
}

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (const circle of circleArray) {
        circle.draw();
        circle.update()
    }

}

animate();

