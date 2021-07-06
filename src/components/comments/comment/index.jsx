import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addReply } from '../../../store/slices/comments';
import { getCommentDate } from '../../../utils/helpers';
import Button from '../../button';
import ReplyForm from '../../replies/reply-form';
import "./styles.scss";


const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [ toggleReplyBox, setToggleReplyBox ] = useState(false);

  const hasReplies = comment.replies?.length > 0 ? true : false;

  const replyOnComment = (parent, content) => {
    dispatch(addReply({
      post: postId,
      content,
      parent
    }));
    setToggleReplyBox(false);
  };

  return (
    <>
      <div className="Comment--Container" key={comment.id}>
        <div className={'comment' + (comment.parent !== null ? ' reply' : '')}>
          <div className="media-object">
            <div className="avatar">
              <img src={comment.avatar} alt={comment.name} />
            </div>
            <div className="media-content">
              <p className="name">{comment.name}</p>
              <p className="date">{ getCommentDate(comment.date) }</p>
            </div>
          </div>
          <div className="comment-content">{comment.content} </div>
          {!toggleReplyBox ? (
            <Button type="button" 
                onClick={(e) => {e.preventDefault(); setToggleReplyBox(true)}} 
                label="Reply" 
                variant="link" 
            />
          ) : (
            <ReplyForm parent={comment.id} onCancelReply={setToggleReplyBox} onReply={replyOnComment} />
          )}
          
        </div>
        <div className="replies">
          {hasReplies && comment.replies.map(c => (
            <Comment comment={c} key={c.id} />
          ))}
        </div>
      </div>
    </>
  );
}
 
export default Comment;