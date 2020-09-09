import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const MyCarousel = () => {

    return(
        <Carousel className="Carousel">
            <Carousel.Item>
                <div className="image" style={{backgroundImage: `url('${require(`../../res/images/media/Carousel Slide 1.jpg`)}')`}}/>
            </Carousel.Item>
            <Carousel.Item>
                <Link to={`/products/the-complete-fiction-of-h-p-lovecraft`}>
                    <div className="image" style={{backgroundImage: `url('${require(`../../res/images/media/Carousel Slide 2.jpg`)}')`}}/>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to={`/products/the-complete-fiction-of-h-p-lovecraft`}>
                    <div className="image" style={{backgroundImage: `url('${require(`../../res/images/media/Carousel Slide 3.jpg`)}')`}}/>
                </Link>
            </Carousel.Item>
        </Carousel>

    );
}

export default MyCarousel;