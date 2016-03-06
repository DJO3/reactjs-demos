var React = require('react')
var ReactDOM = require('react-dom')

var USER_DATA = {
  name: 'Dave O\'Connor',
  username: 'DJO3',
  image: 'https://avatars1.githubusercontent.com/u/1656866?v=3&s=460'
}

// Create a 100x100 image
var ProfilePic = React.createClass({
  render: function () {
    return (
      <img src={this.props.imageUrl} style={{height: 100, width: 100}} />
    )
  }
})

// Create a div containing the username
var ProfileName = React.createClass({
  render: function () {
    return (
      <div>
      {this.props.name}
      </div>
    )
  }
})

// Create a div with a username anchor
var ProfileLink = React.createClass({
  render: function () {
    return (
      <div>
        <a href={'https://www.github.com/' + this.props.username}>
          {this.props.username}
        </a>
      </div>
    )
  }
})

// Render user ProfilePic, ProfileName, ProfileLink
var Avatar = React.createClass({
  render: function () {
    return (
      <div>
        <ProfilePic imageUrl={this.props.user.image} />
        <ProfileName name={this.props.user.name} />
        <ProfileLink username={this.props.user.username} />
      </div>
    )
  }
})

// Render all the things!
ReactDOM.render(
  <Avatar user={USER_DATA} />,
  document.getElementById('app')
)
