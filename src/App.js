import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'
import About from './components/About';

// App component (function)
function App() {

  // const name = 'Hello';

  /*
  
  const [text, setText] = useState('hello');

  ...text is a state variable and useState hook is used to manage it...

  ...Here 'hello' is the default value of text
  and setText is used change or do any activity associated woth text...
  ...We cannot do text = 'bye' as text is a state and it is immutable, so to do this we do setText('bye')...

  ...setText(val) will return val to text, i.e., it will
  update text value to val...
  
   */


  const [showAddTask, setShowAddTask] = useState(false);
  // Used when we something to happen when the page loads
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      // set tasks state variable to tasksFromServer
      setTasks(tasksFromServer);
    } 

    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // global state --> can be used in other components as well
  const [tasks, setTasks] = useState([])

  // Add Task
  const addTask = async (task) => {
    // const id = tasks.length + 1;
    // const newTask = {id, ...task };
    // setTasks([...tasks, newTask]);

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    // combine the old tasks array and the new tasks and assign it to the tasks state variable
    setTasks([...tasks, data]);

  }

  // Delete Task
  const deleteTask = async (id) => {
    // console.log('delete', id);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    // Return an array(modify tasks array) which contains all the non deleted task
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async  (id) => {
    // get the task
    const taskToToggle = await fetchTask(id);
    // toggle its reminder
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    // Update it in the DB
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();
    
    // console.log(id);
    // if the id of the task is the id of the task that we double clicked, then update the task to a new task where the reminder is toggled (i.e, the data that we get from DB here )

    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: data.reminder} : task))
  }

  return (
    // JSX - Javascript Syntax Extension (similar to HTML)
    // replace class with className
    // JSX must return a single parent element
    /* Can return empty tag 
      <>
      <>
    */ 

    // To use Route embed everything in Router (BrowserRouter)

   <Router>
      <div className="container">
        <Header onAdd={() => {setShowAddTask(!showAddTask)}} showAdd={showAddTask}/>

        {/* Show the form and tasks only when we are the main page */}
        <Route path="/" exact render={(props) => (
          <>
          {/* If showAddtask is true then show AddTask Component */}
          {showAddTask && <AddTask onAdd={addTask} /> }
          { tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder }/>) : 'No Tasks to show' }
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

// Class based
// class App extends React.Component {
//   render() {
//     return <Header />
//   }
// }

export default App;