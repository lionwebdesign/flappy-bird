from flask import Flask, render_template

#from flappy_bird.flappy_bird import flappy_bird

app = Flask(__name__)

#app.register_blueprint(flappy_bird, url_prefix='/flappy_bird')

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)