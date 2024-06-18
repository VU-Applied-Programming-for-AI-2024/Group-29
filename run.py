from flask import Flask, send_from_directory
from flask_cors import CORS
from backend.routes import backend

app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})  # Allow CORS for your frontend URL

app.register_blueprint(backend)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'home.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)
