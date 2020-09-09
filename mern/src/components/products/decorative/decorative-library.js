import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";

const DecorativeLibrary = ({type, sentence, url}) => {

    const typeClass = () => {
        switch (type) {
            case 0:
                return `Bookshelf`;
            case 1:
                return `Book`;
            default:
                return `Bookshelf`;
        }
    }

    return (<React.Fragment>
        <hr className="productListSep"/>
        <Row className={typeClass()}>
            <Col>
                {url ? <Link to={`products/${url}`}><p>{sentence}</p><span>Check out book&nbsp;<BsArrowRight/></span></Link> : <p>Sentence</p>}
            </Col>
        </Row>
        <hr className="productListSep"/>
    </React.Fragment>);
}

export default DecorativeLibrary;