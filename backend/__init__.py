from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.routes import backend

app = Flask(__name__)
CORS(app)  

app.register_blueprint(backend)

if __name__ == '__main__':
    app.run(debug=True)
