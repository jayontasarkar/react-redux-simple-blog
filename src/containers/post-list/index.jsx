import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost } from '../../store/slices/posts';
import { paginate } from '../../utils/paginate';
import Pagination from '../../components/pagination';
import "./styles.scss";
import PostModal from '../../components/posts/post-modal';
import PostThumbnail from '../../components/posts/post-thumbnail';

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.collection);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 2
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (post) => {
    dispatch(addPost(post));
  };

  const getPagedData = () => {
    const { data } = posts;
    const paginatedPosts = paginate(data, pagination.currentPage, pagination.pageSize);

    return { totalCount: data.length, paginatedPosts };
  };

  const handlePageChange = (e, page) => {
    e.preventDefault();
    setPagination({ ...pagination, currentPage: page });
  };

  const { totalCount, paginatedPosts } = getPagedData();
  
  return (
    <div className="postlist-container">
      <div className="header-panel">
        <h1>Latest Posts</h1>
        <div>
          <PostModal handleSubmit={handleSubmit} />
        </div>
      </div>
      <div className="postlist-content">
        { posts.status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <>
            { paginatedPosts.length > 0 ? (
              <React.Fragment>
                {paginatedPosts.map(item => <PostThumbnail post={item} key={item.id} />)}  
                <div className="mt-50">
                  <Pagination
                    itemsCount={totalCount}
                    position="center"
                    pageSize={pagination.pageSize}
                    currentPage={pagination.currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </React.Fragment>  
            ) : (
              <p>No posts found</p>
            ) }
          </>
        ) }
      </div>
    </div>
  );
}

export default PostList;
