import requests

url = "https://api.sportsdata.io/v3/tennis/scores/json/Competitions?key=df78e801653e440996f5f16e6a9bbeb2"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    # Process the data returned by the API
    # ...
    
for each in data:
    print(each)
    
else:
    print("Error:", response.status_code)