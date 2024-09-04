// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form
    document.getElementById('passwordForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve the input values
        const serviceName = document.getElementById('service-name').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validation: Check if all fields are filled
        if (!serviceName || !username || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Username validation: minimum length
        if (username.length < 3) {
            alert('Username must be at least 3 characters long.');
            return;
        }

        // Password validation pattern
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(password)) {
            alert('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        }

        // If validation passes, log data to the console
        console.log('Service Name:', serviceName);
        console.log('Username:', username);
        console.log('Password:', password);

        // Reset the form
        document.getElementById('passwordForm').reset();
    });
});
