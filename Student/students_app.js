// JavaScript for handling interactions
document.addEventListener('DOMContentLoaded', function() {
    // Handle report issue button clicks
    const reportButtons = document.querySelectorAll('.reportIssue');
    reportButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const subject = row.querySelector('td:nth-child(2)').textContent;
        const marks = row.querySelector('td:nth-child(3)').textContent;
        const grade = row.querySelector('td:nth-child(4)').textContent;
  
        if (confirm(`Are you sure you want to report an issue with ${subject} (Marks: ${marks}, Grade: ${grade})?`)) {
          alert(`Issue reported for ${subject}. An administrator will review your concern.`);
        }
      });
    });
  
    // Handle view answer sheet links
    const viewAnswerSheets = document.querySelectorAll('.viewAnswerSheet');
    viewAnswerSheets.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const row = this.closest('tr');
        const subject = row.querySelector('td:nth-child(2)').textContent;
        alert(`Viewing answer sheet for ${subject}.`);
      });
    });
  
    // Handle compose message button
    const composeMessageButton = document.getElementById('composeMessage');
    composeMessageButton.addEventListener('click', function() {
      alert('Compose new message feature coming soon!');
    });
  
    // Handle logout button
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully!');
        // Redirect to login page or perform logout action
      }
    });
  });
  