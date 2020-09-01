import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryList = ({ categories, addCategory }) => {
  const [categoryInput, setCategory] = useState('')
  return (
    <div>
      <h2>
        {categories.map((category, index) => (
          <div key={index}>
            <Link to={`/${category}`}>{category}</Link>
          </div>
        ))}
      </h2>
      <input type="text" onChange={(e) => setCategory(e.target.value)} />
      <button type="button" onClick={() => addCategory(categoryInput)}>
        add category
      </button>
    </div>
  )
}

export default CategoryList
