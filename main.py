from flask import Flask

from flappy_bird.flappy_bird import flappy_bird

app = Flask(__name__)
@app.route('/')
def home():
    return render_template('componentes/home.html')

app.register_blueprint(flappy_bird, url_prefix='/flappy_bird')

if __name__ == '__main__':
    app.run(debug=True)