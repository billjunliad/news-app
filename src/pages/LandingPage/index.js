import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Button } from '@mui/material';
import CardItem from '../../components/CardItem';
import CustomAppBar from '../../components/CustomAppBar';
import CardLoader from '../../components/CardLoader';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewArticle, selectAllArticles, getHeadlineArticles, resetArticles } from '../../common/slicer/articleSlicer';
const LandingPage = () => {
  const navigate = useNavigate();
  const articles = useSelector(selectAllArticles);
  const dispatch = useDispatch();
  const articlesStatus = useSelector((state) => state.articles.status);
  const count = useSelector((state) => state.articles.count);
  const [searchKeyword, setSearchKeyword] = useState('');
  useEffect(() => {
    if (articlesStatus === 'idle') {
      dispatch(getHeadlineArticles({ page: 1, keywords: '' }));
    }
  }, [articlesStatus, dispatch]);

  const onClickButton = (i) => {
    dispatch(viewArticle(i));
    navigate('/article');
  };
  const onChangePagination = (e, page) => {
    dispatch(getHeadlineArticles({ page: page, keywords: searchKeyword }));
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      dispatch(getHeadlineArticles({ page: 1, keywords: searchKeyword }));
    }
  };
  const goToAll = () => {
    navigate('/allnews');
    dispatch(resetArticles());
  };
  const Loader = () => {
    let rows = [],
      i = 0,
      len = 10;

    while (i++ <= len) rows.push(i);

    return rows.map((i) => {
      return (
        <Grid item lg={3} key={i} xs={12}>
          <CardLoader key={i} />
        </Grid>
      );
    });
  };
  return (
    <>
      <CustomAppBar title={'Top Headlines'} isWithSearch handleSearch={handleSearch} searchValue={searchKeyword} handleKeyUp={handleKeyUp} />
      <Grid container alignItems={'center'} columnSpacing={3} rowSpacing={3} sx={{ padding: '2%' }}>
        <Grid item lg={12}>
          <Button onClick={goToAll}>Go to All News Page</Button>
        </Grid>
        {articlesStatus === 'loading' ? (
          <Loader />
        ) : (
          articles.map((i, key) => {
            return (
              <Grid item lg={3} key={key}>
                <CardItem {...i} handleClick={() => onClickButton(i)} />
              </Grid>
            );
          })
        )}
        <Grid item lg={12} xs={12}>
          <Pagination count={Math.ceil(count / 20)} onChange={onChangePagination} variant="outlined" shape="rounded" />
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
