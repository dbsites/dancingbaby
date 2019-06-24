
export default class Utils
{


    static simpleFilterList( _list, _filter )
    {
        if( !_list ) return [];
        if( !_filter || !_filter.value ) return _list;

        const filtered = [];
        const filterString = _filter.value;

        _list.forEach(( item ) =>
        {
            const addItem = item[_filter.prop].substr(0, filterString.length).toLowerCase() === filterString.toLowerCase();
            if( addItem ) filtered.push(item);
        });

        return filtered;
    }



    static getIndexOfObject( _array, _object )
    {
        if( !_array || _array.length === 0 ) return -1;

        let checkItem = JSON.stringify(_object);

        return _array.findIndex(( item ) =>
        {
            return checkItem === JSON.stringify(item);
        });
    }


    static objectCompare( _obj1, _obj2 )
    {
        return JSON.stringify(_obj1) === JSON.stringify(_obj2);
    }


    static getIndexByObjectProp( _array, _prop )
    {
        if( !_array || _array.length === 0 ) return -1;

        return _array.findIndex((item) =>
        {
            return JSON.stringify(item).indexOf(_prop) > -1;
        });
    }


    static clearInput( input )
    {

    }


    static hasClass( ele, cls )
    {
        if( !ele ) return null;
        return !!ele.className.match( new RegExp('(\\s|^)' + cls + '(\\s|$)') );
    }

    static addClass( ele, cls )
    {
        if( !ele ) return null;
        if( !Utils.hasClass( ele, cls )) ele.className += " " + cls;
    }

    static removeClass(ele, cls)
    {
        if (!ele) return null;

        if( Utils.hasClass( ele, cls ))
        {
            let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }

    static isStringEmpty(_string)
    {
        return (!_string || _string.length === 0 || !_string.trim());
    }


    static padString( _num, _size, _pad = "0000" )
    {
        let num = _pad + _num;
        return num.substr( num.length - _size );
    }


    static getQueryVariable(_prop)
    {
        let query = window.location.search.substring(1);
        let lets = query.split("&");
        let pair;

        for (let i = 0; i < lets.length; i++) {
            pair = lets[i].split("=");
            if (pair[0] === _prop) {
                return pair[1];
            }
        }

        return null;
    }


    static getValueFromObject(_obj, _prop)
    {
        if (!_obj || !Object.keys(_obj).length) return null;

        let checkKeys;

        if( typeof _obj === 'object' )
        {
            checkKeys = Object.keys(_obj);

            if( checkKeys.indexOf(_prop) > -1 )
            {
                return _obj[_prop];
            }
            else
            {
                checkKeys.forEach((key) =>
                {
                    Utils.getValueFromObject(_obj[key], _prop);
                })
            }
        }

        return null;
    }


    static getArrayfromStringBySpace( _string )
    {
		if( _string.indexOf( ',' ) > -1 )
        {
            return _string.split( ',' );
        }
        
        return _string.split(/(\s+)/).filter(( str ) => str.trim().length > 0 );
    }

    
    static chunkArray( _array, _count )
    {
        const resultArray = [];
   
        let count = _count -1;
        let outerCount = 0;
        let innerCount = 0;
        
        _array.forEach(( item, index ) =>
        {
			if( !resultArray[outerCount] ) resultArray[outerCount] = [];
			resultArray[outerCount][innerCount] = item;
            
            if( innerCount < count )
            {
				innerCount++;
			}
			else
            {
				innerCount = 0;
				outerCount++;
            }
        });
        
        return resultArray;
    }
    
    static getObjValueByPartialKey( _obj, _key )
    {
        if( !_obj || !_key ) return;
        
        const keys = Object.keys( _obj );
        const length = keys.length;
        let key;
        
        for( let i=0; i<length; i++ )
        {
            key = keys[i];
            if( key.indexOf(_key) > -1 )
            {
                return { key, value:_obj[key] };
            }
        }
    }

    static getLastStringPart( _string, _separator )
    {
        if (!_string) return null;
        if (!_separator) return _string;
        const parts = _string.split(_separator);

        return parts[parts.length-1];
    }
}