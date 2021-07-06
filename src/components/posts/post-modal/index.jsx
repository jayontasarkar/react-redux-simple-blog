import React, { useState } from 'react';
import Button from '../../button';
import Modal from '../../modal';
import Alert from '../../alert';

const PostModal = ({ handleSubmit }) => {
  const [post, setPost] = useState({ title: '', content: '' });
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit({ title: post.title, content: post.content });
    setPost({ title: '', content: '' });
    setSubmitted(true);
  };

  return (
    <React.Fragment>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setShow(true);
          setSubmitted(false);
        }}
        label="Create New Post"
        type="button"
        variant="primary"
      />
      <Modal show={show}>
        <form onSubmit={onSubmit}>
          <h2 className="modal-header">Create a new post</h2>
          {submitted && (
            <Alert variant="success" 
                message="Post created successfully!" 
                onClose={(e) => {e.preventDefault(); setSubmitted(false)}} 
            />
          )}
          <div className="modal-body">
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={post.title}
                placeholder="Title"
                className="form-control"
                onChange={(e) =>
                  setPost({ ...post, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="content"
                rows="10"
                value={post.content}
                placeholder="Type your post"
                className="form-control"
                onChange={(e) =>
                  setPost({ ...post, [e.target.name]: e.target.value })
                }
                required
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <Button type="submit" label="Save Post" variant="primary" />
            &nbsp;&nbsp;
            <Button
              type="button"
              label="Cancel"
              variant="link"
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
                setPost({ title: '', content: '' });
                setSubmitted(false);
              }}
            />
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default PostModal;
