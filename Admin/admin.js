// Hardcoded student data
let students = [
  {
    rollNo: '101',
    name: 'John Doe',
    branch: 'CSE',
    year: '2',
    fatherName: 'Robert Doe',
    age: 20,
    dob: '2003-05-15',
    address: '123 Main St, City',
    feeStatus: 'Paid',
  },
  {
    rollNo: '102',
    name: 'Jane Smith',
    branch: 'ECE',
    year: '3',
    fatherName: 'Michael Smith',
    age: 21,
    dob: '2002-08-22',
    address: '456 Elm St, Town',
    feeStatus: 'Pending',
  },
];

// Hardcoded teacher data
let teachers = [
  { id: 'T101', name: 'Prof. Alice Johnson', department: 'CSE' },
  { id: 'T102', name: 'Prof. Bob Brown', department: 'ECE' },
];

// Hardcoded answer sheets data
let answerSheets = [
  { rollNo: '101', name: 'John Doe', subject: 'Math', answerSheet: 'math_101.pdf' },
  { rollNo: '102', name: 'Jane Smith', subject: 'Science', answerSheet: 'science_102.pdf' },
];

// DOM Elements
const studentsTableBody = document.querySelector('#studentsTable tbody');
const teachersTableBody = document.querySelector('#teachersTable tbody');
const feeTableBody = document.querySelector('#feeTable tbody');
const answerSheetsTableBody = document.querySelector('#answerSheetsTable tbody');
const addStudentModal = document.getElementById('addStudentModal');
const addTeacherModal = document.getElementById('addTeacherModal');
const addStudentForm = document.getElementById('addStudentForm');
const addTeacherForm = document.getElementById('addTeacherForm');
const exportStudentsButton = document.getElementById('exportStudents');
const importStudentsButton = document.getElementById('importStudents');
const applyFiltersButton = document.getElementById('applyFilters');
const filterBranch = document.getElementById('filterBranch');
const filterYear = document.getElementById('filterYear');
const filterRollNo = document.getElementById('filterRollNo');
const uploadAnswerSheetButton = document.getElementById('uploadAnswerSheet');
const sendNotificationButton = document.getElementById('sendNotification');
const darkModeToggle = document.createElement('button');

// Open Add Student Modal
document.getElementById('addStudent').addEventListener('click', function () {
  addStudentModal.style.display = 'flex';
});

// Close Add Student Modal
document.querySelector('#addStudentModal .close').addEventListener('click', function () {
  addStudentModal.style.display = 'none';
});

// Open Add Teacher Modal
document.getElementById('addTeacher').addEventListener('click', function () {
  addTeacherModal.style.display = 'flex';
});

// Close Add Teacher Modal
document.querySelector('#addTeacherModal .close').addEventListener('click', function () {
  addTeacherModal.style.display = 'none';
});

// Add Student
addStudentForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const rollNo = document.getElementById('rollNo').value;
  const name = document.getElementById('name').value;
  const fatherName = document.getElementById('fatherName').value;
  const age = document.getElementById('age').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const branch = document.getElementById('branch').value;
  const year = document.getElementById('year').value;

  // Check if the roll number already exists
  const existingStudent = students.find(student => student.rollNo === rollNo);
  if (existingStudent) {
    alert('Student with this Roll No already exists!');
    return;
  }

  // Add new student
  students.push({ rollNo, name, branch, year, fatherName, age, dob, address, feeStatus: 'Pending' });
  populateStudentsTable(students);
  populateFeeTable(students);
  addStudentModal.style.display = 'none';
  addStudentForm.reset();
  alert('Student added successfully!');
});

// Add Teacher
addTeacherForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const id = document.getElementById('teacherId').value;
  const name = document.getElementById('teacherName').value;
  const department = document.getElementById('department').value;

  // Check if the teacher ID already exists
  const existingTeacher = teachers.find(teacher => teacher.id === id);
  if (existingTeacher) {
    alert('Teacher with this ID already exists!');
    return;
  }

  // Add new teacher
  teachers.push({ id, name, department });
  populateTeachersTable(teachers);
  addTeacherModal.style.display = 'none';
  addTeacherForm.reset();
  alert('Teacher added successfully!');
});

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
      <td>${student.fatherName}</td>
      <td>${student.age}</td>
      <td>${student.dob}</td>
      <td>${student.address}</td>
      <td>
        <button class="editStudent"><i class="fas fa-edit"></i> Edit</button>
        <button class="deleteStudent"><i class="fas fa-trash"></i> Delete</button>
      </td>
    `;
    studentsTableBody.appendChild(row);
  });

  // Add event listeners for edit and delete buttons
  document.querySelectorAll('.editStudent').forEach(button => {
    button.addEventListener('click', function () {
      const row = button.closest('tr');
      const rollNo = row.querySelector('td:nth-child(1)').textContent;
      const student = students.find(student => student.rollNo === rollNo);
      if (student) {
        editStudent(student);
      }
    });
  });

  document.querySelectorAll('.deleteStudent').forEach(button => {
    button.addEventListener('click', function () {
      const row = button.closest('tr');
      const rollNo = row.querySelector('td:nth-child(1)').textContent;
      deleteStudent(rollNo);
    });
  });
}

// Populate teachers table
function populateTeachersTable(data) {
  teachersTableBody.innerHTML = '';
  data.forEach(teacher => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${teacher.id}</td>
      <td>${teacher.name}</td>
      <td>${teacher.department}</td>
      <td>
        <button class="editTeacher"><i class="fas fa-edit"></i> Edit</button>
        <button class="deleteTeacher"><i class="fas fa-trash"></i> Delete</button>
      </td>
    `;
    teachersTableBody.appendChild(row);
  });

  // Add event listeners for edit and delete buttons
  document.querySelectorAll('.editTeacher').forEach(button => {
    button.addEventListener('click', function () {
      const row = button.closest('tr');
      const id = row.querySelector('td:nth-child(1)').textContent;
      const teacher = teachers.find(teacher => teacher.id === id);
      if (teacher) {
        editTeacher(teacher);
      }
    });
  });

  document.querySelectorAll('.deleteTeacher').forEach(button => {
    button.addEventListener('click', function () {
      const row = button.closest('tr');
      const id = row.querySelector('td:nth-child(1)').textContent;
      deleteTeacher(id);
    });
  });
}

