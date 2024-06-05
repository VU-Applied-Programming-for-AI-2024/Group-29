from flask import render_template, jsonify
import requests
from backend import app

@app.route('/api', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def api():
    authentication = 'https://api.sportmonks.com/api/v3/football/livescores?api_token=vxFaxsQl6QnaXOBhmCG4dbPiWGfg6wykzKbZBqYGOn28ZZwvZ7pw8E5jtTxq'
    endpoint = "https://api.sportmonks.com/v3/football"  
    response = requests.get(authentication)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": response.status_code})