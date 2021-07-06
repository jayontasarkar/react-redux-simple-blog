import React from 'react'
import "./styles.scss";

const PostSingle = ({ post }) => {
  return (
      <div className="single-post">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
      </div>
  );
}
 
export default PostSingle;