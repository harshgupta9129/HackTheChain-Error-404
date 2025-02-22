// Hardcoded student data
const students = [
    { rollNo: '101', name: 'John Doe', branch: 'CSE', year: '1', marks: 85, grade: 'A' },
    { rollNo: '102', name: 'Jane Smith', branch: 'ECE', year: '1', marks: 78, grade: 'B+' },
    { rollNo: '103', name: 'Alice Johnson', branch: 'AIDE', year: '1', marks: 92, grade: 'A-' },
    { rollNo: '104', name: 'Bob Brown', branch: 'CSE', year: '1', marks: 88, grade: 'B' },
    { rollNo: '105', name: 'Rohit sharma', branch: 'AIDE', year: '1', marks: 81, grade: 'B' },
    {rollNo: '106', name: 'Jatin Agarwal', branch: 'CSE', year: '1', marks: 75, grade: 'B-'},
    {rollNo: '107', name: 'Gaurav Gupta', branch: 'CSE', year: '1', marks: 95, grade: 'A'},
    {rollNo: '108', name: 'harsh Gupta', branch: 'ECE', year: '1', marks: 88, grade: 'B'},
    {rollNo: '109', name: 'Raghav Gupta', branch: 'ECE', year: '1', marks: 97, grade: 'A'},
  ];
  
  // Hardcoded reports data
  const reports = [
    { rollNo: '101', name: 'John Doe', subject: 'Math', issue: 'Marks discrepancy', status: 'Pending' },
    { rollNo: '102', name: 'Jane Smith', subject: 'Science', issue: 'Grade incorrect', status: 'Resolved' },
    { rollNo: '103', name: 'Alice Johnson', subject: 'History', issue: 'Answer sheet missing', status: 'Pending' },
  ];
  
  // Hardcoded answer sheets data
  const answerSheets = [
    { rollNo: '101', name: 'John Doe', subject: 'Math', answerSheet: 'math_101.pdf' },
    { rollNo: '102', name: 'Jane Smith', subject: 'Science', answerSheet: 'science_102.pdf' },
    { rollNo: '103', name: 'Alice Johnson', subject: 'History', answerSheet: 'history_103.pdf' },
  ];
  
  // DOM Elements
  const studentsTableBody = document.querySelector('#studentsTable tbody');
  const reportsTableBody = document.querySelector('#reportsTable tbody');
  const answerSheetsTableBody = document.querySelector('#answerSheetsTable tbody');
  const filterBranch = document.getElementById('filterBranch');
  const filterYear = document.getElementById('filterYear');
  const filterRollNo = document.getElementById('filterRollNo');
  const applyFiltersButton = document.getElementById('applyFilters');
  const autoGradeButton = document.getElementById('autoGrade');
  const filterSubject = document.getElementById('filterSubject');
  const filterStudentName = document.getElementById('filterStudentName');
  const applyAnswerFiltersButton = document.getElementById('applyAnswerFilters');
  const totalStudentsElement = document.getElementById('totalStudents');
  const pendingReportsElement = document.getElementById('pendingReports');
  const classAverageElement = document.getElementById('classAverage');
  const topStudentElement = document.getElementById('topStudent');
  const subjectAveragesElement = document.getElementById('subjectAverages');
  
  // Function to calculate class average
  function calculateClassAverage() {
    const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
    return (totalMarks / students.length).toFixed(2);
  }
  
  // Function to find the top-performing student
  function findTopStudent() {
    return students.reduce((top, student) => (student.marks > top.marks ? student : top), students[0]);
  }
  
  // Function to calculate subject-wise averages
  function calculateSubjectAverages() {
    const subjects = {};
    students.forEach(student => {
      if (!subjects[student.subject]) {
        subjects[student.subject] = { total: 0, count: 0 };
      }
      subjects[student.subject].total += student.marks;
      subjects[student.subject].count += 1;
    });
  
    return Object.entries(subjects).map(([subject, data]) => {
      return `${subject}: ${(data.total / data.count).toFixed(2)}%`;
    });
  }
  
  // Populate students table
  function populateStudentsTable(data) {
    studentsTableBody.innerHTML = '';
    data.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.rollNo}</td>
        <td>${student.name}</td>
        <td>${student.branch}</td>
        <td>${student.year}</td>
        <td>${student.marks}</td>
        <td>${student.grade}</td>
        <td><button class="editMarks"><i class="fas fa-edit"></i> Edit</button></td>
      `;
      studentsTableBody.appendChild(row);
    });
  }
  
  // Populate reports table
  function populateReportsTable(data) {
    reportsTableBody.innerHTML = '';
    data.forEach(report => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${report.rollNo}</td>
        <td>${report.name}</td>
        <td>${report.subject}</td>
        <td>${report.issue}</td>
        <td>${report.status}</td>
        <td><button class="resolveReport"><i class="fas fa-check"></i> Resolve</button></td>
      `;
      reportsTableBody.appendChild(row);
    });
  }
  
  // Populate answer sheets table
  function populateAnswerSheetsTable(data) {
    answerSheetsTableBody.innerHTML = '';
    data.forEach(sheet => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${sheet.rollNo}</td>
        <td>${sheet.name}</td>
        <td>${sheet.subject}</td>
        <td><a href="answer_sheets/${sheet.answerSheet}" target="_blank"><i class="fas fa-file-pdf"></i> View</a></td>
      `;
      answerSheetsTableBody.appendChild(row);
    });
  }
  
  // Apply filters for students
  applyFiltersButton.addEventListener('click', function () {
    const branch = filterBranch.value;
    const year = filterYear.value;
    const rollNo = filterRollNo.value.trim();
  
    const filteredStudents = students.filter(student => {
      return (!branch || student.branch === branch) &&
             (!year || student.year === year) &&
             (!rollNo || student.rollNo.includes(rollNo));
    });
  
    populateStudentsTable(filteredStudents);
  });
  
  // Apply filters for answer sheets
  applyAnswerFiltersButton.addEventListener('click', function () {
    const subject = filterSubject.value;
    const studentName = filterStudentName.value.trim();
  
    const filteredSheets = answerSheets.filter(sheet => {
      return (!subject || sheet.subject === subject) &&
             (!studentName || sheet.name.toLowerCase().includes(studentName.toLowerCase()));
    });
  
    populateAnswerSheetsTable(filteredSheets);
  });
  
  // Auto-grade students
  autoGradeButton.addEventListener('click', function () {
    students.forEach(student => {
      if (student.marks >= 90) student.grade = 'A';
      else if (student.marks >= 80) student.grade = 'B';
      else if (student.marks >= 70) student.grade = 'C';
      else if (student.marks >= 60) student.grade = 'D';
      else student.grade = 'F';
    });
    populateStudentsTable(students);
    alert('Grades assigned successfully!');
  });
  
  // Resolve report
  reportsTableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('resolveReport')) {
      const row = event.target.closest('tr');
      const rollNo = row.querySelector('td:nth-child(1)').textContent;
      const report = reports.find(report => report.rollNo === rollNo);
      if (report) {
        report.status = 'Resolved';
        populateReportsTable(reports);
        alert(`Report for ${report.name} resolved successfully!`);
      }
    }
  });
  
  // Edit marks
  studentsTableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('editMarks')) {
      const row = event.target.closest('tr');
      const rollNo = row.querySelector('td:nth-child(1)').textContent;
      const student = students.find(student => student.rollNo === rollNo);
      if (student) {
        const newMarks = prompt(`Enter new marks for ${student.name}:`, student.marks);
        if (newMarks !== null && !isNaN(newMarks)) {
          student.marks = parseFloat(newMarks);
          populateStudentsTable(students);
          alert(`Marks updated for ${student.name}!`);
        }
      }
    }
  });
  
  // Initial load
  document.addEventListener('DOMContentLoaded', function () {
    populateStudentsTable(students);
    populateReportsTable(reports);
    populateAnswerSheetsTable(answerSheets);
  
    // Update dashboard stats
    totalStudentsElement.textContent = students.length;
    pendingReportsElement.textContent = reports.filter(report => report.status === 'Pending').length;
    classAverageElement.textContent = `${calculateClassAverage()}%`;
  
    // Update top student
    const topStudent = findTopStudent();
    topStudentElement.textContent = `${topStudent.name} - ${topStudent.marks}%`;
  
    // Update subject-wise averages
    const subjectAverages = calculateSubjectAverages();
    subjectAveragesElement.innerHTML = subjectAverages.map(avg => `<li>${avg}</li>`).join('');
  });
  // Add Marks Modal Functionality
const addMarksModal = document.getElementById('addMarksModal');
const addMarksButton = document.getElementById('addStudentMarks');
const closeModal = document.querySelector('.close');
const addMarksForm = document.getElementById('addMarksForm');

// Open modal
addMarksButton.addEventListener('click', () => {
  addMarksModal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
  addMarksModal.style.display = 'none';
});

// Submit form
addMarksForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const rollNo = document.getElementById('rollNo').value;
  const name = document.getElementById('name').value;
  const branch = document.getElementById('branch').value;
  const year = document.getElementById('year').value;
  const marks = parseFloat(document.getElementById('marks').value);

  // Add new student
  students.push({ rollNo, name, branch, year, marks, grade: '' });
  populateStudentsTable(students);
  updateDashboardStats();
  addMarksModal.style.display = 'none';
  addMarksForm.reset();
  alert('Student marks added successfully!');
});