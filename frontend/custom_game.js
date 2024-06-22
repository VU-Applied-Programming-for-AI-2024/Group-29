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
        const dateTime = new Date(`${date}T${time}`);
        const isoDateTime = dateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        // Construct Google Calendar URL
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`MyGame: ${team1} vs ${team2}`)}&details=${encodeURIComponent(`Sport: ${sport}`)}&dates=${encodeURIComponent(isoDateTime)}/${encodeURIComponent(isoDateTime)}`;

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

            // Optionally, redirect to My Games page
            window.location.href = "my_games.html";
        } else {
            alert('Please fill in all fields.');
        }
    });
});
