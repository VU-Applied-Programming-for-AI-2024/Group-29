from flask import Blueprint, jsonify
import http.client

# Create a Blueprint for the backend routes
backend = Blueprint('backend', __name__)

# Define the route to fetch data from the external API
@backend.route('/api', methods=['GET'])
def fetch_teams():
    conn = http.client.HTTPSConnection("api.sportmonks.com")
    payload = ''
    headers = {}
    conn.request("GET", "/api/v3/football/teams?api_token=vxFaxsQl6QnaXOBhmCG4dbPiWGfg6wykzKbZBqYGOn28ZZwvZ7pw8E5jtTxq", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return data.decode("utf-8")

# Define another sample route
@backend.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'data': 'This is your backend data'})
