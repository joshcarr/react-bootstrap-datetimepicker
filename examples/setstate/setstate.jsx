var React = require('react/addons');
var DateTimeField = require('react-bootstrap-datetimepicker');
var moment = require('moment');

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

    console.log(moment(+a).format(), moment(+this.state.dateTime).format());
  },
  render: function () {
    
    return <DateTimeField dateTime={this.state.dateTime} onChange={this.blah}/>;
  }

});

React.render(React.createFactory(SetState)(), document.getElementById('example'));
