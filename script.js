const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const imgWidth = 300;
const imgHeight = 150;

var x = 3;
var y = 1;
var w = imgWidth;
var h = imgHeight;

var W = canvas.width;
var H = canvas.height;

console.log(W);
console.log(H);


function gcd(a,b) {
    var temp;
    if(a < 0) {a = -a;};
    if(b < 0) {b = -b;};
    if(b > a) {temp = a; a = b; b = temp;};
    while (true) {
     a %= b;
     if(a == 0) {return b;};
     b %= a;
     if(b == 0) {return a;};
    };
    return b;
}
function lcm(a,b) {
    return Math.abs(a*b)/gcd(a,b);
}

var W0 = W - w;
var H0 = H - h;


console.log('W0 ' + W0);
console.log('H0 ' + H0);
console.log('gcd ' + gcd(W0, H0));
console.log('lcm w h ' + lcm(W0, H0));

if (Math.abs(x-y) % gcd(W0, H0) == 0) {
    // corners will be reached
    if ((Math.abs(x-y) / gcd(W0, H0)) % 2 == 0) {
        console.log((lcm(W0,H0)/H0) % 2 == 0 ? 'T' : 'B');
        console.log((lcm(W0,H0)/W0) % 2 == 0 ? 'L' : 'R');

        console.log('T');
        console.log('L');
        console.log('f');

    } else {
        console.log((lcm(W0,H0)/H0) % 2 != 0 ? 'T' : 'B');
        console.log((lcm(W0,H0)/W0) % 2 != 0 ? 'L' : 'R');

        console.log('B');
        console.log('R');
    }
} else {
    console.log("No corner!");
}






const particlesArray = [];

let colors = [
	"rgb(0, 0, 255)","rgb(0, 255, 0)","rgb(255, 0, 0)","rgb(0, 0, 0)",
	"rgb(255, 255, 255)","rgb(255, 0, 255)","rgb(225, 225, 225)",
	"rgb(222, 0, 255)","rgb(255, 255, 0)","rgb(125, 0, 0)","rgb(0, 125, 125)",
	"rgb(125, 0, 125)","rgb(0, 125, 0)","rgb(0, 0, 125)"
]

let i = 1;
let svgColor = 'rgb(0, 0, 255)';
let svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.465 15.465"> <path style="fill:${svgColor};" d="M7.4,8.959c-4.132,0-7.4,0.55-7.4,1.227c0,0.678,3.268,1.227,7.4,1.227s7.543-0.549,7.543-1.227 C14.944,9.508,11.533,8.959,7.4,8.959z M7.263,10.51c-0.957,0-1.733-0.237-1.733-0.53s0.776-0.53,1.733-0.53 s1.732,0.237,1.732,0.53S8.219,10.51,7.263,10.51z M13.319,4.052H9.701L7.769,6.291l-0.92-2.208H1.145L0.933,5.045h2.269 c0,0,1.037-0.136,1.071,0.694c0,1.438-2.376,1.316-2.376,1.316l0.444-1.5H0.869L0.194,7.988h2.668c0,0,2.821-0.25,2.821-2.218 c0,0,0.114-0.574,0.066-0.827L7.124,8.62l3.435-3.565h2.606c0,0,0.798,0.068,0.798,0.685c0,1.438-2.359,1.288-2.359,1.288 l0.365-1.472h-1.287L9.946,7.989h2.453c0,0,3.066-0.19,3.066-2.279C15.465,5.709,15.404,4.052,13.319,4.052z"></path> </svg>';
let svgStringTemp = svgString.replace('${svgColor}', svgColor);
let img = new Image();
let svgBlob = new Blob([svgStringTemp], { type: 'image/svg+xml;charset=utf-8' });
let url = URL.createObjectURL(svgBlob);
img.src = url;
img.onload = animate();


class particle
{
    constructor()
    {
        this.x = 3;
        this.y = 1;
        this.speedX = 5;
        this.speedY = 5;
        this.xC = 0;
        this.yC = 0;
        this.hitX;
        this.hitY;
    }

    update()
    {
        this.xC = 0;
        this.yC = 0;

        this.x += this.speedX;
        this.y += this.speedY;


        if (this.x <= 0 || this.x + imgWidth>= canvas.width) {
            this.speedX = -this.speedX; // Reverse direction
            this.xC = 1;
        }

        if (this.y <= 0 || this.y + imgHeight>= canvas.height) {
            this.speedY = -this.speedY; // Reverse direction
            this.yC = 1;
            if(this.xC)
            {
                this.yC = 0;
                this.y += this.speedY;
            }
        }

        if(this.xC && this.yC) 
        {
            // console.log('corner!!!!', this.x, this.y);

            svgColor = colors [i];
            (i == colors.length)? i = 0 : i++;
        }
        else if (this.xC || this.yC) {
            // console.log('edge', this.x, this.y);

            svgColor = colors [i];
            (i == colors.length)? i = 0 : i++;
        }

        if (this.x <= 0 && this.y <= 0) {
            console.log('TOP LEFT');
            console.log(this.x);
            console.log(this.y);
        } else if (this.x <= 0 && this.y + imgHeight >= canvas.height) {
            console.log('BOTTOM LEFT');
            console.log(this.x);
            console.log(this.y);
        } else if (this.x + imgWidth >= canvas.width && this.y <= 0) {
            console.log('TOP RIGHT');
            console.log(this.x);
            console.log(this.y);
        } else if (this.x + imgWidth >= canvas.width && this.y + imgHeight >= canvas.height) {
            console.log('BOTTOM RIGHT');
            console.log(this.x);
            console.log(this.y);
        }
    }

    draw()
    {
        svgStringTemp = svgString.replace('${svgColor}', svgColor);
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStringTemp);
        
        ctx.drawImage(img, this.x, this.y, imgWidth, imgHeight);
    }
}


function init()
{
    particlesArray.push(new particle());
}

init();

function handleParticles()
{
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}