function toggleNav() {
    var nav = document.querySelector('.navbar');
    var body = document.querySelector('body');
    if (nav.style.left === '-250px') {
        nav.style.left = '0'; // Move in to 0 position from the left
    } else {
        nav.style.left = '-250px'; // Hide back off-screen
    }

    if (body.style.marginLeft === '-35%') {
        body.style.marginLeft = '30%';
    }   else {
        body.style.marginLeft = '35%';
    }
}


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