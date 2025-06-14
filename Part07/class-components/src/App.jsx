import React from 'react'
import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      current: 0
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => {
        this.setState({ todos: json })
      })
  }

  handleNext = () => {
    this.setState((prevState) => ({
      current: (prevState.current + 1) % prevState.todos.length
    }))
  }

  render() {
    const { todos, current } = this.state

    if (todos.length === 0) {
      return <div>Loading ...</div>
    }

    return (
      <div>
        <h1>Todos</h1>
        <div>
          <strong>ID:</strong>{todos[current].id}<br />
          <strong>Title:</strong>{todos[current].title}
        </div>
        <button onClick={this.handleNext}>Next</button>
      </div>
    )
  }
}

export default App
