import _ from 'lodash';
import moment from 'moment';

const nestCommentsFromFlatten = (items, id = null, link='parent') => 
    	items
	    .filter(item => item[link] === id)
	    .map(item => ({ ...item, replies: nestCommentsFromFlatten(items, item.id) }));

const insertReplyIntoComment = (arr, parent, reply) => {
  if(arr && Array.isArray(arr)) {
    arr.forEach(i => {
        if(_.isEqual(i.id, parent)) {
            i.replies = [
                { ...reply },
                ...i.replies
            ]
        } else {
            insertReplyIntoComment(i.replies, parent, reply)
        }
    });
  }
  
  return arr;
};    

export function nestComments(comments) {
    return nestCommentsFromFlatten(comments);
}

export function addReplyForComment(comments, parent, reply) {
  return insertReplyIntoComment(comments, parent, reply);
}

export function getCommentDate(timestamp) {
  const m =  moment(timestamp);
  const date = m.format('MMMM DD, YYYY');
  const time = m.format('h:mm A');

  return `${date} AT ${time}`;
}

export function excerpt(str, length = 230) {  
  if (str.length > length) {
      return str.substring(0, length) + "...";
  }

  return str;
}