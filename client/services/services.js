/**
 * ************************************
 *
 * @module  services.js
 * @author  katzman
 * @date    06.02.2019
 * @description Single place for all API calls
 *
 * ************************************
 */


const routes = {
    userLoginRoute: '/api/login',
    assessmentRoute: '/api/assessment',
    youtubeRoute: '/api/videoInfo',
    // youtubeNonAPIRoute: 'https://noembed.com/embed?url=https://www.youtube.com/watch?v={videoId}'
};


const Services = {};

Services.userLoginRoute = ( loginData, onSuccess, onError ) =>
{
    Services.fetchData( routes.userLoginRoute, 'POST', JSON.stringify( loginData ), onSuccess, onError );
};

Services.assessmentSubmitRoute = ( assessmentData, onSuccess, onError ) =>
{
    Services.fetchData( routes.assessmentRoute, 'POST', JSON.stringify( assessmentData ), onSuccess, onError );
};

Services.getYoutubeVideoInfo = ( videoIds, onSuccess, onError ) =>
{
    Services.fetchData( routes.youtubeRoute, 'POST', JSON.stringify({ videoIds }), onSuccess, onError );
};

Services.fetchData = ( endpoint, type, data, onSuccess, onError ) =>
{
    fetch(endpoint,
        {
            method: type,
            body: data,
            headers: {'Content-Type': 'application/json'},
        })
        .then( res =>
        {
            if( res.ok )
            {
                return res.json();
            }

            if( onError ) onError( res );
        })
        .then( res =>
            {
                if( onSuccess ) onSuccess( res );
            }
        )
        .catch( err =>
            {
                if( onError ) onError( err )
            }
        );
};


export default Services