import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
//Custom SCSS, Bootstrap CSS and JS
import './custom.scss';
//Authentication & Cookies
import Cookies from 'js-cookie';
import ProtectedRoute from './components/others/protectedRoute';
import CookiesLogin from './components/others/cookiesLogin';
//My Components
////Navbar
import NavBar from './components/navbar/navBar';
////Footer
import Footer from './components/others/footer';
////Carousel
import MyCarousel from './components/others/myCarousel';
////Users
import UserSignUp from './components/users/userSignUp';
import UserSignIn from './components/users/userSignIn';
import UserLogout from './components/users/userLogout';
import UserProfile from './components/users/userProfile';
import UserUpdatePrivInfo from './components/users/userUpdatePrivInfo';
////Products
import Products from './components/products/Products';
import ProductSingle from './components/products/product_single/productSingle';
////Not Found
import NotFound from './components/others/notFound';
//BootStrap
import { Container } from 'react-bootstrap';
//Animations
import { useSpring, animated} from "react-spring";

const App = () => {

  //Cookies, Redux
  let currentTheme = Cookies.get(`theme`);
  const reduxTheme = useSelector(state => state.user.theme);
  if (currentTheme === undefined) currentTheme = reduxTheme;

  //Animations
  const fadeIn = useSpring({opacity: 1, from: {opacity: 0}});

  return (
    <animated.div style={fadeIn}>
      <CookiesLogin/>
      <Container fluid>
        <NavBar/>
      </Container>
      <Container fluid className={`main-container ${currentTheme === `dark` ? `theme-dark` : ``}`}>
          <Switch>
            <Route path="/" exact component={MyCarousel}/>
            <Route exact path="/users/signup" component={UserSignUp}/>
            <Route exact path="/users/signin" component={UserSignIn}/>
            <Route exact path="/users/logout" component={UserLogout}/>
            <ProtectedRoute exact path="/users/profile" component={UserProfile}/>
            <ProtectedRoute path="/users/profile/update-priv" component={UserUpdatePrivInfo}/>
            <Route path="/users" component={NotFound}/>
          </Switch>
          <Route path="/products/:url" exact component={ProductSingle}/>
          <Route component={Products}/>
      </Container>
      <Container fluid>
        <Footer/>
      </Container>
    </animated.div>
  );
}

export default App;
