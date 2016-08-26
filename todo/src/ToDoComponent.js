var React = require('react')

// Parent ToDoList component
var ToDoComponent = React.createClass({
  // Initializes an array of ToDos
  getInitialState: function () {
    return {
      toDos: [
        {id: '0', text: 'Example ToDo'}
      ]
    }
  },
  generateId: function () {
    // Creates a unique id by increasing previous ToDo ID  by 1
    var lastToDo = 0
    if (this.state.toDos.length > 0) {
      var lastToDoIndex = this.state.toDos.length
      lastToDo = this.state.toDos[lastToDoIndex - 1]
    }
    newID = lastToDo.id == null ? 0 : parseInt(lastToDo.id) + 1

    return newID
  },
  handleRemoval: function (toDoID) {
    // Filters out ToDo with mathing ID, saves filtered array as state
    var filteredToDos = this.state.toDos.filter(function (toDo) {
      return toDo.id !== toDoID
    })
    this.setState({toDos: filteredToDos})
    return
  },
  handleEdit: function (toDoID, toDoText) {
    var toDos = this.state.toDos
    for (var i = 0; i < toDos.length; i++) {
      if (toDos[i].id === toDoID) {
        toDos[i].text = toDoText
        break
      }
    }
    this.setState({toDos: toDos})
  },
  handleSubmit: function (toDoText) {
    var toDoID = this.generateId().toString()
    var toDo = {id: toDoID, text: toDoText}
    var newToDos = this.state.toDos.concat([toDo])
    this.setState({toDos: newToDos})
    return
  },
  render: function () {
    return (
      <div className='col-md-offset-5 col-md-2'>
        <ToDoInput addToDo={this.handleSubmit}/>
        <ToDoList toDos={this.state.toDos} removeToDo={this.handleRemoval} editToDo={this.handleEdit}/>
      </div>
    )
  }
})

// Field to enter new ToDo Elements
var ToDoInput = React.createClass({
  getInitialState: function () {
    return {toDoText: ''}
  },
  handleTask: function (e) {
    if (e.charCode === 13) {
      e.preventDefault()

      // Invoke ToDoComponent.handleSubmit() and add new ToDo
      this.props.addToDo(this.state.toDoText)

      // Clear text in Input box
      this.setState({toDoText: ''})
    }
    return
  },
  onChange: function (e) {
    // Update state to reflect text within Input box
    this.setState({toDoText: e.target.value})
  },
  render: function () {
    return (
      <div className="input-group">
        <input type='text' className="form-control" onChange={this.onChange} value={this.state.toDoText} onKeyPress={this.handleTask} placeholder='Add note...' />
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">Add</button>
        </span>
      </div>
    )
  }
})

// Unordered list of ToDo Elements
var ToDoList = React.createClass({
  removeToDo: function (toDoID) {
    // Links to ToDoComponent.handleRemoval(), called in child ToDo
    this.props.removeToDo(toDoID)
    return
  },
  editToDo: function (toDoID, toDoText) {
    this.props.editToDo(toDoID, toDoText)
    return
  },
  render: function () {
    var toDoArray = this.props.toDos.map(function (toDo) {
      return (
        <ToDo key={toDo.id} toDoID={toDo.id} toDoText={toDo.text} removeToDo={this.removeToDo} editToDo={this.editToDo}/>
      )
    }, this)
    return (
      // Assembles a group of ToDos as anchors nested in a div
      <div className="list-group">{toDoArray}</div>
    )
  }
})

// Convert text into a list element
var ToDo = React.createClass({
  removeToDo: function () {
    // Invokes ToDoComponent.handleRemoval() and removes ToDo
    this.props.removeToDo(this.props.toDoID)
    return
  },
  editToDo: function () {
    var newTextID = this.props.toDoID+"toDoText"
    var newText = document.getElementById(newTextID).textContent
    this.props.editToDo(this.props.toDoID, newText)
  },
  render: function () {
    // Inline CSS - demo purposes
    var removeStyle = {
        marginRight: '-5px'
    }
    var editStyle = {
      paddingRight: '5px'
    }
    var elipsis = {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
}
    return (
      <a href="#" className="list-group-item">
        <span id={this.props.toDoID + 'toDoText'} className={elipsis} contentEditable='true' onInput={this.editToDo}>{this.props.toDoText}</span>
        <span className="glyphicon glyphicon-remove pull-right" style={removeStyle} onClick={this.removeToDo}></span>
      </a>
    )
  }
})

module.exports = ToDoComponent
