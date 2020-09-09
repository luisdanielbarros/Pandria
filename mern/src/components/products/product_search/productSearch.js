import React from 'react';
import { useSelector } from 'react-redux';
import { CHANGE_STORE_VIEW_MODE } from '../../redux/actions';
import Cookies from 'js-cookie';
import ProductGenres from '../product_search/productGenres';
import ProductSearchString from '../product_search/productSearchString';
import ProductViews from '../product_search/productViews';
import ProductScaling from '../product_search/productScaling';
import ProductList from '../product_list/productList';
import { Row, Col, Navbar, Nav, Form } from 'react-bootstrap';
import DecorativeLibrary from "../decorative/decorative-library";

const ProductSearch = () => {

  //Cookies, Redux
  let currentTheme = Cookies.get(`theme`);
  const reduxTheme = useSelector(state => state.user.theme);
  if (currentTheme === undefined) currentTheme = reduxTheme;    const currentSubgenre = useSelector(state => state.products.subgenre);
    const currentSearchString = useSelector(state => state.products.search_string);

    return(
        <React.Fragment>
            <Navbar className="pb-1 pt-1 ProductSearch" expand="md" defaultExpanded="true">
                <Navbar.Toggle data-toggle="collapse" data-target="#basic-navbar-nav" aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Form className="d-flex flex-row align-items-center">
                            <ProductGenres/>
                            <ProductSearchString/>
                            <ProductViews parentViewMode='store_view_mode' Action={CHANGE_STORE_VIEW_MODE}/>
                            <ProductScaling parentViewMode='store_view_mode'/>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Row className="productSearch-title">
                <h1>Books</h1>
            </Row>
            <Row>
                <Col className="p-0">
                    {(currentSubgenre || currentSearchString) ? <ProductList subgenre={currentSubgenre} search_string={currentSearchString} popularity='desc' 
                    title='Search' parentViewMode='store_view_mode' stylingClass='productList-Search'/> : <></>}
                    <hr className="productListSep"/>
                    <ProductList popularity='desc' title='Popular' parentViewMode='store_view_mode' stylingClass='productList-Popular'/>
                    {currentTheme === `dark` ? <DecorativeLibrary type={0} sentence={
                        `From such books I learned all that I know. No teacher urged or guided me, 
                        and I do not recall hearing any human voice in all those years - not even my own; 
                        for although I had read of speech, I had never thought to try to speak aloud.`
                    } url="the-complete-fiction-of-h-p-lovecraft" /> : <></>}
                    <ProductList release_date='desc' title='New Releases' parentViewMode='store_view_mode' stylingClass='productList-newReleases'/>
                    {currentTheme === `dark` ? <DecorativeLibrary type={1} sentence={
                        `My aspect was a matter equally unthought of, for there were no mirrors in the castle, 
                        and I merely regarded myself by instinct as akin to the youthful figures I saw drawn and 
                        painted in the books.`
                    } url="the-complete-fiction-of-h-p-lovecraft"/> : <></>}
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ProductSearch;