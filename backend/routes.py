import http.client
import os
import json
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import dateutil.parser

load_dotenv()

backend = Blueprint('backend', __name__)

def fetch_fixtures(team_id, league_id):
    try:
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
        headers = {
            'X-RapidAPI-Key': 'd2e9c50e71msh9c1aa43d831af5cp1b4350jsnd108d9d34ba6',
            'X-RapidAPI-Host': "api-football-v1.p.rapidapi.com"
        }
        conn.request("GET", f"/v2/fixtures/team/{team_id}/{league_id}?timezone=Europe/Amsterdam", headers=headers)
        res = conn.getresponse()
        if res.status != 200:
            return None, f'Failed to retrieve data from API. Status code: {res.status}'

        data = res.read().decode("utf-8")
        data_json = json.loads(data)

        fixtures = data_json.get('api', {}).get('fixtures', [])
        return fixtures, None


    except Exception as e:
        return None, str(e)

@backend.route('/api/teams/<int:team_id>/<int:league_id>', methods=['GET'])
def get_team_fixtures(team_id, league_id):
    fixtures, error = fetch_fixtures(team_id, league_id)
    if error:
        return jsonify({'error': error}), 500

    if not fixtures:
        return jsonify({'error': 'No fixtures found for this team'}), 404

    team_fixtures = []
    for fixture in fixtures:
        home_team = fixture.get('homeTeam', {}).get('team_name', 'Unknown')
        away_team = fixture.get('awayTeam', {}).get('team_name', 'Unknown')
        event_date = fixture.get('event_date', '')
        
        event_date_parsed = dateutil.parser.parse(event_date)
        event_date_formatted = event_date_parsed.strftime("%d %B %H:%M")
        
        team_fixtures.append(f"{home_team} vs {away_team} on {event_date_formatted}")

    output = '<br>'.join(team_fixtures)
    return jsonify({'fixtures': output})


@backend.route('/api/submit', methods=['POST'])
def submit_form():
    try:
        data = request.json
        team_id = data.get('team')
        league_id = data.get('league')
        team_name = data.get('teamName')
        league_name = data.get('leagueName')

        return jsonify({'message': f'Successfully followed {team_name} in {league_name}.', 'teamId': team_id})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500



def fetch_live_fixtures():
    try:
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
        headers = {
            'X-RapidAPI-Key': 'd2e9c50e71msh9c1aa43d831af5cp1b4350jsnd108d9d34ba6',
            'X-RapidAPI-Host': "api-football-v1.p.rapidapi.com"
        }
        conn.request("GET", "/v2/fixtures/live?timezone=Europe/Amsterdam", headers=headers)
        res = conn.getresponse()

        if res.status != 200:
            return None, f'Failed to retrieve data from API. Status code: {res.status}'

        data = res.read().decode("utf-8")
        print(data)  
        
        data_json = json.loads(data)
        fixtures = data_json.get('api', {}).get('fixtures', [])
        
        if not fixtures:
            return [], None  
        
        return fixtures, None

    except http.client.HTTPException as http_error:
        return None, f'HTTP Error: {http_error}'
    except Exception as e:
        return None, str(e)

    

@backend.route('/api/live', methods=['GET'])
def get_live_fixtures():
    fixtures, error = fetch_live_fixtures()
    if error:
        return jsonify({'error': error}), 500

    if not fixtures:
        return jsonify({'error': 'No live fixtures found'}), 404

    formatted_fixtures = []
    for fixture in fixtures:
        home_team = fixture.get('homeTeam', {}).get('team_name', 'Unknown')
        away_team = fixture.get('awayTeam', {}).get('team_name', 'Unknown')
        event_date = fixture.get('event_date', '')
        
        event_date_parsed = dateutil.parser.parse(event_date)
        event_date_formatted = event_date_parsed.strftime("%d %B %H:%M")
        
        formatted_fixtures.append({
            'home_team': home_team,
            'away_team': away_team,
            'event_date': event_date_formatted
        })

    return jsonify({'live_fixtures': formatted_fixtures})

