import { Grid, Typography, Paper, Box, Avatar } from '@mui/material';
import CustomAppBar from '../../components/CustomAppBar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirstLetter } from '../../common/utils';
const Article = ({ title }) => {
  const articleView = useSelector((state) => state.articles.articleView);
  const navigate = useNavigate();
  useEffect(() => {
    if (!articleView.title) {
      navigate('/');
    }
  }, [articleView, navigate]);
  return (
    <>
      <CustomAppBar title={'Article'} handleBack={() => navigate(-1)} />
      <Grid container alignItems={'center'} columnSpacing={3} rowSpacing={3} sx={{ padding: '2%' }}>
        <Grid item lg={12}>
          <Paper elevation={3}>
            <Grid container sx={{ padding: '2%' }}>
              <Grid item lg={12} xs={12}>
                <Typography variant="h3">{articleView.title}</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Typography variant="h6">{new Date(articleView.publishedAt).toDateString()}</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Grid container alignItems={'center'}>
                  <Avatar sx={{ bgcolor: 'red' }}>{articleView.author ? getFirstLetter(articleView.author) : 'U'}</Avatar>
                  <Typography variant="subtitle1" sx={{ margin: '20px' }}>
                    {articleView.author ? articleView.author : 'Unknown'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <Box
                  minWidth={'30%'}
                  maxWidth={'100%'}
                  component="img"
                  src={articleView.urlToImage ? articleView.urlToImage : 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'}
                  sx={{ float: 'left', margin: '0 1% 0 0' }}
                />
                <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                  <b>Description: </b>
                  {articleView.description}
                </Typography>
                <br />
                <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                  {articleView.content}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Article;
