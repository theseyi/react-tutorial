define(['react', 'jquery'], function (React, $) {
  var CommentForm = require('./commentform.js');
  var CommentList = require('./commentlist.js');

  return React.createClass({
    getInitialState: function () {
      return {data: []};
    },

    componentDidMount: function () {
      var interval = this.props.pollInterval;
      var poller   = this.fetchComments;

      poller();
      setTimeout(function poll() {
        poller();
        setTimeout(poll, interval);
      }.bind(this), interval);
    },

    fetchComments: function () {
      $.ajax({
        url     : this.props.url,
        dataType: 'json',
        success : function (data) {
          this.setState({data: data});
        }.bind(this),
        error   : function (xhr, status, errorThrown) {
          console.error(this.props.url, status, errorThrown.toString());
        }.bind(this)
      });
    },

    handleCommentSubmit: function (comment) {
      var comments        = this.state.data;
      var updatedComments = comments.concat(comment);
      this.setState({data: updatedComments});

      $.ajax({
        url     : this.props.url,
        dataType: 'json',
        type    : 'POST',
        data    : comment,
        success : function (data) {
          this.setState({data: data});
        }.bind(this),
        error   : function () {
          console.error(this.props.url, status, errorThrown.toString());
        }.bind(this)
      });
    },

    render: function () {
      return (
          <div className='comment-box'>
            <h1>Comments</h1>
            <CommentList data={this.state.data}/>
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
          </div>
      );
    }
  });
});
