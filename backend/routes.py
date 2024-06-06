from flask import Blueprint
import http.client

backend = Blueprint('backend', __name__)

@backend.route('/api', methods=['GET'])
def fetch_teams():
    conn = http.client.HTTPSConnection("api.sportmonks.com")
    payload = ''
    headers = {}
    conn.request("GET", "/api/v3/football/teams?api_token=vxFaxsQl6QnaXOBhmCG4dbPiWGfg6wykzKbZBqYGOn28ZZwvZ7pw8E5jtTxq", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return data.decode("utf-8")
