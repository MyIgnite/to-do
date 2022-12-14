import { useState } from 'react';

import '../styles/tasklist.scss';

import toast from 'react-hot-toast';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  /**
   * Crie uma nova task com um id random, não permita
   * criar caso o título seja vazio.
   */

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const newTaskTitleEmpty = !newTaskTitle
    
    if(newTaskTitleEmpty) {
      toast.error('Adcione um título a tarefa!', { icon: '❗' });
      return
    }

    const repeatedTask = tasks.filter(({title}: Task) => title === newTaskTitle)

    if(repeatedTask.length) {
      toast.error('Existe uma tarefa com esse título!', { icon: '❗' });
      return
    }

    setTasks([
      ...tasks, {
        id: new Date().getTime(),
        title: newTaskTitle,
        isComplete: false
      }
    ])

    toast.success('Tarefa criada');

    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    /**
    * Altere entre `true` ou `false` o campo `isComplete`
    * de uma task com dado ID
    */

    tasks.find(task => {
      if(task.id === id) {
        task.isComplete = !task.isComplete
      }
    })

    setTasks([
      ...tasks
    ])
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTasks = tasks.filter(task => task.id !== id)

    setTasks([
      ...newTasks
    ])

    toast.success('Tarefa deletada');
  }
  

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
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