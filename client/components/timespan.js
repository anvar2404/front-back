import React from 'react'

const Timespan = ({ filterTime }) => {
  const time = ['day', 'week', 'month']
  return (
    <div className="flex space-between justify-center mb-2 header">
      <button type="button" className="px-2 mr-2 rounded" onClick={() => filterTime()}>
        All
      </button>
      {time.map((el) => (
        // eslint-disable-next-line react/jsx-key
        <button type="button" className="px-2 mr-2 rounded" onClick={() => filterTime(el)}>
          {el.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default Timespan
