import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_VIEWMODE_ACTION } from '../../redux/actions';
import { Form } from 'react-bootstrap';

const ProductScaling = ({ parentViewMode }) => {

    //Redux
    const currViewMode = useSelector(state => state.products[parentViewMode]);
    const Action = GET_VIEWMODE_ACTION(currViewMode);
    const currViewModeScaling = useSelector(state => state.products.views[currViewMode].scaling);  
    const dispatch = useDispatch();

    //Data
    const viewmodeScalingRef = React.createRef(currViewModeScaling);

    if (currViewMode === `default`) return <></>
    return (
        <Form.Group className="myRange">
            <Form.Label>Scaling</Form.Label>
            <Form.Control type="range" defaultValue={currViewModeScaling} ref={viewmodeScalingRef} onChange={() => 
                dispatch({type: Action, payload: parseInt(viewmodeScalingRef.current.value)})}/>
        </Form.Group>
    );
};

export default ProductScaling;