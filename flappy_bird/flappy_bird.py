from flask import Blueprint, render_template

flappy_bird = Blueprint('flappy_bird', __name__)

@flappy_bird.route('/')
def index():
    return render_template('flappy_bird.html')