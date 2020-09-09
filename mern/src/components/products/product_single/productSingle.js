import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_PRODUCT_FORMAT } from '../../redux/actions';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../../others/loadingScreen';
import { Row, Col, Form, Dropdown, Button} from 'react-bootstrap';
import { BsXSquareFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';

const ProductSingle = () => {

    //Redux
    const selectedProduct_Format = useSelector(state => state.products.product.format);
    const dispatch = useDispatch();
    
    let { url } = useParams();
    const [ isLoading, setIsLoading ] = useState(true);

    //DB Data
    const [ productData, setProductData ] = useState(0);

    //Get DB Data
    useEffect(() => {
        axios({
            method: `GET`,
            port: 4000,
            url: `http://localhost:4000/books`,
            params: { url },
            headers: { "Content-Type": `application/json` }
        }).then(response => {
            setProductData(response.data[0]);
            setIsLoading(false);
        }).catch(err => {
            console.log('Could not find products, error: '+err);
        });
    }, [productData.length]);

    //Form Validation
    const [validated, setValidated] = useState(false);
    //Submit
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
    };

    //Prices
    const Prices = () => {
        if (isLoading) return <Dropdown.Item>Loading...</Dropdown.Item>
        let i = 0;
        return Object.entries(productData.price).map(index => <Dropdown.Item key={i++}
            onClick={e => dispatch({type: SELECT_PRODUCT_FORMAT, payload: e.target.text})}
        >{`${index[0]} - ${index[1]}€`}</Dropdown.Item>);
    }

    //Reviews
    const Reviews = () => {
        if (isLoading) return <p>Loading...</p>
        return productData.reviews.map(review => {
            let reviewDate = new Date(review.date);
            let nowDate = new Date();
            let Interval = nowDate - reviewDate; 
            let secondsAgo = Interval / 1000
            let minutesAgo = Math.round(secondsAgo / 60)
            let hoursAgo = minutesAgo / 60
            let daysAgo = hoursAgo / 60
            let yearsAgo = daysAgo / 60
            let dateString = ``;
            if (yearsAgo >= 1) dateString = `${Math.round(yearsAgo)} years ago.`;
            else if (yearsAgo >= 1) dateString = `${Math.round(yearsAgo)} years ago.`;
            else if (daysAgo >= 1) dateString = `${Math.round(daysAgo)} days ago.`;
            else if (hoursAgo >= 1) dateString = `${Math.round(hoursAgo)} hours ago.`;
            else if (minutesAgo >= 1) dateString = `${Math.round(minutesAgo)} minutes ago.`;
            else dateString = `${Math.round(secondsAgo)} seconds ago.`;
            if (!(review.username && review.rating && review.review && dateString)) return <p className='productSingle-noreviews'>No reviews available.</p>
            return (
                <Col>
                    <div className="productSingle-review-header">
                        <p className='productSingle-username'>{review.username}</p>
                        <p className='productSingle-rating'>{review.rating}</p>
                    </div>
                    <p className='productSingle-review'>{review.review}</p>
                    <div className="productSingle-review-footer">
                        <p className='productSingle-date'>{dateString}</p>
                    </div>
                </Col>
            )
        });
    }

    if (isLoading) return <LoadingScreen/>;
    return (
        <>
        <Link to="/products"><div className="productSingle-container"></div></Link>
        <div  className="productSingle">
            <Row>
                <Link to="/products" className="productSingle-close"><BsXSquareFill/></Link>
                <Col md={6} xs={6} className="productSingle-Gallery">
                    <section>
                        <div style={{ backgroundImage: `url('${require(`../../../res/images/books/${productData.cover}.jpg`)}')` }}></div>
                        <div style={{ backgroundImage: `url('${require(`../../../res/images/books/${productData.back}.jpg`)}')` }}></div>
                    </section>
                </Col>
                <Col md={6} xs={6} className="productSingle-Info">
                    <Row>
                        <Col>
                            <h3 className='productSingle-title'>{productData.title}</h3>
                            <h4 className='productSingle-author'>{productData.author}</h4>
                            <p className='productSingle-description'>{productData.description}</p>
                            <p className='productSingle-subgenre'>{productData.subgenre}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4 className='productSingle-details'>Details</h4>
                            <div className='productSingle-details-grid'>
                            <div>
                                <ul className='productSingle-dimensions'>Dimensions
                                    <li className='productSingle-width'>{productData.details.dimensions[0]}</li>
                                    <li className='productSingle-height'>{productData.details.dimensions[1]}</li>
                                    <li className='productSingle-thickness'>{productData.details.dimensions[2]}</li>
                                </ul>
                                <p className='productSingle-weight'>{productData.details.weight}</p>
                            </div>
                            <div>
                                <p className='productSingle-pages'>{productData.details.pages}</p>
                                <p className='productSingle-publication-date'>{productData.details.publication_date}</p>
                                <p className='productSingle-publisher'>{productData.details.publisher}</p>
                                <p className='productSingle-language'>{productData.details.language}</p>
                            </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Form className="productSingle-form" validated={validated} onSubmit={handleSubmit}>
                            <div className="productSingle-prices">
                                <Dropdown className="myDropdown">
                                    <Dropdown.Toggle variant="dark">{selectedProduct_Format}</Dropdown.Toggle>
                                    <Dropdown.Menu>{Prices()}</Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <Button className="productSingle-cart myBtn myBtn-dark" type="submit" onClick={() => alert(`The shopping cart functionality isn't implemented in this demo.`)}><FaShoppingCart/></Button>
                        </Form>
                    </Row>
                </Col>
            </Row>
            <Row className="productSingle-feedback-container">
                <Col md={6} xs={6}>
                    <h4 className='productSingle-feedback'>Feedback</h4>
                    <p className='productSingle-popularity'>{productData.popularity}</p>
                    <h4 className='productSingle-reviews'>Reviews</h4>
                    <ul>{Reviews()}</ul>
                </Col>
            </Row>
        </div>
        </>
    );
}

export default ProductSingle;