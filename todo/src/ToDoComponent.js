var React = require('react')

// Parent ToDoList component
var ToDoComponent = React.createClass({
  getInitialState: function () {
    // Initialize default list of ToDos
    var activeToDos = []
    var inactiveToDos = []
    var allToDos = activeToDos.concat(inactiveToDos)
    return {
      todos: allToDos,
      activeToDos: activeToDos,
      inactiveToDos: inactiveToDos
    }
  },
  updateToDos: function (newToDo) {
    var activeToDos = this.state.todos.concat([newToDo])
    var updateToDos = this.setState({todos: activeToDos});
    return
  },
  render: function () {
    return (
      <div id='ToDoListDiv' className="col-md-offset-5 col-md-2">
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
      <div className="input-group">
        <input type='text' className="form-control" onChange={this.onChange} value={this.state.todo} onKeyPress={this.handleAddToDo} placeholder='Add note...' />
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">Add!</button>
        </span>
      </div>
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
      <div className="list-group">{this.props.todos.map(allToDos)}</div>
    )
  }
})

// Convert text into a list element
var ToDo = React.createClass({
  render: function () {
    return (

      <a href="#" className="list-group-item">{this.props.children}</a>
    )
  }
})

module.exports = ToDoComponent
