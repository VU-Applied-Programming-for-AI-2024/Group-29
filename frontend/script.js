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

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("customGameForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting and resetting

        // Get form data
        const sport = document.getElementById("sport").value;
        const team1 = document.getElementById("team1").value;
        const team2 = document.getElementById("team2").value;
        const time = document.getElementById("time").value;
        const date = document.getElementById("date").value;

        // Format date and time properly for Google Calendar
        const isoDateTime = `${date}T${time}:00Z`;

        // Construct Google Calendar URL
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`MyGame: ${team1} vs ${team2}`)}&details=${encodeURIComponent(`Sport: ${sport}`)}&dates=${encodeURIComponent(isoDateTime)}`;

        // Open new window with Google Calendar event
        window.open(calendarUrl, '_blank');
    });

document.getElementById("addToMyGamesButton").addEventListener("click", () => {
    // Get form data
    const sport = document.getElementById("sport").value;
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const time = document.getElementById("time").value;
    const date = document.getElementById("date").value;

    if (sport && team1 && team2 && time && date) {
            // Create a game object
        const game = {
            sport,
            team1,
            team2,
            time,
            date
        };

        // Get existing games from localStorage
        let games = JSON.parse(localStorage.getItem("games")) || [];

        // Add the new game to the array
        games.push(game);

        // Save the updated games array back to localStorage
        localStorage.setItem("games", JSON.stringify(games));

        alert(`Game added to My Games: ${sport} - ${team1} vs ${team2} on ${date} at ${time}`);

        //redirect to My Games page
        window.location.href = "my_games.html";

    } else {
        alert('Please fill in all fields.');
    }
});
});
