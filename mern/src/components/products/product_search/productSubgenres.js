import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_SUBGENRE } from '../../redux/actions';
import MyModal from '../../others/myModal';
import { NO_SUBGENRES_FOUND } from '../../others/errorMessages';
import { Dropdown } from 'react-bootstrap';

const ProductSubgenres = () => {

    //Redux
    const currentGenre = useSelector(state => state.products.genre);
    const currentSubgenre = useSelector(state => state.products.subgenre);
    const dispatch = useDispatch();

    //DB Data
    const [ subgenresData, setSubgenresData ] = useState([]);

    //Get DB Data
    useEffect(() => {
        axios.get(`http://localhost:4000/subgenres/${currentGenre}`).then(response => {
            setSubgenresData(response.data);
        }).catch(err => setIsModalVisible(true));
    }, [subgenresData.length]);

    //DB Data mapping
    const subgenreList = () => {
        if (!Array.isArray(subgenresData)) return <React.Fragment></React.Fragment>;
        return subgenresData.map((subgenre, i) => <Dropdown.Item key={subgenre._id} onClick={handleChange}>{subgenre.subgenre}</Dropdown.Item>);
    }
    const handleChange = e => dispatch({type: SELECT_SUBGENRE, payload: e.target.text});

    //Modal
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);

    //Selection
    const selectedIndex = () => {
        if (!Array.isArray(subgenresData)) return -1;
        for (let i = 0; i < subgenresData.length; i++) if (subgenresData[i].subgenre === currentSubgenre) return i;
        return -1;
    }

    return (
        <React.Fragment>
            {(isModalVisible) ? (<MyModal Title='Book Search' Content={NO_SUBGENRES_FOUND} Close={(toggleModal)} btnText='Close'/>): (<></>)}
            <Dropdown className="myDropdown">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">{(selectedIndex() === -1) ? `Subgenres` : subgenresData[selectedIndex()].subgenre}</Dropdown.Toggle>
                <Dropdown.Menu>{subgenreList()}</Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProductSubgenres;