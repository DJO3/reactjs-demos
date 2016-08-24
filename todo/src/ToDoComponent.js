var React = require('react')

// Parent ToDoList component
var ToDoComponent = React.createClass({
  getInitialState: function () {
    // Initialize default list of ToDos
    return {todos: ['Buy Apples', 'Sell Oranges', 'Pawn Pears']}
  },
  updateToDos: function (newToDo) {
    var activeToDos = this.state.todos.concat([newToDo])
    var updateToDos = this.setState({todos: activeToDos});
    return
  },
  render: function () {
    return (
      <div id='ToDoListDiv'>
        <ToDoInput onFormSubmit={this.updateToDos}/>
        <ToDoList todos={this.state.todos} />
      </div>
    )
  }
})

// Field to enter new ToDo Elements
var ToDoInput = React.createClass({
  getInitialState: function () {
    return {todo: ''}
  },
  handleAddToDo: function (e) {
    if (e.charCode === 13) {
      e.preventDefault()

      // Pass current ToDo to parent component
      var addToDo = this.props.onFormSubmit(this.state.todo)
      var clearInput = this.setState({todo: ''})
    }
    return
  },
  onChange: function (e) {
    var updateToDo = this.setState({todo: e.target.value})
  },
  render: function () {
    return (
      <form>
        <input type='text' onChange={this.onChange} value={this.state.todo} onKeyPress={this.handleAddToDo} placeholder='Add note...' />
      </form>
    )
  }
})

// Unordered list of ToDo Elements
var ToDoList = React.createClass({
  render: function () {
    var allToDos = function (ToDoText) {
      return (
        <ToDo>{ToDoText}</ToDo>
      )
    }
    return (
      // Add an <li>ToDoText</li> for each ToDo
      <ul>{this.props.todos.map(allToDos)}</ul>
    )
  }
})

// Convert text into a list element
var ToDo = React.createClass({
  render: function () {
    return (

      <li>{this.props.children}</li>
    )
  }
})

module.exports = ToDoComponent
