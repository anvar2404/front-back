import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Timespan from './timespan'
import TasksListItem from './tasks-list-item'

const TasksList = ({ tasks, addTask, switchStatus, deleteTask, filterTime, saveTaskName }) => {
  const [taskInput, setTaskInput] = useState('')
  return (
    <div className="flex flex-col min-h-full">
      <Timespan filterTime={filterTime} />
      {tasks.map((task) => (
        <TasksListItem
          key={task.taskId}
          task={task}
          switchStatus={switchStatus}
          deleteTask={deleteTask}
          saveTaskName={saveTaskName}
        />
      ))}
      <div className="footer flex flex-col text-center">
        <div className="border-t border-b border-black border-solid">
          <input
            type="text"
            className="focus:outline-none"
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </div>
        <button type="button" className="block mx-auto py-4" onClick={() => addTask(taskInput)}>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 512 512"
          >
            <path
              d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
			v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"
            />
          </svg>
        </button>
        <Link to="/">Back</Link>
      </div>
    </div>
  )
}

export default TasksList
