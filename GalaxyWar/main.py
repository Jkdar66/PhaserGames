from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def gui():
    spaceships = getSpaceships()
    backgrounds = getBackgrounds()
    bullets = getBullets()
    player = basicPlayer()
    return render_template("index.html", player=player, spaceships=spaceships, backgrounds=backgrounds, bullets=bullets)

def getSpaceships():
    price = [
        "-", 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000 
    ]
    lis = []
    player = basicPlayer()
    for i in range(7):
        disabled = True
        if i in player["spaceships"]["buyed"]:
            disabled = False
        lis.append({
            "name": "spaceship" + str(i),
            "img_src": "assets/spaceships/all/" + str(i) + ".png",
            "price": price[i],
            "icon": "fa-coins",
            "buyed": disabled
        })
    return lis

def getBullets():
    price = [
        "-", 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000
    ]
    lis = []
    player = basicPlayer()
    for i in range(10):
        disabled = True
        if i in player["bullets"]["buyed"]:
            disabled = False
        lis.append({
            "name": "bullet" + str(i),
            "img_src": "assets/bullets/red/0" + str(i) + ".png",
            "price": price[i],
            "icon": "fa-coins",
            "buyed": disabled
        })
    return lis

def getBackgrounds():
    price = [
        "-", 10000, 100000
    ]
    lis = []
    player = basicPlayer()
    for i in range(3):
        disabled = True
        if i in player["backgrounds"]["buyed"]:
            disabled = False
        lis.append({
            "name": "background" + str(i),
            "img_src": "assets/backgrounds/" + str(i) + ".png",
            "price": price[i],
            "icon": "fa-coins",
            "buyed": disabled
        })
    return lis

def basicPlayer():
    player = {
        "spaceships": {
            "buyed": [0, 2, 5, 6]
        },
        "bullets": {
            "buyed": [0, 5, 9]
        },
        "backgrounds": {
            "buyed": [0, 1]
        }
    }
    return player

if __name__ == "__main__":
    app.run()
