'use strict';

var React = require('react/addons'),
    markov = require('markov-words'),
    stats = require('./stats').stats,
    generate = function(length, number) {
        return markov.generate(stats, length, number);
    };

var Password = React.createClass({
  render: function() {
    return <span>{this.props.text}</span>
  }
});

var PasswordList = React.createClass({
  getInitialState: function() {
    return {items: generate(this.props.length, this.props.number)};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({items: generate(nextProps.length, nextProps.number)});
  },
  render: function() {
    return <ul>
             {this.state.items.map(function(item) {
               return <li><Password text={item} /></li>
             })}
           </ul>
  }
});

var PasswordGenerator = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {length: 10, number: 20};
  },
  render: function() {
    return (
      <div>
        <label>Password length 
            <input valueLink={this.linkState('length')} />
        </label>
        <label>Number to generate 
            <input valueLink={this.linkState('number')} />
        </label>
        <PasswordList length={this.state.length} number={this.state.number} />
      </div>
    );
  }
});

module.exports = PasswordGenerator;
