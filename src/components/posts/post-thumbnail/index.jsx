import React from 'react'
import { Link } from 'react-router-dom';
import { excerpt } from '../../../utils/helpers';
import "./styles.scss";

const PostThumbnail = ({ post }) => {
  return (
    <div className="post-thumbnail">
      <h2 className="post-title">
        <Link to={`/posts/${post.id}`}>{ post.title }</Link>
      </h2>
      <p className="post-content">
        { excerpt(post.content)}
      </p>
    </div>
  );
}
 
export default PostThumbnail;