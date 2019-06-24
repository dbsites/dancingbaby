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
    youtubeRoute: 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id={videoId},-VoFbH8jTzE&key={apiKey}',
    youtubeNonAPIRoute: 'https://noembed.com/embed?url=https://www.youtube.com/watch?v={videoId}'
};

const YOUTUBE_API_KEY = 'AIzaSyDapyM9CSUYKshB1MnQQ2mv4deUwRjvW7k';

const Services = {};

Services.userLoginRoute = ( loginData, onSuccess, onError ) =>
{
    const data = JSON.stringify( loginData );

    console.log( "USER LOGIN CALLED: ", data );

    fetch(routes.userLoginRoute,
    {
        method: 'POST',
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
            console.log( "RES: ", res );

            if( onSuccess ) onSuccess( res );
        }
    )
    .catch( err =>
        {
            if( onError ) onError( err )
        }
    );
};


Services.assessmentSubmitRoute = ( assessmentData, onSuccess, onError ) =>
{
    const data = JSON.stringify( assessmentData );

    console.log( "ASSESSMENT COMPLETE CALLED: ", data );

    fetch(routes.assessmentRoute,
        {
            method: 'POST',
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
                console.log( "RES: ", res );

                if( onSuccess ) onSuccess( res );
            }
        )
        .catch( err =>
            {
                if( onError ) onError( err )
            }
        );
};

Services.getYoutubeVideoInfo = ( videoid, onSuccess, onError ) =>
{
    // const data = JSON.stringify( assessmentData );
    // const youTubeRoute = routes.youtubeRoute.split('{videoId}').join('3Wf29RiKp70').split('{apiKey}').join(YOUTUBE_API_KEY);
    const youTubeRoute = routes.youtubeNonAPIRoute.split('{videoId}').join(videoid);

    fetch(youTubeRoute,
        {
            method: 'POST',
            // body: data,
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
                console.log( "YOU TUBE RES: ", res );

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