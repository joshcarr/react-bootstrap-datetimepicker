var React = require('react/addons');
var DateTimeField = require('react-bootstrap-datetimepicker');

var SetState = React.createClass({
  getInitialState: function() {
    return {
      dateTime: '1420006200000'
    };
  },
  blah: function ( a ) {
    this.setState({
      dateTime: a
    });
  },
  render: function () {
    console.log( this.state.dateTime );
    return <DateTimeField dateTime={this.state.dateTime} onChange={this.blah}/>;
  }

});

React.render(React.createFactory(SetState)(), document.getElementById('example'));
