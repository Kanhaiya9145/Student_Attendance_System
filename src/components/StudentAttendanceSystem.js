import { useState, useEffect } from "react";

const StudentAttendanceSystem = () => {
  // Initialize the list of present students and numberOfStudent
  const [students, setStudents] = useState([]);
  const [numberOfStudents, setNumStudents] = useState([0]);

  // Use effect to update the number of students
  useEffect(() => {
    setNumStudents(students.length);
  }, [students]);

  // Add a new student to the list of present students
  const checkIn = (rollNumber, name) => {
    setStudents([...students, { rollNumber, name, checkInTime: new Date() }]);
  };

  // Update the check-out time for a student
  const checkOut = (rollNumber) => {
    setStudents(
      students.map((student) => {
        if (student.rollNumber === rollNumber) {
          return { ...student, checkOutTime: new Date() };
        }
        return student;
      })
    );
  };

  return (
    <div className="w-90 h-80vh mx-auto pt-8">
       <h1 className="text-center text-4xl font-bold text-yellow-600 py-4">Student Attendance System</h1>
      <h3 className="text-center text-lg font-bold mb-8">{new Date().toLocaleDateString()}</h3>
      <form className="w-40 h-1/2 mx-auto flex flex-col items-center justify-center mb-7 bg-sky-400 rounded-md sm:w-96 md:w-64 form"
        onSubmit={(e) => {
          e.preventDefault();
          checkIn(e.target.rollNumber.value, e.target.name.value);
        }}
      >
        <label className="text-gray-100 text-lg pb-1 flex flex-col mb-4 font-bold">
          Name:
          <input type="text" className="h-9 text-base border border-gray-300 rounded mt-1 px-4 py-2  text-purple-500" name="name" />
        </label>
        <label className="text-gray-100 text-lg pb-1 flex flex-col mb-4 font-bold">
          Roll Number:
          <input type="number" className="h-9 text-base border border-gray-300 rounded mt-1 px-4 py-2 text-purple-500" name="rollNumber" />
        </label>
        
        <button type="submit" className="bg-transparent hover:bg-green-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Check In</button>
      </form>
      <h2 className="text-center font-bold">
        There are currently {numberOfStudents} students present in the school.
      </h2>
      <table className="border-collapse w-80 text-center mx-auto md:w-auto mt-4 table ">
        <thead className="hidden md:table-header-group thead">
          <tr className="bg-blue-500 text-white md:table-row tr">
            <th className="border px-8 py-4">Name</th>
            <th className="border px-8 py-4">Roll Number</th>
            <th className="border px-8 py-4">Checked in at</th>
            <th className="border px-8 py-4">Checked out at</th>
            <th className="border px-8 py-4">Check out</th>
          </tr>
        </thead>
        {students.map((student) => (
          <tr key={student.rollNumber} className="bg-gray-200 md:table-row tr">
            <td className="border px-8 py-4 md:table-cell">{student.name}</td>
            <td className="border px-8 py-4 md:table-cell">{student.rollNumber}</td>
            <td className="border px-8 py-4 md:table-cell">
              <span> {student.checkInTime.toLocaleTimeString()}</span>
            </td>
            <td className="border px-8 py-4 md:table-cell">
              <span>
                {" "}
                {student.checkOutTime
                  ? student.checkOutTime.toLocaleTimeString()
                  : "Present"}
              </span>
            </td>
            <td className="border px-8 py-4 md:table-cell">
              <button onClick={() => checkOut(student.rollNumber)} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                Check Out
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default StudentAttendanceSystem;
