var DateTimeField, DateTimePicker, Glyphicon, React, moment;

React = require('react/addons');

DateTimePicker = require('./DateTimePicker');

moment = require('moment');

Glyphicon = require('./Glyphicon');

DateTimeField = React.createClass({
  propTypes: {
    dateTime: React.PropTypes.string,
    onChange: React.PropTypes.func,
    format: React.PropTypes.string,
    inputFormat: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      dateTime: moment().format('x'),
      format: 'x',
      inputFormat: "MM/DD/YY h:mm A",
      showToday: true,
      viewMode: 'days',
      daysOfWeekDisabled: [],
      onChange: function (x) {
        console.log(x);
      }
    };
  },
  getInitialState: function() {
    return {
      showDatePicker: true,
      showTimePicker: false,
      widgetStyle: {
        display: 'block',
        position: 'absolute',
        left: -9999,
        zIndex: '9999 !important'
      },
      viewDate: moment(this.props.dateTime, this.props.format).startOf("month"),
      selectedDate: moment(this.props.dateTime, this.props.format),
      inputValue: moment(this.props.dateTime, this.props.format).format(this.props.inputFormat)
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.refs.theInput.getDOMNode().value = moment(nextProps.dateTime, nextProps.format).format( nextProps.inputFormat);
    return this.setState({
      viewDate: moment(nextProps.dateTime, nextProps.format).startOf("month"),
      selectedDate: moment(nextProps.dateTime, nextProps.format),
      inputValue: moment(nextProps.dateTime, nextProps.format).format(nextProps.inputFormat)
    });
  },
  handleChange: function(event) {
    this.refs.theInput.getDOMNode().value = moment(event.target.value,  this.props.inputFormat).format( this.props.inputFormat);
    if (moment(event.target.value, this.props.inputFormat).isValid()) {
      this.setState({
        viewDate: moment(event.target.value, this.props.inputFormat).startOf("month"),
        selectedDate: moment(event.target.value, this.props.inputFormat),
        inputValue: moment(event.target.value, this.props.inputFormat).format(this.props.inputFormat)
      });
    } else {
      this.setState({
        inputValue: event.target.value
      });
      console.log("This is not a valid date");
    }
    return this.props.onChange(moment(event.target.value, this.props.inputFormat).format(this.props.format));
  },
  setSelectedDate: function(e) {
    var newDate = moment(this.state.selectedDate);
    newDate.date(parseInt(e.target.innerHTML));

    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);

    return this.setState({
      selectedDate: newDate
    }, function() {

      this.closePicker();
      this.props.onChange(newDate.format(this.props.format));
      return this.setState({
        viewDate: newDate.format(this.props.inputFormat),
        inputValue: newDate.format(this.props.inputFormat)
      });
    });
  },
  setSelectedHour: function(e) {
    var newDate = moment(this.state.selectedDate);
    newDate.hour(parseInt(e.target.innerHTML));
    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);
    return this.setState({
      selectedDate:newDate
    }, function() {
      this.closePicker();
      this.props.onChange(newDate.format(this.props.format));
      return this.setState({
        inputValue: newDate.format(this.props.inputFormat)
      });
    });
  },
  setSelectedMinute: function(e) {
    var newDate = moment(this.state.selectedDate);
    newDate.minute(parseInt(e.target.innerHTML));
    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);
    return this.setState({
      selectedDate:newDate
    }, function() {
      this.closePicker();
      this.props.onChange(newDate.format(this.props.format));
      return this.setState({
        inputValue: newDate.format(this.props.inputFormat)
      });
    });
  },
  setViewMonth: function(month) {
    return this.setState({
      viewDate: this.state.viewDate.clone().month(month)
    });
  },
  setViewYear: function(year) {
    return this.setState({
      viewDate: this.state.viewDate.clone().year(year)
    });
  },
  addMinute: function() {
    var newDate = moment(this.state.selectedDate);
    newDate.add(1, "minutes");
    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);

    return this.setState({
      selectedDate: newDate
    }, function() {
      this.props.onChange(newDate.format(this.props.format));
    });
  },
  addHour: function() {
    var newDate = moment(this.state.selectedDate);
    newDate.add(1, "hours");
    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);

    return this.setState({
      selectedDate: newDate
    }, function() {
      this.props.onChange(newDate.format(this.props.format));
    });
  },
  addMonth: function() {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "months")
    });
  },
  addYear: function() {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "years")
    });
  },
  addDecade: function() {
    return this.setState({
      viewDate: this.state.viewDate.add(10, "years")
    });
  },
  subtractMinute: function() {
    var newDate = moment(this.state.selectedDate);
    newDate.subtract(1, "minutes");
    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);

    return this.setState({
      selectedDate: newDate
    }, function() {
      this.props.onChange(newDate.format(this.props.format));
    });
  },
  subtractHour: function() {
    var newDate = moment(this.state.selectedDate);
    newDate.subtract(1, "hours");
    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);

    return this.setState({
      selectedDate: newDate
    }, function() {
      this.props.onChange(newDate.format(this.props.format));
    });
  },
  subtractMonth: function() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "months")
    });
  },
  subtractYear: function() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "years")
    });
  },
  subtractDecade: function() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(10, "years")
    });
  },
  togglePeriod: function() {
    var newDate = moment(this.state.selectedDate);
    if (this.state.selectedDate.hour() > 12) {
      newDate.subtract(12, 'hours');
    } else {
      newDate.add(12, 'hours');
    }
    this.refs.theInput.getDOMNode().value = newDate.format( this.props.inputFormat);
    return this.setState({
      selectedDate: newDate
    }, function() {
      return this.props.onChange(newDate.format(this.props.format));
    });
  },
  togglePicker: function() {
    return this.setState({
      showDatePicker: !this.state.showDatePicker,
      showTimePicker: !this.state.showTimePicker
    });
  },
  onClick: function() {
    var classes, gBCR, offset, placePosition, scrollTop, styles;
    if (this.state.showPicker) {
      return this.closePicker();
    } else {
      this.setState({
        showPicker: true
      });
      gBCR = this.refs.dtpbutton.getDOMNode().getBoundingClientRect();
      classes = {
        "bootstrap-datetimepicker-widget": true,
        "dropdown-menu": true
      };
      offset = {
        top: gBCR.top + window.pageYOffset - document.documentElement.clientTop,
        left: gBCR.left + window.pageXOffset - document.documentElement.clientLeft
      };
      offset.top = offset.top + this.refs.datetimepicker.getDOMNode().offsetHeight;
      scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      placePosition = this.props.direction === 'up' ? 'top' : this.props.direction === 'bottom' ? 'bottom' : this.props.direction === 'auto' ? offset.top + this.refs.widget.getDOMNode().offsetHeight > window.offsetHeight + scrollTop && this.refs.widget.offsetHeight + this.refs.datetimepicker.getDOMNode().offsetHeight > offset.top ? 'top' : 'bottom' : void 0;
      if (placePosition === 'top') {
        offset.top = -this.refs.widget.getDOMNode().offsetHeight - this.getDOMNode().clientHeight - 2;
        classes["top"] = true;
        classes["bottom"] = false;
        classes['pull-right'] = true;
      } else {
        offset.top = 40;
        classes["top"] = false;
        classes["bottom"] = true;
        classes['pull-right'] = true;
      }
      styles = {
        display: 'block',
        position: 'absolute',
        top: offset.top,
        left: 'auto',
        right: 40
      };
      return this.setState({
        widgetStyle: styles,
        widgetClasses: classes
      });
    }
  },
  closePicker: function(e) {
    var style;
    style = this.state.widgetStyle;
    style['left'] = -9999;
    style['display'] = 'none';
    return this.setState({
      showPicker: false,
      widgetStyle: style
    });
  },
  renderOverlay: function() {
    var styles;
    styles = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: '999'
    };
    if (this.state.showPicker) {
      return (<div style={styles} onClick={this.closePicker} />);
    } else {
      return <span />;
    }
  },
  mixins: [React.addons.LinkedStateMixin],
  render: function() {
    return (
          <div>
            {this.renderOverlay()}
            <DateTimePicker ref="widget"
                  widgetClasses={this.state.widgetClasses}
                  widgetStyle={this.state.widgetStyle}
                  showDatePicker={this.state.showDatePicker}
                  showTimePicker={this.state.showTimePicker}
                  viewDate={this.state.viewDate}
                  selectedDate={this.state.selectedDate}
                  showToday={this.props.showToday}
                  viewMode={this.props.viewMode}
                  daysOfWeekDisabled={this.props.daysOfWeekDisabled}
                  addDecade={this.addDecade}
                  addYear={this.addYear}
                  addMonth={this.addMonth}
                  addHour={this.addHour}
                  addMinute={this.addMinute}
                  subtractDecade={this.subtractDecade}
                  subtractYear={this.subtractYear}
                  subtractMonth={this.subtractMonth}
                  subtractHour={this.subtractHour}
                  subtractMinute={this.subtractMinute}
                  setViewYear={this.setViewYear}
                  setViewMonth={this.setViewMonth}
                  setSelectedDate={this.setSelectedDate}
                  setSelectedHour={this.setSelectedHour}
                  setSelectedMinute={this.setSelectedMinute}
                  togglePicker={this.togglePicker}
                  togglePeriod={this.togglePeriod}
            />
            <div className="input-group date" ref="datetimepicker">
              <input
                ref="theInput"
                type="text"
                className="form-control"
                onBlur={this.handleChange}
                //value={this.state.selectedDate.format(this.props.inputFormat)}
                defaultValue={this.state.selectedDate.format(this.props.inputFormat)}
              />
              <span className="input-group-addon" onClick={this.onClick} onBlur={this.onBlur} ref="dtpbutton"><Glyphicon glyph="calendar" /></span>
            </div>
          </div>
    );
  }
});

module.exports = DateTimeField;
