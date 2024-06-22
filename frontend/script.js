document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const messageElement = document.getElementById('message');

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


function applySavedMode() {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        const isLightMode = savedMode === 'light';
        body.classList.toggle('light-mode', isLightMode);
        if (modeSwitch) {
            modeSwitch.checked = isLightMode;
        }
    }
}

    applySavedMode();

    if (modeSwitch) {
        modeSwitch.addEventListener('change', () => {
            const isLightMode = modeSwitch.checked;
            body.classList.toggle('light-mode', isLightMode);
            localStorage.setItem('mode', isLightMode ? 'light' : 'dark');
        });
    }


function toggleNav() {
    var nav = document.querySelector('.navbar');
    var body = document.querySelector('body');
    var computedStyle = window.getComputedStyle(nav).left;
    if (computedStyle === '-250px') {
        nav.style.left = '0'; 
        body.style.marginLeft = '39%';
    } else {
        nav.style.left = '-250px'; 
        body.style.marginLeft = '34%';
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

