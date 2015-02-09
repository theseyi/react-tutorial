var React = require('react');
var Comment = require('./comment.jsx');

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.comment}
        </Comment>
      );
    });

    return (
      <div className='comment-list'>
        {commentNodes}
      </div>
    );
  }
});

module.exports = CommentList;
