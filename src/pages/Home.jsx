import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { tags } = useSelector((state) => state.tags);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  const resultPosts = posts.items;

  alert(posts);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid>
          <Grid container spacing={0} columns={2}>
            {isPostsLoading ? (
              [...Array(3)].map((el, index) => (
                <Post key={index} isLoading={true} />
              ))
            ) : resultPosts.length ? (
              resultPosts.map((obj) => (
                <Grid xs={1} item>
                  <Post
                    key={obj._id}
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl}
                    user={obj.user}
                    createdAt={obj.date}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
                    tags={obj.tags}
                    isEditable={userData._id === obj.user._id}
                    isLoading={isPostsLoading}
                  />
                </Grid>
              ))
            ) : (
              <h1
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'gray',
                  fontWeight: 'bold',
                }}
              >
                Нет постов
              </h1>
            )}
          </Grid>
        </Grid>
        <Grid>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />

          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
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
          />
        </Grid>
      </div>
    </>
  );
};
