import React, { useState } from 'react'

const TasksListItem = ({ task, switchStatus, deleteTask, saveTaskName }) => {
  const [showButton, setShowButton] = useState(false)
  const [taskName, setTaskName] = useState(task.title)
  const handleTaskName = () => {
    saveTaskName(taskName, task.taskId)
    setShowButton(false)
  }
  return (
    <div>
      <div className="py-4">
        <div className="flex justify-between items-center mb-2">
          {!showButton ? (
            <div className="flex justify-center items-center">
              <button type="button" onClick={() => setShowButton(true)} className="p-1 mr-2">
                <svg
                  height="25px"
                  viewBox="-15 -15 484.00019 484"
                  width="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0" />
                </svg>
              </button>
              <div className="font-bold text-xl">{task.title}</div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button type="button" onClick={handleTaskName} className="p-1 mr-2">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  width="25px"
                  viewBox="0 0 426.667 426.667"
                >
                  <path
                    d="M421.876,56.307c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42L119.257,334.375
			l-90.334-90.334c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.713l102.4,102.4
			c6.665,6.663,17.468,6.663,24.132,0L421.456,80.44C428.236,73.891,428.424,63.087,421.876,56.307z"
                  />
                </svg>
              </button>
              <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div>
          )}
          {task.status === 'new' && (
            <button
              type="button"
              onClick={() => switchStatus(task.taskId, 'in progress')}
              className="p-1 ml-2"
            >
              In progress
            </button>
          )}
          {task.status === 'in progress' && (
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={() => switchStatus(task.taskId, 'blocked')}
                className="p-1 ml-2"
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  width="25px"
                  viewBox="0 0 215.455 215.455"
                >
                  <path
                    d="M107.728,0.001C48.325,0.001,0,48.329,0,107.732c0.005,59.397,48.332,107.722,107.728,107.722
	c59.401,0,107.728-48.324,107.728-107.723C215.455,48.329,167.129,0.001,107.728,0.001z M107.728,15.001
	c22.021,0,42.269,7.721,58.192,20.592L35.593,165.919C22.724,149.997,15.002,129.75,15,107.731
	C15,56.6,56.598,15.001,107.728,15.001z M107.728,200.454c-23.718,0-45.381-8.956-61.797-23.658L176.796,45.931
	c14.703,16.416,23.659,38.081,23.659,61.801C200.455,158.859,158.857,200.454,107.728,200.454z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => switchStatus(task.taskId, 'done')}
                className="p-1 ml-2"
              >
                Done
              </button>
            </div>
          )}
          {task.status === 'blocked' && (
            <button
              type="button"
              onClick={() => switchStatus(task.taskId, 'in progress')}
              className="p-1 ml-2"
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 512 512"
              >
                <path
                  d="M288.502,32.502c-108.328,0-198.827,77.485-219.166,179.899l-42.482-53.107L0,180.784l68.769,85.961
			c3.352,4.178,8.338,6.447,13.427,6.447c2.596,0,5.226-0.585,7.685-1.805l103.153-51.577l-15.387-30.757l-75.8,37.892
			c14.063-90.5,92.27-160.059,186.655-160.059c104.271,0,189.114,84.843,189.114,189.114s-84.843,189.114-189.114,189.114v34.384
			C411.735,479.498,512,379.233,512,256S411.735,32.502,288.502,32.502z"
                />
              </svg>
            </button>
          )}
          {task.status === 'done' && (
            <button type="button" onClick={() => deleteTask(task.taskId)} className="p-1 ml-2">
              <svg
                height="25px"
                viewBox="-40 0 427 427.00131"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default TasksListItem