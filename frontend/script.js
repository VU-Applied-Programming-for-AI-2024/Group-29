document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('subscriptionForm');
    const messageElement = document.getElementById('message');
    const modeSwitch = document.getElementById('modeSwitch');
    const body = document.body;

    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            handleSubmit();
        };
    }

    function handleSubmit() {
        const sport = document.getElementById('sport').value;
        const leagueSelect = document.getElementById('league');
        const teamSelect = document.getElementById('team');
        
        const league = leagueSelect.value;
        const team = teamSelect.value;
        const leagueName = leagueSelect.options[leagueSelect.selectedIndex].text;
        const teamName = teamSelect.options[teamSelect.selectedIndex].text;

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
        body.style.marginLeft = '34%';
    }
}
