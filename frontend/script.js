document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const messageElement = document.getElementById('fetchedGamesContainer');
    const parseAndAddToMyGamesButton = document.getElementById('parseAndAddToMyGamesButton');

    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            handleSubmit();
        };
    }

    if (parseAndAddToMyGamesButton) {
        parseAndAddToMyGamesButton.onclick = function() {
            parseAndAddToMyGames();
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

    function parseAndAddToMyGames() {
        const fixtures = messageElement.querySelector('div'); // Assuming fixtures are in a single div
        if (fixtures) {
            const gamesText = fixtures.textContent; // Get the text content of the div
            const gamesArray = gamesText.split(/(?<=\d{2}:\d{2})/); // Split by the end of each time

            let games = JSON.parse(localStorage.getItem("games")) || [];

            gamesArray.forEach((gameDetails, index) => {
                gameDetails = gameDetails.trim(); // Trim any whitespace
                console.log(`Game ${index + 1}: ${gameDetails}`);

                // Parse game details (example assumes the format "Team1 vs Team2 on Date at Time")
                const gameRegex = /(.+?) vs (.+?) on (\d{1,2} \w+ \d{4}) at (\d{2}:\d{2})/;
                const match = gameDetails.match(gameRegex);
                if (match) {
                    const sport = document.getElementById('sport').value; // Assuming sport is still needed
                    const team1 = match[1];
                    const team2 = match[2];
                    const date = match[3];
                    const time = match[4];

                    const game = {
                        sport,
                        team1,
                        team2,
                        time,
                        date,
                        isCustom: true
                    };

                    games.push(game);
                }
            });

            localStorage.setItem("games", JSON.stringify(games));

            alert(`Games added to My Games: ${gamesArray.length}`);

            window.location.href = "my_games.html";
        } else {
            console.log('No fixtures found to parse.');
        }
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const liveMatchesMessage = document.getElementById('liveMatchesMessage');
    const liveMatchesContainer = document.getElementById('liveMatchesContainer');
    const liveMatchesButton = document.getElementById('liveMatchesButton');

    if (liveMatchesButton) {
        liveMatchesButton.addEventListener('click', fetchLiveFixtures);
    }

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



//for my games cleaned up from my_games.html

document.addEventListener("DOMContentLoaded", () => {
    const gamesContainer = document.getElementById("gamesContainer");

    // Display games
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

    // Delete game
    function deleteGame(index) {
        let games = JSON.parse(localStorage.getItem("games")) || [];
        games.splice(index, 1);
        localStorage.setItem('games', JSON.stringify(games));
        displayGames();
    }

    // Event listener for delete buttons
    gamesContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.getAttribute('data-index');
            deleteGame(index);
        }
    });

    // Initial display of games
    displayGames();
});


document.getElementById('add-to-calendar').addEventListener('click', function() {
    const googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    window.open(googleCalendarUrl, '_blank');
});

function updateLeagueOptions() {
    const sportSelect = document.getElementById('sport');
    const leagueSelect = document.getElementById('league');

    // Clear previous options
    leagueSelect.innerHTML = '';

    if (sportSelect.value === 'soccer') {
        // Add Euro Cup option
        const option = document.createElement('option');
        option.value = 'Euro Cup';
        option.textContent = 'Euro Cup';
        leagueSelect.appendChild(option);
    }
}

function updateTeamOptions() {
    const leagueSelect = document.getElementById('league');
    const teamSelect = document.getElementById('team');

    // Clear previous options
    teamSelect.innerHTML = '';

    if (leagueSelect.value === 'Euro Cup') {
        // Add country options for Euro Cup
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