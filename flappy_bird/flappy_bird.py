from flask import Blueprint

flappy_bird = Blueprint('flappy_bird', __name__)

@flappy_bird.route('/')
def index():
    return "template em portugues"