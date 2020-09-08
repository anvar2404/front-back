import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, useParams } from 'react-router-dom'
import CategoryList from './category-list'
import TasksList from './tasks-list'
import Header from './Header'

const Home = () => {
  const { category } = useParams()
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    axios(`/api/v1/categories`).then(({ data }) => setCategories(data))
    if (category) {
      axios(`/api/v1/tasks/${category}`).then(({ data }) => setTasks(data))
    }
  }, [])
  const addTask = (newTask) => {
    axios
      .post(`/api/v1/tasks/${category}`, { title: newTask })
      .then(({ data }) => setTasks([...tasks, data.newTask]))
  }

  const addCategory = (newCategory) => {
    axios.post(`/api/v1/tasks/${newCategory}`)
    setCategories([...categories, newCategory])
  }

  const filterTime = (timespan) => {
    if (timespan) {
      axios.get(`/api/v1/tasks/${category}/${timespan}`).then(({ data }) => setTasks(data))
    } else {
      axios(`/api/v1/tasks/${category}`).then(({ data }) => setTasks(data))
    }
  }

  const switchStatus = (id, status) => {
    axios.patch(`/api/v1/tasks/${category}/${id}`, { status })
    setTasks(tasks.map((el) => (el.taskId === id ? { ...el, status } : el)))
  }
  const deleteTask = (id) => {
    axios.delete(`/api/v1/tasks/${category}/${id}`)
    setTasks(tasks.filter((el) => el.taskId !== id))
  }
  const deleteCategory = (categoryToDelete) => {
    axios.delete(`/api/v1/${categoryToDelete}`)
    setCategories(categories.filter((el) => el !== categoryToDelete))
  }
  const saveTaskName = (taskName, id) => {
    axios.patch(`/api/v1/tasks-rename/${category}/${id}`, { title: taskName })
    setTasks(tasks.map((el) => (el.taskId === id ? { ...el, title: taskName } : el)))
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="rounded-lg border shadow-2xl p-10">
          <Header />
          <Route
            exact
            path="/"
            component={() => (
              <CategoryList
                categories={categories}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
              />
            )}
          />
          <Route
            exact
            path="/:category"
            component={() => (
              <TasksList
                tasks={tasks}
                addTask={addTask}
                switchStatus={switchStatus}
                deleteTask={deleteTask}
                filterTime={filterTime}
                saveTaskName={saveTaskName}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
