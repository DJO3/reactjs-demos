import React, { Component } from 'react'
import xhr from 'xhr'
import './App.css'

class App extends Component {
  // Set state in ES6 component
  state = {
    location: '',
    data: {}
  }

  // Grab forecast data from openweathermap.com using city,state specified in form
  fetchData = (e) => {
    e.preventDefault()

    // Build forecast url
    var apiKey = '0c34c4eb1d0e4f5ef1fbd0cf653e3571'
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q='
    var location = encodeURI(this.state.location)
    var urlSuffix = '&APPID=' + apiKey + '&units=metric'
    var url = urlPrefix + location + urlSuffix

    // Define this to maintain scope in xhr
    var self = this

    // Get forecast
    xhr({
      url: url
    }, function (err, data) {
      self.setState({
        data: JSON.parse(data.body)
      })
    })

  }

  // Update form with user input, reflect change in state
  changeLocation = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  render () {
    var currentTemp = 'not loaded yet'
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label> I want to know the weather for...
            <input
              placeholder={'City, Country'}
              type='text'
              value={this.state.location}
              onChange={this.changeLocation}/>
          </label>
        </form>
        <p className='temp-wrapper'>
          <span className='temp'>{ currentTemp }</span>
          <span className='temp-symbol'>°C</span>
        </p>
      </div>
    )
  }
}

export default App
