from flask import render_template
from ..app import app


@app.route("/website")
def website():
    return render_template("website.html")
