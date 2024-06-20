from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.routes import backend

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from other domains

app.register_blueprint(backend)

@app.route('/api/submit', methods=['POST'])
def submit_form(): # this function will be called when the form is submitted and sends a response to the route(routes.py) that sends the request
    try:
        data = request.json
        print("Form Data:", data)
        return jsonify({'message': 'Form submitted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
