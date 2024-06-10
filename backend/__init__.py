from flask import Flask, request, jsonify
from backend.routes import backend

app = Flask(__name__)

app.register_blueprint(backend)

@app.route('/api/submit', methods=['POST'])
def submit_form():
    data = request.json
    print("Form Data:", data)
    return jsonify({'message': 'Form submitted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
