from flask import Flask, send_from_directory
from backend.routes import backend

app = Flask(__name__, static_folder='frontend', static_url_path='')

app.register_blueprint(backend)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'home.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)
