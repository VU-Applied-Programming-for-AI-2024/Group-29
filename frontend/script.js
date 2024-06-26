document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const messageElement = document.getElementById('fetchedGamesContainer');

    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            handleSubmit();
        };
    }

    function handleSubmit() {
        const sport = document.getElementById('sport').value;
        const league = document.getElementById('league').value;
        const team = document.getElementById('team').value;
        const leagueName = document.getElementById('league').options[document.getElementById('league').selectedIndex].text;
        const teamName = document.getElementById('team').options[document.getElementById('team').selectedIndex].text;

        if (sport && league && team) {
            fetch('http://127.0.0.1:5000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sport, league, team, leagueName, teamName })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    messageElement.textContent = `Error: ${data.error}`;
                } else {
                    messageElement.textContent = data.message;
                    fetchFixtures(team, league);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageElement.textContent = 'An error occurred. Please try again.';
            });
        } else {
            messageElement.textContent = 'Please fill out all fields.';
        }
    }

    function fetchFixtures(teamId, leagueId) {
        fetch(`http://127.0.0.1:5000/api/teams/${teamId}/${leagueId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    messageElement.textContent += ` Error fetching fixtures: ${data.error}`;
                } else {
                    const fixturesElement = document.createElement('div');
                    fixturesElement.innerHTML = data.fixtures;
                    messageElement.appendChild(fixturesElement);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageElement.textContent += ' An error occurred fetching fixtures.';
            });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const liveMatchesMessage = document.getElementById('liveMatchesMessage');
    const liveMatchesContainer = document.getElementById('liveMatchesContainer');
    const liveMatchesButton = document.getElementById('liveMatchesButton');

    if (liveMatchesButton) {
        liveMatchesButton.addEventListener('click', fetchLiveFixtures);
    }
    //// 1
    function fetchLiveFixtures() {
        liveMatchesMessage.textContent = 'Fetching live matches...';

        fetch('http://127.0.0.1:5000/api/live', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch live matches');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            displayLiveFixtures(data.live_fixtures); 
        })
        .catch(error => {
            console.error('Error:', error);
            liveMatchesMessage.textContent = 'An error occurred fetching live matches.';
        });
    }
    //// 4
    function displayLiveFixtures(fixtures) {
        liveMatchesContainer.innerHTML = '';

        if (!fixtures || fixtures.length === 0) {
            liveMatchesMessage.textContent = 'No live fixtures found.';
            return;
        }

        fixtures.forEach(fixture => {
            const fixtureElement = document.createElement('p');
            fixtureElement.textContent = `${fixture.home_team} vs ${fixture.away_team} on ${fixture.event_date}`;
            liveMatchesContainer.appendChild(fixtureElement);
        });

        liveMatchesMessage.textContent = '';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const modeSwitch = document.getElementById('mode-switch');

    function applySavedMode() {
        const savedMode = localStorage.getItem('mode');
        if (savedMode) {
            const isLightMode = savedMode === 'light';
            body.classList.toggle('light-mode', isLightMode);
            modeSwitch.checked = isLightMode;
        }
    }

    applySavedMode();

    if (modeSwitch) {
        modeSwitch.addEventListener('change', function() {
            const isLightMode = modeSwitch.checked;
            body.classList.toggle('light-mode', isLightMode);
            localStorage.setItem('mode', isLightMode ? 'light' : 'dark');
        });
    }
});

function toggleNav() {
    var nav = document.querySelector('.navbar');
    var body = document.querySelector('body');
    var computedStyle = window.getComputedStyle(nav).left;
    if (computedStyle === '-250px') {
        nav.style.left = '0'; 
        body.style.marginLeft = '39%';
    } else {
        nav.style.left = '-250px'; 
        body.style.marginLeft = '0%';
    }
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
    });
    signInButton.addEventListener('click', () => { 
    container.classList.remove('right-panel-active');
    });




document.addEventListener("DOMContentLoaded", () => {
    const gamesContainer = document.getElementById("gamesContainer");

    function displayGames() {
        const games = JSON.parse(localStorage.getItem("games")) || [];
        gamesContainer.innerHTML = "";

        if (games.length > 0) {
            games.forEach((game, index) => {
                const gameElement = document.createElement("div");
                gameElement.className = "match-details";
                gameElement.innerHTML = `
                    <p><strong>Sport:</strong> ${game.sport}</p>
                    <p><strong>Teams:</strong> ${game.team1} vs ${game.team2}</p>
                    <p><strong>Date:</strong> ${game.date}</p>
                    <p><strong>Time:</strong> ${game.time}</p>
                    <button class="delete-button" data-index="${index}">Delete</button>
                `;
                gamesContainer.appendChild(gameElement);
            });
        } else {
            gamesContainer.innerHTML = "<p>No games added yet.</p>";
        }
    }

    function deleteGame(index) {
        let games = JSON.parse(localStorage.getItem("games")) || [];
        games.splice(index, 1);
        localStorage.setItem('games', JSON.stringify(games));
        displayGames();
    }

    gamesContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.getAttribute('data-index');
            deleteGame(index);
        }
    });

    displayGames();
});


document.getElementById('add-to-calendar').addEventListener('click', function() {
    const googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    window.open(googleCalendarUrl, '_blank');
});

function updateLeagueOptions() {
    const sportSelect = document.getElementById('sport');
    const leagueSelect = document.getElementById('league');

    leagueSelect.innerHTML = '';

    if (sportSelect.value === 'soccer') {
        const option = document.createElement('option');
        option.value = 'Euro Cup';
        option.textContent = 'Euro Cup';
        leagueSelect.appendChild(option);
    }
}

function updateTeamOptions() {
    const leagueSelect = document.getElementById('league');
    const teamSelect = document.getElementById('team');

    teamSelect.innerHTML = '';

    if (leagueSelect.value === 'Euro Cup') {
        const countries = [
            { id: 1, name: 'Belgium' },
            { id: 2, name: 'France' },
            { id: 3, name: 'Croatia' },
            { id: 9, name: 'Spain' },
            { id: 10, name: 'England' },
            { id: 14, name: 'Serbia' },
            { id: 15, name: 'Switzerland' }
        ];

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.id;
            option.textContent = country.name;
            teamSelect.appendChild(option);
        });
    }
}

