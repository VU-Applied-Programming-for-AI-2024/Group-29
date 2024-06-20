document.addEventListener('DOMContentLoaded', () => {
    const modeSwitch = document.getElementById('mode-switch');
    const body = document.body;

    // Function to apply the saved mode
    const applySavedMode = () => {
        const savedMode = localStorage.getItem('mode');
        if (savedMode) {
            body.classList.toggle('light-mode', savedMode === 'light');
            if (modeSwitch) {
                modeSwitch.checked = savedMode === 'light';
            }
        }
    };

    // Apply the saved mode when the DOM is loaded
    applySavedMode();

    if (modeSwitch) {
        modeSwitch.addEventListener('change', () => {
            const isLightMode = modeSwitch.checked;
            body.classList.toggle('light-mode', isLightMode);

            // Save mode preference to local storage
            localStorage.setItem('mode', isLightMode ? 'light' : 'dark');
        });
    }
});




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

