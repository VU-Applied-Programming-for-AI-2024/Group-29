// For yhe navbar to pull in and out if clicked
function toggleNav() {
    var nav = document.querySelector('.navbar');
    var body = document.querySelector('body');
    var computedStyle = window.getComputedStyle(nav).left;
    if (computedStyle === '-250px') {
        nav.style.left = '0'; // Move in to 0 position from the left
        body.style.marginLeft = '39%';

    } else {
        nav.style.left = '-250px'; // Hide back off-screen
        body.style.marginLeft = '34%';
}
}




function handleSubmit(event) {
    event.preventDefault(); 

    const sport = document.getElementById('sport').value;
    const league = document.getElementById('league').value;
    const team = document.getElementById('team').value;
    const emailSubscription = document.getElementById('emailSubscription').checked;
    document.getElementById('message').innerText = "Thank you for signing up! Excited?";

    const formData = {
        sport: sport,
        league: league,
        team: team,
        emailSubscription: emailSubscription
    };

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById('message').innerText = data.message; 

        // Fetch fixtures after successful form submission
        return fetch(`/api/teams/${team}`); // Adjust the endpoint as per your backend route
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.fixtures);
        document.getElementById('message').textContent += '\n' + JSON.stringify(data.fixtures, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    });
}





