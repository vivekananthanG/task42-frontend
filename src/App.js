import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Mentor />
      <Student />
      <Studentformentor />
      <Changementor/>
      <Withoutmentor />
      <Assignmultiplestudent />
    </div>
  );
}

export default App;

function Mentor() {
  const [mentor_name, setName] = useState("");
  const [id, setId] = useState("");
  const [skill, setSkill] = useState("");
  const addMentor = () => {
    const newMentor = {
      id:+id,
      mentor_name,
      skill,
    };

    console.log(newMentor);
    console.log("Vivek");

    fetch("http://assign-mentorapi.herokuapp.com/mentors", {
      method: "POST",
      body: JSON.stringify(newMentor),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then(alert("Mentor created"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Create Mentor</h1>
      <label htmlFor="mid">Mentor id:</label>
      <input
        type="number"
        id="mid"
        name="mid"
        onChange={(event) => setId(event.target.value)}
        value={id}
        placeholder="Mentor id"
      />
      <label htmlFor="name">Mentor name:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(event) => setName(event.target.value)}
        value={mentor_name}
        placeholder="Mentor name"
      />
      <label htmlFor="skill">Mentor Skill:</label>
      <input
        type="text"
        id="skill"
        name="skill"
        onChange={(event) => setSkill(event.target.value)}
        value={skill}
        placeholder="Mentor skill"
      />
      <button onClick={addMentor}>Submit</button>
    </div>
  );
}

function Student() {
  const [id, setId] = useState("");
  const [student_name, setName] = useState("");
  const [student_email, setEmail] = useState("");
  const addStudent = () => {
    const newStudent = {
      id:+id,
      student_name,
      student_email,
    };

    console.log(newStudent);
    console.log("Vivek");

    fetch("http://assign-mentorapi.herokuapp.com/students", {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then(alert("Student created"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Create Student</h1>
      <label htmlFor="sid"> Student id:</label>
      <input
        type="number"
        id="sid"
        name="sid"
        onChange={(event) => setId(event.target.value)}
        value={id}
        placeholder="Student id"
      />
      <label htmlFor="sname"> Student name:</label>
      <input
        type="text"
        id="sname"
        name="sname"
        onChange={(event) => setName(event.target.value)}
        value={student_name}
        placeholder="Student name"
      />
      <label htmlFor="email">Student Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        value={student_email}
        placeholder="Student email"
      />
      <button onClick={addStudent}>Submit</button>
    </div>
  );
}

function Studentformentor() {
  const [mentors, setMentors] = useState([]);
  const [value, setValues] = useState();

  const getMentors = () => {
    fetch(`http://assign-mentorapi.herokuapp.com/mentors/`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((ment) => setMentors(ment))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getMentors, []);

 

  return (
    <div>
      <h1>Show Students for a mentor</h1>
      <label htmlFor="mentor">Choose a Mentor:</label>
      <select
        name="mentor"
        id="mentor"
        onChange={(event) => setValues(event.target.value)}
      >
        <option value="select">Select a Mentor</option>
        {mentors.map(({ id, mentor_name, skill }, i) => (
          <option key={i} value={id}>
            {mentor_name},{skill}
          </option>
        ))}
      </select>
      {(value>0)?<Studentlist value={value}/>:<p>No students found</p>}
    </div>
  );
}

function Studentlist({value}) {
  const [student, setStudent] = useState([]);
  const getMentors = () => {
    fetch(`http://assign-mentorapi.herokuapp.com/students/mentor/${value}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((stu) => setStudent(stu))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getMentors, [value]);

  return (<div className="student">
    {student.length>0?student.map(({id,student_name,student_email},i)=>(<p key={i}>{id},{student_name},{student_email}</p>)):<p>No students found</p>}
  </div>);
}

function Changementor(){
  
  const [student, setStudent] = useState([]);
  const [value, setValues] = useState();

  const getStudent = () => {
    fetch(`http://assign-mentorapi.herokuapp.com/students/`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((stu) => setStudent(stu))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getStudent, []);

 

  return (
    <div>
      <h1>Assign or Change Mentor for particular Student</h1>
      <label htmlFor="mentor">Choose a Student:</label>
      <select
        name="student"
        id="student"
        onChange={(event) => setValues(event.target.value)}
      >
        <option value="select">Select a Student</option>
        {student.map(({ id, student_name, student_email }, i) => (
          <option key={i} value={id}>
            {student_name},{student_email}
          </option>
        ))}
      </select>
      {(value>0)?<Assignmentor value={value}/>:<p>No students Selected</p>}
    </div>
  );
}

function Assignmentor({value}){
  const [mentors, setMentors] = useState([]);
  const [value1, setValues] = useState();

  const getMentors = () => {
    fetch(`http://assign-mentorapi.herokuapp.com/mentors/`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((ment) => setMentors(ment))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getMentors, []);

  const updateMentor = () => {
    const newMentor = {
      "mentor_id":value1
    };

    console.log(newMentor);
    console.log("Vivek");
    console.log(value);
    console.log(`http://assign-mentorapi.herokuapp.com/students/${value}`);

    fetch(`http://assign-mentorapi.herokuapp.com/students/${value}`, {
      method: "PUT",
      body: JSON.stringify(newMentor),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then(alert("Mentor updated"))
      .catch((err) => {
        console.log(err);
      });
  };

  return( <div>
    
    <label htmlFor="mentor">Assign a Mentor:</label>
    <select
      name="mentor"
      id="mentor"
      onChange={(event) => setValues(event.target.value)}
    >
      <option value="select">Select a Mentor</option>
      {mentors.map(({ id, mentor_name, skill }, i) => (
        <option key={i} value={id}>
          {mentor_name},{skill}
        </option>
      ))}
    </select>
    <button onClick={updateMentor}>Submit</button>
    
  </div>);
}

function Withoutmentor(){

  const [student, setStudent] = useState([]);
  const getStudent = () => {
    fetch(`http://assign-mentorapi.herokuapp.com/students/withoutmentor/`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((stu) => setStudent(stu))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getStudent, []);

  return (<div className="student">
    <h1>Students with No Mentor</h1>
    {student.length>0?student.map(({id,student_name,student_email},i)=>(<p key={i}>{id},{student_name},{student_email}</p>)):<p>No students found</p>}
  </div>);

}

function Assignmultiplestudent(){
  const [mid, setMid] = useState();
  const [sid, setSid] = useState([]);
  
  const addMentor = () => {
const newStudent=sid.split(',').map(Number);
  //   const newStudent = [
  //     data
  // ];
   

    fetch(`http://assign-mentorapi.herokuapp.com/mentors/assignmentor/${+mid}`, {
      method: "PUT",
      body: JSON.stringify(newStudent),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then(alert("Mentor assigned"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Create Student</h1>
      <label htmlFor="mid"> Mentor id to assign:</label>
      <input
        type="number"
        id="mid"
        name="mid"
        onChange={(event) => setMid(event.target.value)}
        value={mid}
        placeholder="Mentor id eg:1"
      />
      <label htmlFor="sid"> Student ids to map:</label>
      <input
        type="text"
        id="sid"
        name="sid"
        onChange={(event) => setSid(event.target.value)}
        value={sid}
        placeholder="Student ids eg:102,103"
      />
      <div>
      <button onClick={addMentor}>Submit</button>
      </div>
    </div>
  );
}