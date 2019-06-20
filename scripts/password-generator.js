'use strict';

var React = require('react/addons'),
    markov = require('markov-words'),
    stats = require('./stats'),
    generate = function(length, number) {
        return markov.generate(stats, length, number);
    },
    l33t = require('l33t-substitution');

var Password = React.createClass({
  render: function() {
    var text = this.props.text;
    if (this.props.capitalize) {
      text = text.charAt(0).toUpperCase() + text.substring(1);
    }
    if (this.props.substitute) {
      text = l33t(text, 2);
    }

    return <code>{text}{' '}</code>
  }
});

var PasswordList = React.createClass({
  createState: function(inputLength, inputNumber) {
    var length = parseInt(inputLength);
    var lengthValid = !isNaN(length) && length >= 3;
    var number = parseInt(inputNumber);
    var numberValid = !isNaN(number) && number > 0;
    var items = [];
    if (lengthValid && numberValid) {
      try {
        items = generate(length, number);
      } catch(e) {
        console.error(e);
      }
    }
    return {items: items, lengthValid: lengthValid, numberValid: numberValid};
  },
  getInitialState: function() {
    return this.createState(this.props.length, this.props.number);
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.length != nextProps.length || 
        this.props.number != nextProps.number) {
      this.setState(this.createState(nextProps.length, nextProps.number));
    }
  },
  refresh: function() {
    this.setState(this.createState(this.props.length, this.props.number));
  },
  render: function() {
    var substitute = this.props.substitute;
    var capitalize = this.props.capitalize;
    return <div>
             <ul>
               {this.state.items.map(function(item) {
                 return <li className="password">
                          <Password text={item} substitute={substitute} capitalize={capitalize} />
                        </li>
               })}
             </ul>
           </div>
  }
});

var PasswordGenerator = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {length: 10, number: 24, substitute: false, capitalize: false};
  },
  handleRefresh: function() {
    this.refs.passwordList.refresh();
  },
  render: function() {
    return (
      <div>
        <div className="console">
          <label>Password length{' '} 
            <input type="text" valueLink={this.linkState('length')} />
          </label> <label>Number to generate{' '}
            <input type="text" valueLink={this.linkState('number')} />
          </label> <label>
            <input type="checkbox" checkedLink={this.linkState('substitute')} />
            {' '}Numbers &amp; Symbols
          </label> <label>
            <input type="checkbox" checkedLink={this.linkState('capitalize')} />
	    {' '}Capitalize
          </label>
        </div>
        <div className="actions">
          <button className="clearfix" 
            onClick={this.handleRefresh}>Regenerate</button>
          <span className="clearfix" />
        </div>
        <PasswordList length={this.state.length} number={this.state.number}
          substitute={this.state.substitute} capitalize={this.state.capitalize} ref="passwordList" />
      </div>
    );
  }
});

module.exports = PasswordGenerator;
