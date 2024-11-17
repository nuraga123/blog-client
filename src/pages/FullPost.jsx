import React, { useEffect, useState } from 'react';
import api from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const userData = useSelector((state) => state.auth.data);

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    _id: '',
    title: '',
    text: '',
    tags: [],
    viewsCount: 0,
    user: '',
    imageUrl: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const { data } = await api.get(`/posts/${id}`);

      if (data) {
        setLoading(false);
        setPost(data);
      } else {
        alert('problems');
        setLoading(true);
      }
    };

    loadPost();
  }, [id]);

  console.log(post);

  return (
    <>
      <Post
        id={id}
        title={post.title}
        imageUrl={post.imageUrl}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags ? post.tags : []}
        isFullPost
        isEditable={userData._id === post.user._id}
        isLoading={loading}
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
