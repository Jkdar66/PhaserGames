
export class Enemies extends Phaser.GameObjects.Container{

    children: Enemy[] = [];
    passedTime: Date = new Date();

    static CELL_SIZE = 100;
    static GRID_HEIGHT = 3000;
    static GRID_WIDTH = innerWidth;
    static START_X = 0;
    static START_Y = -Enemies.CELL_SIZE;
    grid: number[][] = [];
    gridDebug: Phaser.GameObjects.Grid;

    constructor(scene: Phaser.Scene) {
        super(scene);

        var column_nums = Math.floor(Enemies.GRID_WIDTH / Enemies.CELL_SIZE);
        var row_nums = Math.floor(Enemies.GRID_HEIGHT / Enemies.CELL_SIZE);

        Enemies.START_X = (Enemies.GRID_WIDTH - (column_nums * Enemies.CELL_SIZE)) /2;

        this.gridDebug = new Phaser.GameObjects.Grid(scene, 
            0, 0, 
            column_nums * Enemies.CELL_SIZE, row_nums * Enemies.CELL_SIZE,
            Enemies.CELL_SIZE, Enemies.CELL_SIZE
        );

        this.scene.tweens.add({

            targets: this.gridDebug,
            scaleX: 0.25,
            scaleY: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });

        this.gridDebug.outlineFillColor = 0xff00ff;
        this.gridDebug.showOutline = true;

        // this.scene.add.existing(this.gridDebug);
        this.add(this.gridDebug);

        for (let row = 0; row < row_nums; row++) {
            this.grid.push([]);
            for (let column = 0; column < column_nums; column++) {
                this.grid[row].push(0);
            }
        }
        this.createEnemies();
    }

    getAvailableCells(): {row: number, column: number}[] {
        var list: {row: number, column: number}[] = [];
        for (let row = 0; row < this.grid.length; row++) {
            var start = 0;
            if(row%2 == 1) { start = 1; }
            for (let column = start; column < this.grid[row].length; column+=2) {
                const cell = this.grid[row][column];
                if(cell == 0) {
                    list.push({row: row, column: column});
                }
            }
        }
        return list;
    }

    createEnemies() {
        var time = new Date().getTime() - this.passedTime.getTime();
        // if(time > 5000) {

            for (let i = 0; i < 100; i++) {
                var cells = this.getAvailableCells();
                
                if(cells.length == 0) { break; }

                const index = Math.floor(Math.random() * cells.length);
                const row = cells[index].row;
                const column = cells[index].column;

                this.grid[row][column] = 1;

                var x = (column * Enemies.CELL_SIZE) + Enemies.CELL_SIZE/2 + Enemies.START_X;
                var y = -((row * Enemies.CELL_SIZE) + Enemies.CELL_SIZE/2) + Enemies.START_Y;

                this.addEnemy(new Enemy(this.scene, x, y), row, column);
                
            }

            this.passedTime = new Date();
        // }
    }

    addEnemy(child: Enemy, row: number, column: number) {
        this.children.push(child);
        this.add(child);
        child.setGrid(row, column);
    }

    move() {
        for (let i = this.children.length - 1; i >= 0; i--) {
            const enemy = this.children[i];

            const outOfEdge = <number> this.scene.game.config.height;
            const enmY = enemy.skin.getWorldTransformMatrix().ty - enemy.skin.height/2;

            if (enmY > outOfEdge) {
                enemy.destroy();
                this.children.splice(i, 1);
            } else {
                enemy.move();
            }
        }

    }
}

export class Enemy extends Phaser.GameObjects.Container {

    skin: Phaser.GameObjects.Rectangle;

    life: number = 100;
    remainLife: number = 100;
    lifeBar: Phaser.GameObjects.Rectangle;

    private speedUp: boolean = false;
    velY: number = 1;
    minVelY: number = 1;
    maxVelY: number = 5;

    row: number;
    column: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, 0, 0);
        this.scene.add.existing(this);

        this.skin = new Phaser.GameObjects.Rectangle(scene, x, y, 100, 100, 0xff00ff, 1);
        this.lifeBar = new Phaser.GameObjects.Rectangle(scene, x, y + 45, 100, 10, 0x00ff00, 1);
        this.add(this.skin);
        this.add(this.lifeBar);
    }

    setGrid(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    setSpeedUp(value: boolean) {
        this.speedUp = value;
    }

    move() {
        this.y += this.velY;

        if (this.speedUp) {
            if(this.velY < this.maxVelY) {
                this.velY += 1;
            }
        } else {
            if (this.velY > this.minVelY) {
                this.velY -= 1;
            }
        }
    }
}
