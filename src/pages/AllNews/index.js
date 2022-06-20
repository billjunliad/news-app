import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Button, IconButton, Paper, MenuList, MenuItem, Popover, Typography, Alert } from '@mui/material';
import CardItem from '../../components/CardItem';
import CustomAppBar from '../../components/CustomAppBar';
import CardLoader from '../../components/CardLoader';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewArticle, selectAllArticles, getAllNewsArticles, resetArticles } from '../../common/slicer/articleSlicer';
import FilterListIcon from '@mui/icons-material/FilterList';

const AllNews = () => {
  const navigate = useNavigate();
  const articles = useSelector(selectAllArticles);
  const dispatch = useDispatch();
  const articlesStatus = useSelector((state) => state.articles.status);
  const count = useSelector((state) => state.articles.count);
  const error = useSelector((state) => state.articles.error);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortby, setSortBy] = useState('publishedAt');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (articlesStatus === 'idle') {
      dispatch(getAllNewsArticles({ page: 1, keywords: '', sortby: 'publishedAt' }));
    }
  }, [articlesStatus, dispatch]);

  const onClickButton = (i) => {
    dispatch(viewArticle(i));
    navigate('/article');
  };
  const onChangePagination = (e, page) => {
    dispatch(getAllNewsArticles({ page: page, keywords: searchKeyword, sortby: sortby }));
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      dispatch(getAllNewsArticles({ page: 1, keywords: searchKeyword, sortby: sortby }));
    }
  };
  const handlePopOver = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(!open);
  };
  const handleOnClick = (sortby) => {
    setOpen(false);
    setSortBy(sortby);
    dispatch(getAllNewsArticles({ page: 1, keywords: searchKeyword, sortby: sortby }));
  };
  const goToTop = () => {
    navigate('/');
    dispatch(resetArticles());
  };
  const Loader = () => {
    let rows = [],
      i = 0,
      len = 10;

    while (i++ <= len) rows.push(i);

    return rows.map((i) => {
      return (
        <Grid item lg={3} xs={12} key={i}>
          <CardLoader key={i} />
        </Grid>
      );
    });
  };
  return (
    <>
      <CustomAppBar title={'All News'} isWithSearch handleSearch={handleSearch} searchValue={searchKeyword} handleKeyUp={handleKeyUp} />
      <Grid container alignItems={'center'} columnSpacing={3} rowSpacing={3} sx={{ padding: '2%' }}>
        <Grid item lg={12} xs={12}>
          <Grid container justifyContent={'space-between'} alignItems="center" sx={{ width: '100%' }}>
            <Grid item>
              <Button onClick={goToTop}>Go to Top News Page</Button>
            </Grid>
            {}

            {searchKeyword.length > 0 && (
              <Grid item>
                {' '}
                <b>Sort</b>
                <IconButton onClick={handlePopOver}>
                  <FilterListIcon sx={{ fontSize: '30px' }} />
                </IconButton>{' '}
                <Popover open={open} anchorEl={anchorEl} transformOrigin={{ vertical: 'top' }} anchorOrigin={{ vertical: 'bottom' }}>
                  <Paper>
                    <MenuList>
                      <MenuItem onClick={() => handleOnClick('popularity')}>Popularity</MenuItem>
                      <MenuItem onClick={() => handleOnClick('relevance')}>Relevance</MenuItem>
                      <MenuItem onClick={() => handleOnClick('publishedAt')}>Published At</MenuItem>
                    </MenuList>
                  </Paper>
                </Popover>
              </Grid>
            )}
          </Grid>
        </Grid>

        {!error ||
          (count === 0 ? (
            <Grid item lg={12}>
              <Alert severity="info">
                <Typography variant="h4">The scope of your search is too broad. Please Use keywords to narrow the scope....</Typography>
              </Alert>
            </Grid>
          ) : (
            <>
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
            </>
          ))}
      </Grid>
    </>
  );
};

export default AllNews;
