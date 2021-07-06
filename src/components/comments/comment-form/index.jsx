import React, { useState } from 'react'
import Button from '../../button';
import "./styles.scss";

const CommentForm = ({ onSubmit }) => {
  const [input, setInput] = useState({ name: '', comment: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input.name === '' || input.comment === '') {
      alert('Invalid input provided.');
      return;  
    }

    onSubmit(input.name, input.comment);
    setInput({ name: '', comment: '' });
  };

  return (
    <div className="comment-form-container">
      <div className="comment-form-header">Add a Comment</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input name="name" className="form-control" type="text" placeholder="Name" value={input.name} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <textarea name="comment" className="form-control" rows="7" placeholder="Comment" value={input.comment} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <Button 
                label="Submit" 
                type="submit" 
                variant="dark"
            />
        </div>
      </form>
    </div>
  );
}
 
export default CommentForm;