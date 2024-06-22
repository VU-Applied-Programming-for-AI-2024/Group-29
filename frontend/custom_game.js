document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("customGameForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const sport = document.getElementById("sport").value;
        const team1 = document.getElementById("team1").value;
        const team2 = document.getElementById("team2").value;
        const time = document.getElementById("time").value;
        const date = document.getElementById("date").value;

        const isoDateTime = `${date}T${time}:00Z`;

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`MyGame: ${team1} vs ${team2}`)}&details=${encodeURIComponent(`Sport: ${sport}`)}&dates=${encodeURIComponent(isoDateTime)}`;

        window.open(calendarUrl, '_blank');
    });

    document.getElementById("addToMyGamesButton").addEventListener("click", () => {
        const sport = document.getElementById("sport").value;
        const team1 = document.getElementById("team1").value;
        const team2 = document.getElementById("team2").value;
        const time = document.getElementById("time").value;
        const date = document.getElementById("date").value;

        if (sport && team1 && team2 && time && date) {
            const game = {
                sport,
                team1,
                team2,
                time,
                date
            };

            let games = JSON.parse(localStorage.getItem("games")) || [];

            games.push(game);

            localStorage.setItem("games", JSON.stringify(games));

            alert(`Game added to My Games: ${sport} - ${team1} vs ${team2} on ${date} at ${time}`);

            window.location.href = "my_games.html";
        } else {
            alert('Please fill in all fields.');
        }
    });
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
        body.style.marginLeft = '0';
    }
}


