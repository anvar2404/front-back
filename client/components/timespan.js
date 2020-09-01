import React from 'react'

const Timespan = ({ filterTime }) => {
  return (
    <div className="flex space-between justify-center mb-2 header">
      <button type="button" className="px-2 bg-teal-400 mr-2 rounded" onClick={() => filterTime()}>
        All
      </button>
      <button
        type="button"
        className="px-2 bg-teal-400 mr-2 rounded"
        onClick={() => filterTime('day')}
      >
        Day
      </button>
      <button
        type="button"
        className="px-2 bg-teal-400 mr-2 rounded"
        onClick={() => filterTime('week')}
      >
        Week
      </button>
      <button
        type="button"
        className="px-2 bg-teal-400 mr-2 rounded"
        onClick={() => filterTime('month')}
      >
        Month
      </button>
    </div>
  )
}

export default Timespan
