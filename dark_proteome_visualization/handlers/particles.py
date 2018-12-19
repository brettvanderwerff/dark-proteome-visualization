from flask import render_template
from ..app import app


@app.route("/particles")
def particles():
    return render_template("particles.html")
