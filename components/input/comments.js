import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [commentData, setCommentData] = useState()
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    if (showComments) {
          fetch(`/api/comments/` + eventId)
            .then((response) => response.json())
            .then((data) => {
              setCommentData(data.comments);
            }); 
    }
  }, [showComments])

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/comments/` + eventId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
      .then(response => response.json())
      .then(data => {
        setCommentData(data.comments)
      })

  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={commentData} />}
    </section>
  );
}

export default Comments;
