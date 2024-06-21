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
});
