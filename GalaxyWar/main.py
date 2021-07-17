from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def gui():
    spaceships = getSpaceships()
    backgrounds = getBackgrounds()
    bullets = getBullets()
    return render_template("index2.html", spaceships=spaceships, backgrounds=backgrounds, bullets=bullets)

def getSpaceships():
    price = [
        "-", 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000 
    ]
    lis = []
    for i in range(7):
        lis.append({
            "name": "spaceship" + str(i),
            "img_src": "assets/spaceships/all/" + str(i) + ".png",
            "price": price[i],
            "icon": "fa-coins"
        })
    return lis

def getBullets():
    price = [
        "-", 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 50000
    ]
    lis = []
    for i in range(10):
        lis.append({
            "name": "bullet" + str(i),
            "img_src": "assets/bullets/red/0" + str(i+1) + ".png",
            "price": price[i],
            "icon": "fa-coins"
        })
    return lis

def getBackgrounds():
    price= [
        "-", 10000, 100000
    ]
    lis = []
    for i in range(3):
        lis.append({
            "name": "background" + str(i),
            "img_src": "assets/backgrounds/" + str(i+1) + ".png",
            "price": price[i],
            "icon": "fa-coins"
        })
    return lis

if __name__ == "__main__":
    app.run()
