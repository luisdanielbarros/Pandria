import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_GENRE } from '../../redux/actions';
import ProductSubgenres from './productSubgenres';
import MyModal from '../../others/myModal';
import { NO_GENRES_FOUND } from '../../others/errorMessages';
import { Dropdown } from 'react-bootstrap';

const ProductGenres = () => {

    //Redux
    const currentGenre = useSelector(state => state.products.genre);
    const dispatch = useDispatch();

    //DB Data
    const [ genresData, setGenresData ] = useState(0);

    //Get DB Data
    useEffect(() => {
        axios.get('http://localhost:4000/genres').then(response => {
            setGenresData(response.data);
        }).catch(err => setIsModalVisible(true));
    }, [genresData.length]);

    //DB Data mapping
    const genreList = () => {
        if (!Array.isArray(genresData)) return <React.Fragment></React.Fragment>;
        return genresData.map((genre, i) => <Dropdown.Item key={genre._id} onClick={handleChange}>{genre.genre}</Dropdown.Item>);
    }
    const handleChange = e => dispatch({type: SELECT_GENRE, payload: e.target.text});

    //Modal
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);

    //Selection
    const selectedIndex = () => {
        if (!Array.isArray(genresData)) return -1;
        for (let i = 0; i < genresData.length; i++) if (genresData[i].genre === currentGenre) return i;
        return -1;
    }

    return (
        <React.Fragment>
            {(isModalVisible) ? (<MyModal Title='Book Search' Content={NO_GENRES_FOUND} Close={(toggleModal)} btnText='Close'/>) : (<></>)}
            <Dropdown className="myDropdown">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">{(selectedIndex() === -1) ? `Genres` : genresData[selectedIndex()].genre}</Dropdown.Toggle>
                <Dropdown.Menu>{genreList()}</Dropdown.Menu>
            </Dropdown>
            {(currentGenre) ? (<ProductSubgenres/>) : (<></>)}
        </React.Fragment>
    );
};

export default ProductGenres;