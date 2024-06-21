<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="signup-form", name='signUp'>
        <form method = "post" action = "register.php">
            <h2>Sign Up</h2>
            <div class="input-group">
                <label for="fullname">Full Name</label>
                <input type="text" id="fullname" name="fullname" required>
            </div>
            <div class="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" name='signUp' >Sign Up</button>
            <div class="extra-links">
                <span>Already have an account?</span>
                <a href="login.html">Login here</a>
            </div>
        </form>
    </div>

    <script>
        const menuIcon = document.querySelector('.menu-icon');
        const navbarMenu = document.querySelector('.navbar__menu');

        menuIcon.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    </script>
</body>
</html>