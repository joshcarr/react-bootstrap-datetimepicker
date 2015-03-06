var React = require('react');

var Glyphicon = React.createClass({
  render: function () {
    var classes = 'glyphicon glyphicon-' + this.props.glyph;
    return (
      <span className={classes} />
    );
  }
});

module.exports = Glyphicon;