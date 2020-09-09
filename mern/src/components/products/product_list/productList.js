import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductListed from './productListed';
import ProductSingle from '../product_single/productSingle';
import axios from 'axios';
import MyModal from '../../others/myModal';
import LoadingScreen from '../../others/loadingScreen';
import { Container, Row } from 'react-bootstrap';

const ProductList = ({parentViewMode, search_string = undefined, subgenre = undefined, popularity = 'desc', release_date = 'asc', title, stylingClass}) => {

    //Mode & Scaling
    const currViewMode = useSelector(state => state.products[parentViewMode]);
    const currViewModeScaling = useSelector(state => state.products.views[currViewMode].scaling);
    const [ isLoading, setIsLoading ] = useState(true);
    let match = useRouteMatch();

    //DB Data
    const [ productData, setProductData ] = useState(0);
    const [ lastSearchString, setLastSearchString ] = useState(0);
    const [ lastSubgenre, setLastSubgenre ] = useState(0);
    const [ lastPopularity, setLastPopularity ] = useState(0);
    const [ lastReleaseDate, setLastReleaseDate ] = useState(0);
    if (lastSearchString !== search_string || lastSubgenre !== subgenre || lastPopularity !== popularity || 
        lastReleaseDate !== release_date) {
        if (lastSearchString !== search_string) setLastSearchString(search_string);
        if (lastSubgenre !== subgenre) setLastSubgenre(subgenre);
        if (lastPopularity !== popularity) setLastPopularity(popularity);
        if (lastReleaseDate !== release_date) setLastReleaseDate(release_date);
        setProductData(0);
    }

    //Get DB Data
    useEffect(() => {
        axios({
            method: `GET`,
            port: 4000,
            url: `http://localhost:4000/books`,
            params: { search_string, subgenre, popularity, release_date },
            headers: { "Content-Type": `application/json` }
        }).then(response => {
            setProductData(response.data);
            setIsLoading(false);
        }).catch(err => {
            console.log('Could not find products, error: '+err);
        });
    }, [productData.length]);


    const productListClass = () => {
        switch (currViewMode) {
            default:
            case `default`:
                return `productList-default`;
            case `shelf`:
                return `productList-shelf`;
            case `stack`:
                return `productList-stack`;
            case `singular`:
                return `productList-singular`;
        }
    }
    const productListContained = () => {
        switch (currViewMode) {
            default:
            case `default`:
                return <Container><Row className='productList-contained-default'>{productList()}</Row></Container>
            case `shelf`:
                return <Row className='productList-contained-shelf'>{productList()}</Row>
            case `stack`:
                return <Row className='productList-contained-stack'>{productList()}</Row>
            case `singular`:
                return <Row className='productList-contained-singular'>{productList()}</Row>
        }
    }
    //DB Data mapping
    const productList = () => {
        if (!Array.isArray(productData)) return <React.Fragment></React.Fragment>
        return productData.map((product, i) => <ProductListed key={i} url={product.url} title={product.title} 
            description={`${product.description.substring(0, 50)}${product.description.length > 50 ? `...` : ''}`} author={product.author} 
            cover={product.cover} side={product.side} back={product.back}
            price_hardcover={product.price.hardback} price_paperback={product.price.paperback}
            pages={product.details.pages}
            dimensions={product.details.dimensions}
            weight={product.details.weight}
            publication_date={product.details.publication_date}
            publisher={product.details.publisher}
            language={product.details.language}
            reviews={Object.entries(product.reviews)
            }
            viewMode={currViewMode}
            viewModeScaling={currViewModeScaling}
        />);
    }

    const getProduct = id => {
        if (!Array.isArray(productData)) return 0;
        return productData.filter(product => product.url === id);
    }

    //Modal
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);
    const [ modalContent ] = useState('');

    if (isLoading) return <LoadingScreen/>;
    return (
        <React.Fragment>
            {(isModalVisible) ? (<MyModal Title='Book Search' Content={modalContent} Close={(toggleModal)} btnText='Close'/>): (<></>)}
            <Row className={`productList-content ${stylingClass} ${productListClass()}`}>
                <h2 className="productList-title">{title}</h2>
                <Switch>
                    <Route exact path={`${match.path}/:productId`}>
                        <ProductSingle Load={getProduct}/>
                        {productListContained()}
                    </Route>
                    <Route path={match.path}>
                        {productListContained()}
                    </Route>
                </Switch>
            </Row>
        </React.Fragment>
    );
};

export default ProductList;