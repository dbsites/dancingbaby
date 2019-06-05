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
};


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

export default Services