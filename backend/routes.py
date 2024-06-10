from flask import Blueprint, jsonify
import http.client
import json

backend = Blueprint('backend', __name__)

@backend.route('/api/teams', methods=['GET'])
def fetch_teams():
    conn = http.client.HTTPSConnection("api.football-data.org")
    payload = ''
    headers = {
        'X-Auth-Token': 'e01ad631ff844c349b745cb14b38e770'
    }
    conn.request("GET", "/v4/competitions", payload, headers)
    res = conn.getresponse()
    data = res.read()
    data_json = json.loads(data.decode("utf-8"))

    return jsonify(data_json)
