import classes from "./comment-list.module.css";

function CommentList(props) {
  
  let renderList
  if (props.comments) {
    renderList = props.comments.map((comment) => (
      <li key={comment.id}>
        <p>{comment.text}</p>{" "}
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>
    ));
  }
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
        {renderList}
    </ul>
  );
}

export default CommentList;
