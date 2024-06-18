from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.routes import backend

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from other origins

app.register_blueprint(backend)

@app.route('/api/submit', methods=['POST'])
def submit_form():
    try:
        data = request.json
        print("Form Data:", data)
        return jsonify({'message': 'Form submitted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
