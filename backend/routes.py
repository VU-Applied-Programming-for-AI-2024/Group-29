import http.client, dateutil.parser, os, json
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv

load_dotenv()

backend = Blueprint('backend', __name__)

# Function to fetch fixtures from our API
def fetch_fixtures(team_id, league_id):
    try:
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
        headers = {
            'X-RapidAPI-Key': os.getenv('API_KEY'),
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

# Function to get the team fixtures
@backend.route('/api/teams/<int:team_id>/<int:league_id>', methods=['GET'])
def get_team_fixtures(team_id, league_id):
    fixtures, error = fetch_fixtures(team_id, league_id)
    if error:
        return jsonify({'error': error}), 500

    if not fixtures:
        return jsonify({'error': 'No fixtures found for this team'}), 404

    team_fixtures = []
    for fixture in fixtures:
        home_team = fixture['homeTeam']['team_name']
        away_team = fixture['awayTeam']['team_name']
        event_date = fixture['event_date']
        
        event_date_parsed = dateutil.parser.parse(event_date)
        event_date_formatted = event_date_parsed.strftime("%d %B %H:%M")
        
        team_fixtures.append(f"{home_team} plays {away_team} on {event_date_formatted}")

    output = '<br>'.join(team_fixtures)
    return jsonify({'fixtures': output})

# Function to handle the form submission
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
