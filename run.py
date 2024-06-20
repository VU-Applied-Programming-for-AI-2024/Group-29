from flask import Flask, send_from_directory
from flask_cors import CORS
from backend.routes import backend

app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})  # cors allows connectivity between frontend and backend ports

app.register_blueprint(backend) # this allows the server to use the routes defined in the backend file

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'home.html') # makes the home.html file the default page

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path) # allows the server to serve static files

if __name__ == '__main__':
    app.run(debug=True)
