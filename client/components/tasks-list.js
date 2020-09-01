import React, { useState } from 'react'
import {Link} from "react-router-dom";
import Timespan from './timespan'

const TasksList = ({ tasks, addTask, switchStatus, deleteTask, filterTime }) => {
  const [taskInput, setTaskInput] = useState('')
  return (
    <div className="flex flex-col min-h-full">
      <Timespan filterTime={filterTime} />
      <div className="py-8">
        {tasks.map((task) => (
          <div key={task.taskId} className="flex justify-between mb-2">
            {task.title}
            {task.status === 'new' && (
              <button
                type="button"
                onClick={() => switchStatus(task.taskId, 'in progress')}
                className="p-1 ml-2 bg-gray-400"
              >
                In progress
              </button>
            )}
            {task.status === 'in progress' && (
              <div>
                <button
                  type="button"
                  onClick={() => switchStatus(task.taskId, 'blocked')}
                  className="p-1 ml-2 bg-red-400"
                >
                  Blocked
                </button>
                <button
                  type="button"
                  onClick={() => switchStatus(task.taskId, 'done')}
                  className="p-1 ml-2 bg-green-400"
                >
                  Done
                </button>
              </div>
            )}
            {task.status === 'blocked' && (
              <button
                type="button"
                onClick={() => switchStatus(task.taskId, 'in progress')}
                className="p-1 ml-2 bg-teal-400"
              >
                Unblock
              </button>
            )}
            {task.status === 'done' && (
              <button
                type="button"
                onClick={() => deleteTask(task.taskId)}
                className="p-1 ml-2 bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
        <div className="footer flex flex-col text-center">
            <input type="text" onChange={(e) => setTaskInput(e.target.value)} />
            <button type="button" onClick={() => addTask(taskInput)}>
                add task
            </button>
            <Link to="/">Back</Link>
        </div>
    </div>
  )
}

export default TasksList
