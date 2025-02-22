// app.js

// Existing login logic...

// Helper function to check if on a specific page
function onPage(page) {
    return window.location.pathname.endsWith(page);
  }
  
  // Load student dashboard
  if (onPage('student.html')) {
    const username = sessionStorage.getItem('username');
    document.getElementById('studentName').textContent = username;
  
    // Simulate fetching grades
    const grades = [
      { subject: 'Mathematics', grade: 'A' },
      { subject: 'Science', grade: 'B+' },
      // Add more subjects as needed
    ];
  
    const gradesTable = document.getElementById('gradesTable');
  
    grades.forEach(item => {
      const row = gradesTable.insertRow();
      const cellSubject = row.insertCell(0);
      const cellGrade = row.insertCell(1);
      cellSubject.textContent = item.subject;
      cellGrade.textContent = item.grade;
    });
  
    // Handle issue reporting
    document.getElementById('reportForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const issue = document.getElementById('issue').value.trim();
      if (issue) {
        alert('Your issue has been reported.');
        document.getElementById('reportForm').reset();
      }
    });
  }
  
  // Load teacher dashboard
  if (onPage('teacher.html')) {
    const username = sessionStorage.getItem('username');
    document.getElementById('teacherName').textContent = username;
  
    // Handle marks uploading
    document.getElementById('marksForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const student = document.getElementById('student').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const grade = document.getElementById('grade').value.trim();
  
      if (student && subject && grade) {
        alert(`Marks for ${student} in ${subject} have been uploaded.`);
        document.getElementById('marksForm').reset();
      }
    });
  }
  
  // Load admin dashboard
  if (onPage('admin.html')) {
    const username = sessionStorage.getItem('username');
    document.getElementById('adminName').textContent = username;
  
    // Handle adding new users
    document.getElementById('addUserForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const role = document.getElementById('newRole').value;
      const newUsername = document.getElementById('newUsername').value.trim();
  
      if (role && newUsername) {
        users[role + 's'].push(newUsername);
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} ${newUsername} added successfully.`);
        document.getElementById('addUserForm').reset();
      }
    });
  
    // Handle exam uploads
    document.getElementById('uploadExamForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const examName = document.getElementById('examName').value.trim();
      const examFile = document.getElementById('examFile').files[0];
  
      if (examName && examFile) {
        alert(`Exam "${examName}" has been uploaded.`);
        document.getElementById('uploadExamForm').reset();
      }
    });
  }
// app.js

// Helper function to check current page
function onPage(page) {
    return window.location.pathname.endsWith(page);
  }
  
  if (onPage('student.html')) {
    const username = sessionStorage.getItem('username');
    document.getElementById('studentName').textContent = username;
  
    // Simulated data for demonstration
    const studentData = {
      semesters: [
        {
          semester: 'Semester 1',
          subjects: [
            {
              subject: 'Mathematics',
              marks: 95,
              grade: 'A',
              examCopy: 'math_sem1.pdf',
              teacherEmail: 'math_teacher@school.com'
            },
            {
              subject: 'Science',
              marks: 88,
              grade: 'B+',
              examCopy: 'science_sem1.pdf',
              teacherEmail: 'science_teacher@school.com'
            }
          ]
        },
        {
          semester: 'Semester 2',
          subjects: [
            {
              subject: 'Mathematics',
              marks: 92,
              grade: 'A',
              examCopy: 'math_sem2.pdf',
              teacherEmail: 'math_teacher@school.com'
            },
            {
              subject: 'Science',
              marks: 85,
              grade: 'B',
              examCopy: 'science_sem2.pdf',
              teacherEmail: 'science_teacher@school.com'
            }
          ]
        }
      ]
    };
  
    // Function to calculate GPA and percentage
    function calculateSemesterGrades() {
      const semesters = studentData.semesters;
      const semesterGrades = [];
  
      semesters.forEach(sem => {
        let totalMarks = 0;
        let totalSubjects = sem.subjects.length;
  
        sem.subjects.forEach(subject => {
          totalMarks += subject.marks;
        });
  
        const percentage = (totalMarks / (totalSubjects * 100)) * 100;
        const gpa = (percentage / 20).toFixed(2); // Simplistic GPA calculation
  
        semesterGrades.push({
          semester: sem.semester,
          gpa: gpa,
          percentage: percentage.toFixed(2)
        });
      });
  
      return semesterGrades;
    }
  
    // Populate Semester Grades Table
    function populateSemesterGrades() {
      const semesterGrades = calculateSemesterGrades();
      const semesterGradesTableBody = document.querySelector('#semesterGradesTable tbody');
  
      semesterGrades.forEach(semGrade => {
        const row = document.createElement('tr');
  
        const cellSemester = document.createElement('td');
        cellSemester.textContent = semGrade.semester;
        row.appendChild(cellSemester);
  
        const cellGPA = document.createElement('td');
        cellGPA.textContent = semGrade.gpa;
        row.appendChild(cellGPA);
  
        const cellPercentage = document.createElement('td');
        cellPercentage.textContent = semGrade.percentage + '%';
        row.appendChild(cellPercentage);
  
        semesterGradesTableBody.appendChild(row);
      });
    }
  
    // Populate Detailed Grades Table
    function populateSubjectGrades() {
      const gradesTableBody = document.querySelector('#gradesTable tbody');
      const issueSubjectSelect = document.getElementById('issueSubject');
  
      studentData.semesters.forEach(sem => {
        sem.subjects.forEach(subject => {
          const row = document.createElement('tr');
  
          const cellSubject = document.createElement('td');
          cellSubject.textContent = `${subject.subject} (${sem.semester})`;
          row.appendChild(cellSubject);
  
          const cellMarks = document.createElement('td');
          cellMarks.textContent = subject.marks;
          row.appendChild(cellMarks);
  
          const cellGrade = document.createElement('td');
          cellGrade.textContent = subject.grade;
          row.appendChild(cellGrade);
  
          const cellExamCopy = document.createElement('td');
          const link = document.createElement('a');
          link.href = `exam_copies/${subject.examCopy}`;
          link.target = '_blank';
          link.textContent = 'View Answer Sheet';
          cellExamCopy.appendChild(link);
          row.appendChild(cellExamCopy);
  
          const cellFeedback = document.createElement('td');
          const feedbackButton = document.createElement('button');
          feedbackButton.textContent = 'Send Feedback';
          feedbackButton.addEventListener('click', function() {
            openFeedbackModal(subject);
          });
          cellFeedback.appendChild(feedbackButton);
          row.appendChild(cellFeedback);
  
          gradesTableBody.appendChild(row);
  
          // Add subjects to the issue report dropdown
          const option = document.createElement('option');
          option.value = `${subject.subject} (${sem.semester})`;
          option.textContent = `${subject.subject} (${sem.semester})`;
          issueSubjectSelect.appendChild(option);
        });
      });
    }
  
    // Open Feedback Modal (Simplified as an alert for this example)
    function openFeedbackModal(subject) {
      const feedback = prompt(`Send feedback to ${subject.subject} teacher:`);
      if (feedback) {
        // Simulate sending feedback via email or storing it for the teacher
        alert(`Your feedback has been sent to the ${subject.subject} teacher.`);
      }
    }
  
    // Handle Report Form Submission
    function handleReportForm() {
      document.getElementById('reportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedSubject = document.getElementById('issueSubject').value;
        const issueDescription = document.getElementById('issueDescription').value.trim();
  
        if (issueDescription) {
          // Simulate sending the report
          alert(`Your issue for ${selectedSubject} has been submitted.`);
          // Reset the form
          e.target.reset();
        } else {
          alert('Please describe the issue.');
        }
      });
    }
  
    // Handle Logout
    function handleLogout() {
      document.getElementById('logout').addEventListener('click', function() {
        sessionStorage.clear();
        window.location.href = 'index.html';
      });
    }
  
    // Initialize the Student Dashboard
    function initStudentDashboard() {
      populateSemesterGrades();
      populateSubjectGrades();
      handleReportForm();
      handleLogout();
    }
  
    // Run the initialization
    initStudentDashboard();
  }
  
  