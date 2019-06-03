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
            if(res.status === 200)
            {
               if( onSuccess ) onSuccess( res );
            }
            else
            {
               if( onError ) onError( res );
            }
        }
    )
    .catch( err =>
        {
            if( onError ) onError( res )
        }
    );
};

export default Services