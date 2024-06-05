from flask import Flask, request, jsonify
url = ""

response = request(url)

if response.status_code == 200:
    data = response.json()
    
    
    print(data)

else:
    print("Error:", response.status_code)