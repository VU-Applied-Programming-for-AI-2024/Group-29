# vxFaxsQl6QnaXOBhmCG4dbPiWGfg6wykzKbZBqYGOn28ZZwvZ7pw8E5jtTxq key

from flask import Flask, request, jsonify
import requests
import http.client

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def api():
    conn = http.client.HTTPSConnection("api.sportmonks.com")
    payload = ''
    headers = {}
    conn.request("GET", "/api/v3/football/teams?api_token=vxFaxsQl6QnaXOBhmCG4dbPiWGfg6wykzKbZBqYGOn28ZZwvZ7pw8E5jtTxq", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))

if __name__ == '__main__':
    app.run()







