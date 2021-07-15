from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def gui():
    spaceships = getSpaceships()
    backgrounds = getBackgrounds()
    return render_template("index2.html", spaceships=spaceships, backgrounds=backgrounds)

def getSpaceships():
    return [
        {
            "img_src": "assets/spaceships/green/2.png",
            "price": 1000,
            "icon": "fa-coins"
        },
        {
            "img_src": "assets/spaceships/black/1.png",
            "price": 100000,
            "icon": "fa-coins"
        },
        {
            "img_src": "assets/spaceships/blue/9.png",
            "price": 1000000,
            "icon": "fa-coins"
        },
        {
            "img_src": "assets/spaceships/prime/1.png",
            "price": 1000000,
            "icon": "fa-coins"
        }
    ]

def getBackgrounds():
    return [
        {
            "img_src": "assets/backgrounds/1.png",
            "price": 1000,
            "icon": "fa-coins"
        }, 
        {
            "img_src": "assets/backgrounds/2.png",
            "price": 100000,
            "icon": "fa-coins"
        }, 
        {
            "img_src": "assets/backgrounds/3.png",
            "price": 1000000,
            "icon": "fa-coins"
        }
    ]

if __name__ == "__main__":
    app.run(debug=True)
