const cfg = require('config');
const fetch = require('node-fetch');

const youtubeApiKey = process.env.YOUTUBE_API_KEY || cfg.get('youtubeApiKey');

const youtubeApi = {};


youtubeApi.getVideoInfo = (req, res, next) => {
  
  if (!req.query.videoIds) {
    const error = new Error(`No video ids passed`)
    error.status = 400;
    return next(error)
  } else if (!youtubeApiKey) {
    const error = new Error(`No youtube Api Key configured`)
    error.status = 400;
    return next(error)
  } 
  
  const videoUrls = req.query.videoIds.split(',').map( id => `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${youtubeApiKey}`)


  Promise.all(videoUrls.map(url => fetch(url)))
  .then(resp => Promise.all( resp.map(r => r.text()) ))
  .then(result => {
    res.locals.youtubeData = result;
    return next();
  })
  .catch(err => {
    const error = new Error(err);
    error.status = 500;
    return next(error);
  })

}

module.exports = youtubeApi;