var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.fillRect(0, 0, canvas.width, canvas.height);
class Parti {
    constructor(x, y, r, color) {
        this.path = new Path2D();
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
}