// Edit Student
function editStudent(student) {
  document.getElementById('rollNo').value = student.rollNo;
  document.getElementById('name').value = student.name;
  document.getElementById('fatherName').value = student.fatherName;
  document.getElementById('age').value = student.age;
  document.getElementById('dob').value = student.dob;
  document.getElementById('address').value = student.address;
  document.getElementById('branch').value = student.branch;
  document.getElementById('year').value = student.year;

  addStudentModal.style.display = 'flex';
  addStudentForm.removeEventListener('submit', addStudentForm.submitHandler);
  addStudentForm.submitHandler = function (event) {
    event.preventDefault();
    const updatedStudent = {
      rollNo: document.getElementById('rollNo').value,
      name: document.getElementById('name').value,
      fatherName: document.getElementById('fatherName').value,
      age: document.getElementById('age').value,
      dob: document.getElementById('dob').value,
      address: document.getElementById('address').value,
      branch: document.getElementById('branch').value,
      year: document.getElementById('year').value,
      feeStatus: student.feeStatus,
    };

    const index = students.findIndex(s => s.rollNo === student.rollNo);
    students[index] = updatedStudent;
    populateStudentsTable(students);
    populateFeeTable(students);
    addStudentModal.style.display = 'none';
    addStudentForm.reset();
    alert('Student updated successfully!');
  };
  addStudentForm.addEventListener('submit', addStudentForm.submitHandler);
}

// Delete Student
function deleteStudent(rollNo) {
  if (confirm('Are you sure you want to delete this student?')) {
    students = students.filter(student => student.rollNo !== rollNo);
    populateStudentsTable(students);
    populateFeeTable(students);
    alert('Student deleted successfully!');
  }
}

// Edit Teacher
function editTeacher(teacher) {
  document.getElementById('teacherId').value = teacher.id;
  document.getElementById('teacherName').value = teacher.name;
  document.getElementById('department').value = teacher.department;

  addTeacherModal.style.display = 'flex';
  addTeacherForm.removeEventListener('submit', addTeacherForm.submitHandler);
  addTeacherForm.submitHandler = function (event) {
    event.preventDefault();
    const updatedTeacher = {
      id: document.getElementById('teacherId').value,
      name: document.getElementById('teacherName').value,
      department: document.getElementById('department').value,
    };

    const index = teachers.findIndex(t => t.id === teacher.id);
    teachers[index] = updatedTeacher;
    populateTeachersTable(teachers);
    addTeacherModal.style.display = 'none';
    addTeacherForm.reset();
    alert('Teacher updated successfully!');
  };
  addTeacherForm.addEventListener('submit', addTeacherForm.submitHandler);
}

// Delete Teacher
function deleteTeacher(id) {
  if (confirm('Are you sure you want to delete this teacher?')) {
    teachers = teachers.filter(teacher => teacher.id !== id);
    populateTeachersTable(teachers);
    alert('Teacher deleted successfully!');
  }
}

// Populate fee table
function populateFeeTable(data) {
  feeTableBody.innerHTML = '';
  data.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.rollNo}</td>
      <td>${student.name}</td>
      <td>${student.branch}</td>
      <td>${student.year}</td>
      <td>${student.feeStatus}</td>
      <td>
        <button class="updateFeeStatus"><i class="fas fa-check"></i> Update</button>
      </td>
    `;
    feeTableBody.appendChild(row);
  });

  // Add event listeners for update fee status buttons
  document.querySelectorAll('.updateFeeStatus').forEach(button => {
    button.addEventListener('click', function () {
      const row = button.closest('tr');
      const rollNo = row.querySelector('td:nth-child(1)').textContent;
      const student = students.find(student => student.rollNo === rollNo);
      if (student) {
        student.feeStatus = student.feeStatus === 'Paid' ? 'Pending' : 'Paid';
        populateFeeTable(students);
        alert(`Fee status updated for ${student.name}!`);
      }
    });
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

// Upload answer sheet
uploadAnswerSheetButton.addEventListener('click', function () {
  const file = document.getElementById('answerSheetFile').files[0];
  if (file) {
    const rollNo = prompt('Enter Roll No:');
    const name = prompt('Enter Student Name:');
    const subject = prompt('Enter Subject:');
    if (rollNo && name && subject) {
      answerSheets.push({ rollNo, name, subject, answerSheet: file.name });
      populateAnswerSheetsTable(answerSheets);
      alert('Answer sheet uploaded successfully!');
    }
  } else {
    alert('Please select a file.');
  }
});

// Send notification
sendNotificationButton.addEventListener('click', function () {
  const message = document.getElementById('notificationMessage').value;
  const recipient = document.getElementById('notificationRecipient').value;
  if (message) {
    alert(`Notification sent to ${recipient}: "${message}"`);
  } else {
    alert('Please enter a message.');
  }
});

// Dark mode toggle
darkModeToggle.id = 'darkModeToggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

// Initial load
document.addEventListener('DOMContentLoaded', function () {
  populateStudentsTable(students);
  populateTeachersTable(teachers);
  populateFeeTable(students);
  populateAnswerSheetsTable(answerSheets);
});