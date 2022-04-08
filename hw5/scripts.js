'use-strict';

const students = [
    {
        id:10,
        name: 'John Smith',
        marks: [10, 8, 6, 9, 8, 7 ]
    },
    {
        id:11,
        name: 'John Doe',
        marks: [ 9, 8, 7, 6, 7 ]
    },
    {
        id:12,
        name: 'Thomas Anderson',
        marks: [6, 7, 10, 8 ]
    },
    {
        id:13,
        name: 'Jean-Baptiste Emanuel Zorg',
        marks: [10, 9, 8, 9 ]
    }
]
// averageStudentMark(students[2]);
// averageGroupMark(students);

let averageMark = students.reduce((acc, average) => (acc + average.marks[2]), 0) / students.length;

console.log(averageMark);

let averageGroupMarks = students.reduce((acc, average) => acc.concat(average.marks), []);

let averageGroupMark = averageGroupMarks.reduce((acc,average)=> acc + average) / averageGroupMarks.length;


console.log(averageGroupMark);