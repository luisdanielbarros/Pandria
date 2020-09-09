import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_STRING } from '../../redux/actions';
import { FormControl, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const ProductSearchString = () => {

    //Redux
    const currentSearchString = useSelector(state => state.products.search_string);
    const dispatch = useDispatch();

    const handleChange = e => dispatch({type: SEARCH_STRING, payload: e.target.value});


    return (
        <div className="d-flex flex-row align-items-center justify-content-center">
        <FormControl defaultValue={currentSearchString} onChange={handleChange} type="text" placeholder="Search" className="mySearchBar" />
        <Button className="mySearchBtn"><BsSearch/></Button>
    </div>
    )
}

export default ProductSearchString;