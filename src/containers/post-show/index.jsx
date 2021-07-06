import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSinglePost } from '../../store/slices/posts';
import { fetchComments, addComment } from '../../store/slices/comments';
import Comment from '../../components/comments/comment';
import CommentForm from '../../components/comments/comment-form';
import PostSingle from '../../components/posts/post-single';
import Loader from '../../components/loader';

const PostShow = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector(state => state.posts.post);
  const comments = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const commentOnPost = (name, content) => {
    dispatch(addComment({
      name,
      content,
      post: postId
    }));
  };

  return (
    <>
      { (post && post.status === 'loading') ? (
        <Loader text="Loading post..." />
      ) : (
        <React.Fragment>
          <PostSingle post={post.entity} />
          <CommentForm onSubmit={commentOnPost} />
          
          <div className="comment--section">
            { comments.collection.status === 'loading' ? (
                <Loader text="Loading comments..." />
              ) : [
                comments.collection.data.length > 0 
                  ? (
                    comments.collection.data.map(c => <Comment comment={c} key={c.id} />)
                  )
                  : (
                    <p>No comments found</p>
                  )
              ]
            }
          </div>
        </React.Fragment>
      )}
    </>
  );
}
 
export default PostShow;