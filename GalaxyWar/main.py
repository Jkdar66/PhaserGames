from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def gui():
    spaceships = getAllSpaceships()
    backgrounds = getBackgrounds()
    bullets = getBullets()
    flames = getFlames()
    player = basicPlayer()
    return render_template("index.html", player=player, spaceships=spaceships, backgrounds=backgrounds, bullets=bullets, flames=flames)

def getAllSpaceships():
    price = [
        1000, 2500, 5000, 7500, 10000, 15000
    ]
    lis = []
    player = basicPlayer()
    for i in range(6):
        lis.append([])
        for j in range(7):
            bought = False
            if j in player["spaceships"]["bought"][i]:
                bought = True
            lis[i].append({
                "name": "spaceship_" + str(i) + "-" + str(j),
                "img_src": "assets/spaceships/" + str(i) + "/" + str(j) + ".png",
                "price": price[i],
                "icon": "fa-coins",
                "bought": bought
            })
    return lis

def getBullets():
    price = [
        1000, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000
    ]
    lis = []
    player = basicPlayer()
    for i in range(10):
        bought = False
        if i in player["bullets"]["bought"]:
            bought = True
        lis.append({
            "name": "bullet" + str(i),
            "img_src": "assets/bullets/red/0" + str(i) + ".png",
            "price": price[i],
            "icon": "fa-coins",
            "bought": bought
        })
    return lis

def getFlames():
    price = [
        1000, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000
    ]
    lis = []
    player = basicPlayer()
    for i in range(1):
        bought = False
        if i in player["flames"]["bought"]:
            bought = True
        lis.append({
            "name": "flames" + str(i),
            "img_src": "assets/flames/blue/0" + str(i) + ".png",
            "price": price[i],
            "icon": "fa-coins",
            "bought": bought
        })
    return lis

def getBackgrounds():
    price = [
        1000, 10000, 100000
    ]
    lis = []
    player = basicPlayer()
    for i in range(3):
        bought = False
        if i in player["backgrounds"]["bought"]:
            bought = True
        lis.append({
            "name": "background" + str(i),
            "img_src": "assets/backgrounds/" + str(i) + ".png",
            "price": price[i],
            "icon": "fa-coins",
            "bought": bought
        })
    return lis

def basicPlayer():
    player = {
        "coins": 1000,
        "spaceships": {
            "bought": [[0], [], [], [], [], []]
        },
        "bullets": {
            "bought": [0, 5, 9]
        },
        "flames": {
            "bought": [0]
        },
        "backgrounds": {
            "bought": [0]
        }
    }
    return player

if __name__ == "__main__":
    app.run()
