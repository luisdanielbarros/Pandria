import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { BsFillDisplayFill, BsFillCollectionFill, BsFillLayersFill, BsBookHalf } from 'react-icons/bs';

const ProductViews = ({parentViewMode, Action}) => {

    //Redux
    const currViewMode = useSelector(state => state.products[parentViewMode]);
    const dispatch = useDispatch();

    //Data
    const viewModes = [
        {
            name: 'default',
            description: 'online store default view',
            icon: BsFillDisplayFill
        },
        {
            name: 'shelf',
            description: 'a book in a shelf',
            icon: BsFillCollectionFill
        },
        {
            name: 'stack',
            description: 'a tower of books',
            icon: BsFillLayersFill
        },
        {
            name: 'singular',
            description: 'one at a time',
            icon: BsBookHalf
        }
    ]

    //Selection
    const selectedIndex = () => {
        const x = viewModes.indexOf(viewModes.filter(viewMode => viewMode.name === currViewMode)[0]);
        return x === -1 ? 0 : x;
    }

    //Data mapping
    const viewModeList = () => viewModes.map((viewmode, i) => <Dropdown.Item key={i} active={viewModes[selectedIndex()].name === viewmode.name}
    onClick={() => {
        alert(`The multiple views functionality isn't implemented in this demo.\n
        View:\n
        1. Default view is the only one available in the demo, do you like it? (What about dark theme?).\n
        2. Shelf view would resemble books on a shelf.\n
        3. Stack review a tower of books.\n
        4. Singular view a closed book on a table.\n
        The graphic content would be created with Blender 3D as online stock images don't match as well as quick arrangements of 
        pre-made models do. Same book models, same style images, sameness is essential for identity cohesion.`);
        //dispatch({type: Action, payload: viewmode.name});
    }}>{<viewmode.icon/>}</Dropdown.Item>);

    return (
        <React.Fragment>
            <Dropdown className="myDropdown">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">{React.createElement(viewModes[selectedIndex()].icon)}</Dropdown.Toggle>
                <Dropdown.Menu>{viewModeList()}</Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProductViews;