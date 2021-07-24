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
        "-", 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000
    ]
    lis = []
    player = basicPlayer()
    for i in range(6):
        for j in range(7):
            lis.append({
                "name": "spaceship" + str(i),
                "img_src": "assets/spaceships/" + str(i) + "/" + str(j) + ".png",
                "price": price[i],
                "icon": "fa-coins",
                "buyed": False
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

def getFlames():
    price = [
        "-", 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000
    ]
    lis = []
    player = basicPlayer()
    for i in range(1):
        disabled = True
        if i in player["flames"]["buyed"]:
            disabled = False
        lis.append({
            "name": "flames" + str(i),
            "img_src": "assets/flames/blue/0" + str(i) + ".png",
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
        "coins": 1000,
        "spaceships": {
            "buyed": [0, 1, 2, 3, 4, 5, 6]
        },
        "bullets": {
            "buyed": [0, 5, 9]
        },
        "flames": {
            "buyed": [0]
        },
        "backgrounds": {
            "buyed": [0, 1, 2]
        }
    }
    return player

# def getSpaceships():
#     price = [
#         "-", 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000 
#     ]
#     lis = []
#     player = basicPlayer()
#     for i in range(7):
#         disabled = True
#         if i in player["spaceships"]["buyed"]:
#             disabled = False
#         lis.append({
#             "name": "spaceship" + str(i),
#             "img_src": "assets/spaceships/all/" + str(i) + ".png",
#             "price": price[i],
#             "icon": "fa-coins",
#             "buyed": disabled
#         })
#     return lis

if __name__ == "__main__":
    app.run()
