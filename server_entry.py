#!flask/bin/python
from flask import Flask, render_template, request, redirect, url_for, abort, session
import os
import sys
import json
import random

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super_secret_key'

@app.route('/')
def index():
    return redirect(url_for('example'))

@app.route('/example')
def example():
    return render_template('example.html',
                           data=json.dumps(create_random_sample(50)))

def create_random_sample(n):
    random_numbers = random.sample(range(n), 10)

    return random_numbers

if __name__ == '__main__':
    app.run(debug=True)

