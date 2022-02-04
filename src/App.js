
import './App.css';

function App() {
  return (
    <div className="App">
    <form action="">
      <h1>Create Mentor</h1>
      <label for="mid">Mentor id:</label>
  <input type="text" id="mid" name="mid" placeholder='Mentor id' />
  <label for="name">Mentor name:</label>
  <input type="text" id="name" name="name" placeholder='Mentor name' />
  <label for="skill">Mentor Skill:</label>
  <input type="text" id="skill" name="skill" placeholder='Mentor skill' />
  <button type="submit" value="Submit" >Submit</button>
</form>
<form action="">
      <h1>Create Student</h1>
      <label for="sid"> Student id:</label>
  <input type="text" id="sid" name="sid" placeholder='Student id' />
  <label for="sname"> Student name:</label>
  <input type="text" id="sname" name="sname" placeholder='Student name' />
  <label for="email">Student Email:</label>
  <input type="text" id="email" name="email" placeholder='Student email' />
  <button type="submit" value="Submit">Submit</button>
</form>
<div><h1>Show Students for a mentor</h1>

</div>
    </div>
  );
}

export default App;
