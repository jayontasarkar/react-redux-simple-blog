import React, { useState } from 'react'
import Button from '../../button';

const ReplyForm = ({ parent, onReply, onCancelReply }) => {
  const [reply, setReply] = useState('');
  const cancel = (e) => {
    e.preventDefault();
    onCancelReply(false);
  };

  const submit = (e) => {
    e.preventDefault();
    onReply(parent, reply);
    setReply('');
  }

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <textarea 
            className="form-control"
            name="reply" 
            rows="3" 
            placeholder="Leave your reply"
            onChange={e => setReply(e.target.value)}
            required
        ></textarea>
      </div>
      <div className="form-group">
        <Button type="submit" label="Reply" variant="dark" />
        <Button type="button" onClick={cancel} label="Cancel" variant="link" />
      </div>
    </form>
  );
}
 
export default ReplyForm;