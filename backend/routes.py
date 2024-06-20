import http.client, dateutil.parser, os, json
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv

load_dotenv()

backend = Blueprint('backend', __name__)

def fetch_fixtures(team_id): # Function to fetch fixtures from our API
    try:
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
        headers = {
            'X-RapidAPI-Key': os.getenv('API_KEY'),
            'X-RapidAPI-Host': "api-football-v1.p.rapidapi.com"
        }
        conn.request("GET", f"/v2/fixtures/team/{team_id}/5858?timezone=Europe/Amsterdam", headers=headers)
        res = conn.getresponse()
        if res.status != 200:
            return None, f'Failed to retrieve data from API. Status code: {res.status}'

        data = res.read().decode("utf-8")
        data_json = json.loads(data)

        fixtures = data_json.get('api', {}).get('fixtures', [])
        return fixtures, None

    except Exception as e:
        return None, str(e)
    
    
@backend.route('/api/teams/<int:team_id>', methods=['GET'])
def get_team_fixtures(team_id): # this function will be called when the frontend sends a request to the the place where the fixtures are fetched/hold)
    fixtures, error = fetch_fixtures(team_id) # also does the formatting of the date
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

    output = '<br>'.join(team_fixtures) # still not correct for the frontend
    return jsonify({'fixtures': output})


@backend.route('/api/submit', methods=['POST'])
def submit_form(): # this function is used to handle the form submission and makes the teamud available to the frontend
    try:
        data = request.json
        team_id = data.get('teamId') 

        sport = data.get('sport')
        league = data.get('league')
        email_subscription = data.get('import') # not used yet but will be
        return jsonify({'message': 'Form submitted successfully', 'teamId': team_id})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500