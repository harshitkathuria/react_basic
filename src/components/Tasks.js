import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    // tasks.push() is wrong because state is immutable
    <>
      { tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={() => onDelete(task.id)} onToggle={onToggle} />
      )) }
    </>
  )
}

export default Tasks;