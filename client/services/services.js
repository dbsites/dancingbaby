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

Services.getYoutubeVideoInfo = ( videoids, onSuccess, onError ) =>
{
    const data = videoids.toString();

    fetch(routes.youtubeRoute,
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