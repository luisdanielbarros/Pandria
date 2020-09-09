import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { BsArrowRight } from "react-icons/bs";

const ProductListed = ({url, title, description, author, cover, side, back, 
    price_hardcover, price_paperback,
    reviews,
    dimensions, weight, publication_date, publisher, language,
    viewMode, viewModeScaling
    }) => {

    //Redux
    dimensions = dimensions.map(x => x * (viewModeScaling/50));

    const JSXWrap = JSXContent => <Link to={`/products/${url}`}>{JSXContent}</Link>

    switch (viewMode) {
        default:
        case 'default':
        case 'stack':
        case 'singular':
            return (
            <Col md={3} xs={4} className="productListed productListed-default">
                {JSXWrap(<Card>
                    <Card.Img variant="top" src={require(`../../../res/images/books/${cover}.jpg`)}/>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {description}
                            {price_hardcover}
                        </Card.Text>
                        <BsArrowRight/>
                    </Card.Body>
                </Card>)}
            </Col>);
        break;
        case 'shelf':
            return (
                <div className="productListed productListed-shelf">
                    <p className="productListed-shelf-author">{author}</p>
                    <p className="productListed-shelf-title">{title}</p>
                </div>);
        break;
    }
}

export default ProductListed;