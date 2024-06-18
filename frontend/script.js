// For yhe navbar to pull in and out if clicked
function toggleNav() {
    var nav = document.querySelector('.navbar');
    var body = document.querySelector('body');
    var footer = document.querySelector('footer');
    var computedStyle = window.getComputedStyle(nav).left;
    if (computedStyle === '-250px') {
        nav.style.left = '0'; // Move in to 0 position from the left
        body.style.marginLeft = '39%';
        footer.style.marginLeft = '-60%';
        footer.style.width = '160%'

    } else {
        nav.style.left = '-250px'; // Hide back off-screen
        body.style.marginLeft = '34%';
        footer.style.marginLeft = '-50%';
        footer.style.width = '150%'

}
}


// Event that happens when submit is pressed
function handleSubmit(event) {
    event.preventDefault(); 

    const sport = document.getElementById('sport').value;
    const league = document.getElementById('league').value;
    const team = document.getElementById('team').value;
    const custom = document.getElementById('customNotification').value; 
    const email = document.getElementById('email').value; 
    document.getElementById('message').innerText = "Thank you for signing up! Excited?";

    const formData = {
        sport: sport,
        league: league,
        team: team,
        custom: custom,
        email: email
    };

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('message').innerText = data.message; 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Event when light mode is switched on.
document.addEventListener('DOMContentLoaded', () => {
    const modeSwitch = document.getElementById('mode-switch');
    const body = document.body;

    // Check local storage for mode preference
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        body.classList.toggle('light-mode', savedMode === 'light');
        modeSwitch.checked = savedMode === 'light';
    }

    modeSwitch.addEventListener('change', () => {
        const isLightMode = modeSwitch.checked;
        body.classList.toggle('light-mode', isLightMode);

        // Save mode preference to local storage
        localStorage.setItem('mode', isLightMode ? 'light' : 'dark');
    });
});
