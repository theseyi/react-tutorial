var React = require('react');
var CommentBox = require('./commentbox.js');

React.render(<CommentBox url='comments' pollInterval={2000} />, document.querySelector('#screen'));
