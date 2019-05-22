import sortBy from 'array-sort';
import $ from 'jquery';
import * as strings from "../constants/strings";


//const effectivityRegEx = new RegExp(strings.EFFECTIVITY_REGEX);


export default class Utils {

    /**
     * Filters an array of objects by a string value of an object prop.
     * @param _list: Array of objects to be filtered
     * @param _filters: Object made up of keys which equate to the object prop and it's value
     * @returns array of filter objects
     */
    static filterList( _list, _filters )
    {
        if( !_list ) return [];
        if( !_filters || _filters.length === 0 ) return _list;

        const filtered = [];
        const addedItems = [];
        
        let checkValue;
        let shouldAddCsuf;
        let shouldAddDate;
        let shouldAddRev;
        let shouldAddModel;
        let shouldAddStatus;

        let checkCsuf;
        let checkModel;
        let checkStatus;

        checkModel = false;
        checkStatus = false;
        checkCsuf = false;

        _filters.forEach((filter) =>
        {
            checkModel = filter.prop === 'model';
            checkStatus = filter.prop === 'status';
            checkCsuf = filter.type === 'csuf';
        });
        
        _list.forEach((item, index) =>
        {
            shouldAddCsuf = false;
            shouldAddDate = true;
            shouldAddRev = true;
            shouldAddModel = false;
            shouldAddStatus = false;

            _filters.forEach((filter) =>
            {
                checkValue = item[filter.prop] ? item[filter.prop] : "";

                if( filter.type === 'date_range' )
                {
                    if( checkValue > filter.value.end || checkValue < filter.value.start ) shouldAddDate = false;
                }

                if( checkCsuf )
                {
                    if( filter.type === 'csuf' )
                    {
                        let filterString = filter.value;
                        let subCheckValue;
                        subCheckValue = checkValue.substr(0, filterString.length);
                        shouldAddCsuf = subCheckValue === filterString;

                        if( filterString === "" ) shouldAddCsuf = true;
                    }
                }
                else
                {
                    shouldAddCsuf = true;
                }

                if( filter.prop === 'h_rev' )
                {
                    let filterString = filter.value;
                    let subCheckValue;
                    subCheckValue = checkValue.substr(0, filterString.length);
                    shouldAddRev = subCheckValue === filterString;

                    if( filterString === "" ) shouldAddRev = true;
                }

                if( checkModel )
                {
                    if( filter.prop === 'model' )
                    {
                        shouldAddModel = filter.value.toLowerCase() === checkValue.toLowerCase();
                    }
                }
                else
                {
                    shouldAddModel = true;
                }

                if( checkStatus )
                {
                    if( filter.prop === 'status' )
                    {
                        shouldAddStatus = filter.value.toLowerCase() === checkValue.toLowerCase();
                    }
                }
                else
                {
                    shouldAddStatus = true;
                }

                if( shouldAddCsuf && shouldAddDate && shouldAddRev && shouldAddModel && shouldAddStatus && addedItems.indexOf(index) === -1 )
                {
                    filtered.push(item);
                    addedItems.push(index);
                }
            });
        });
        
        return filtered;
    }


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


    /**
     *
     * @param _list
     * @param _sortProps
     * @returns array of sorted objects
     */

    static sortArrayByObjectProp(_list, _sortProps)
    {
        console.log( "SORT CALLED: ", _list, _sortProps );
        
        // checks for list items and sort prop, if no value it bails
        if( !_list || !_sortProps ) return null;

        // makes copy of list, not sure if this changes the actual list.
        const list = [].concat(_list);

		const compare = (prop) =>
        {
			return ( a, b ) =>
            {
				if( !a[prop] && !b[prop] ) return 0;
				if( a[prop] && !b[prop] ) return 1;
				if( !a[prop] && b[prop] ) return -1;
                return a[prop].localeCompare(b[prop], 'en', { numeric:true });
			};
		};
		
		return sortBy( list, compare(_sortProps.propList), { reverse: _sortProps.reverse });
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

    static getPosition(_elementID, _containerID)
    {
        let element = $(`#${_elementID}`);
        let position = element.position();
        let container = $(`#${_containerID}`);
        let parent = element.parent();

        let position1 = parent.offset();
        let position2 = container.offset();

        if (!position1 || !position2) return {x: 0, y: 0};

        return {
            x: position1.left - position2.left + position.left,
            y: position1.top - position2.top + position.top
        };
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

    // if it passes the regex test it will pass an effectivity object back. If it's a single item, not a range
    // it will pass the same value for start and end. Assumes your passing a string with an effectivity range or single item.
    static isEffectivity( _value )
    {
		const rangeItems = {};
        const effRange   = _value.replace( '-', '' ).toUpperCase().trim();
        
        if( effRange.length !== 5 && effRange.length !== 10 ) return null;

        let alphaRegExpr = /^[0-9A-Z][A-Z]$/;
        let numRegExpr = /^[0-9]{3}$/;

        const id1 = effRange.substr(0, 2);
        if( !alphaRegExpr.test( id1 )) return null;

        const num1 = effRange.substr(2, 3);
        if( !numRegExpr.test( num1 )) return null;

        if( effRange.length === 5 )
        {
            rangeItems[`${id1}${num1}`] = true;
            return {
                id: id1,
                start: num1,
                end: num1,
                name: effRange,
                AIRISValue: effRange,
                rangeItems: rangeItems
            }
        }

        const id2 = effRange.substr(5, 2);
        const num2 = effRange.substr(7, 3);

        if( id1 !== id2 || !numRegExpr.test(num2) || num1 > num2 ) return null;
	
		const end = parseInt( num2, 10 );
		let start = parseInt( num1, 10 );
        let dashedValue = `${id1}${num1}-${id1}${num2}`;
        
        for( ; start <= end; start++ )
        {
            rangeItems[`${id1}${start.toString().padStart(3,"0")}`] = true;
        }
        
        return {
            id: id1,
            start: num1,
            end: num2,
            name: dashedValue,
            AIRISValue: effRange,
            rangeItems: rangeItems
        }
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