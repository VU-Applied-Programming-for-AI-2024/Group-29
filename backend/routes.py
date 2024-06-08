from flask import Blueprint
import http.client

backend = Blueprint('backend', __name__)

@backend.route('/api', methods=['GET'])
def fetch_teams():
    conn = http.client.HTTPSConnection("api.football-data.org")
    payload = ''
    headers = {}
    conn.request("GET", "/v4/competitions", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return data.decode("utf-8")
