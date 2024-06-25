//had to make a new js file for this or it wouldnt work, not sure why. but if i added this to the script.js file it wouldnt work.

//form submission for adding calendar

document.addEventListener("DOMContentLoaded", () => { //waits for the page to load before running the code
    const form = document.getElementById("customGameForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const sport = document.getElementById("sport").value;
        const team1 = document.getElementById("team1").value;
        const team2 = document.getElementById("team2").value;
        const time = document.getElementById("time").value;
        const date = document.getElementById("date").value;

        const dateTime = new Date(`${date}T${time}`); //combines the date and time into one date object
        const isoDateTime = dateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; //Z puts time in UTC. converts the date object to an ISO string and removes the colons and dashes

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`MyGame: ${team1} vs ${team2}`)}&details=${encodeURIComponent(`Sport: ${sport}`)}&dates=${encodeURIComponent(isoDateTime)}/${encodeURIComponent(isoDateTime)}`;

        window.open(calendarUrl, '_blank');
    });

    //adds game to local storage: 

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
                date,
                isCustom: true
            };

            let games = JSON.parse(localStorage.getItem("games")) || []; //tries to get games from local storage, if it doesnt exist, it will create an empty array

            games.push(game);

            localStorage.setItem("games", JSON.stringify(games));

            alert(`Game added to My Games: ${sport} - ${team1} vs ${team2} on ${date} at ${time}`);

            window.location.href = "my_games.html";
        } else {
            alert('Please fill in all fields.');
        }
    });
});








