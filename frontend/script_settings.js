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