from flask import render_template, redirect, url_for
from ..app import app


@app.route('/')
def base():
    return redirect(url_for('network'))


@app.route("/network")
def network():
    return render_template("network.html")

