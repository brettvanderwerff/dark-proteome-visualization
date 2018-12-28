from flask import render_template
from ..app import app


@app.route("/raindrop")
def raindrop():
    return render_template("raindrop.html")
