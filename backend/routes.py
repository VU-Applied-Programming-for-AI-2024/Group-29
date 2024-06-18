import json
from datetime import datetime
from flask import Blueprint
import http.client
import dateutil.parser
backend = Blueprint('backend', __name__)

@backend.route('/api/teams', methods=['GET'])
def get_team_fixtures(team_name):
    conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")

    headers = {
        'X-RapidAPI-Key': "d2e9c50e71msh9c1aa43d831af5cp1b4350jsnd108d9d34ba6",
        'X-RapidAPI-Host': "api-football-v1.p.rapidapi.com"
    }

    conn.request("GET", "/v2/fixtures/team/2/5858?timezone=Europe/Amsterdam", headers=headers)

    res = conn.getresponse()
    data = res.read()

    data_str = data.decode("utf-8")

    data_json = json.loads(data_str)
    fixtures = data_json.get('api', {}).get('fixtures', [])
    team_fixtures = []

    for fixture in fixtures:
        home_team = fixture['homeTeam']['team_name']
        away_team = fixture['awayTeam']['team_name']
        event_date = fixture['event_date']
        
        event_date_parsed = dateutil.parser.parse(event_date)
        event_date_formatted = event_date_parsed.strftime("%d %B %H:%M")
        
        if home_team == team_name:
            opponent = away_team
        elif away_team == team_name:
            opponent = home_team
        else:
            continue

        team_fixtures.append(f"{team_name} plays {opponent} on the {event_date_formatted}")

    return team_fixtures


fixtures = get_team_fixtures("France")
for fixture in fixtures:
    print(fixture)



