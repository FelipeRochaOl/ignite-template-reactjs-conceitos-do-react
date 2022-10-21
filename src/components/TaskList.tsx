import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      setError('Título não pode ficar em branco');
      return;
    }
    let countTasks = tasks.length;
    const newTask: Task = {
      id: countTasks++,
      title: newTaskTitle,
      isComplete: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setError('');
  }

  function handleToggleTaskCompletion(id: number) {
    const task = tasks.find(task => task.id === id);
    if (!task) {
      setError('Tarefa não encontrada');
      return;
    }
    task as Task;
    task.isComplete = !task.isComplete;
    setTasks([...tasks]);
    setError('');
  }

  function handleRemoveTask(id: number) {
    const reduceTasks = tasks.reduce((previous: Task[], current) => {             
      if (current.id !== id) previous.push(current);
      return previous;
    }, []);
    setTasks(reduceTasks);
    setError('');
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <div className='input-error'>
            <input 
              type="text"
              className={error ? 'error' : ''}
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            </div>
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>
      

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}