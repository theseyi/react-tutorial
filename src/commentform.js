var React       = require('react');
var CommentForm = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();

    var author = this.refs.author.getDOMNode().value.trim();
    var text   = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, comment: text});

    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value   = '';
  },

  render: function () {
    return (
        <form className='comment-form' onSubmit={this.onSubmit}>
          <input type='text' placeholder='Your name' ref='author'/>
          <input type='text' placeholder='Say something...' ref='text'/>
          <input type='submit' value='post'/>
        </form>
    );
  }
});

module.exports = CommentForm;
