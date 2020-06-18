import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Container } from 'reactstrap'
import { Route, Redirect, Switch } from 'react-router-dom'
import AddRestaurant from '../views/AdminPanel/AddRestaurant'
import AddMenu from '../views/AdminPanel/AddMenu'
import MenuList from '../views/AdminPanel/MenuList'
import Orders from '../views/AdminPanel/Orders'
import CustomNavbar from '../components/Navbars/CustomNavbar'
import RestaurantList from '../views/AdminPanel/RestaurantList'
import PrivateBaseComponent from '../components/Base/PrivateBaseComponent'
import AddCarouselContent from '../views/AdminPanel/AddCarouselContent'
import CarouselContentList from '../views/AdminPanel/CarouselContentList'

export default class AdminPanelLayout extends PrivateBaseComponent {

    componentDidMount() {
        if (this.getCurrentUser() == null ||this.getCurrentUser().type != 1) {
            this.open("/")
        }
    }

    render() {
        return (
            <div>
                <section className="section section-shaped section-nav section-sm">
                    <div className="shape shape-style-1 bg-gradient-purpele">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                </section>
                <CustomNavbar />
                <Sidebar />
                <Container className="pt-lg-6">
                    <Switch>
                        <Route path="/adminpanel/restaurantlist" exact component={RestaurantList} />
                        <Route path="/adminpanel/addrestaurant" exact component={AddRestaurant} />
                        <Route path="/adminpanel/menulist" exact component={MenuList} />
                        <Route path="/adminpanel/addmenu" exact component={AddMenu} />
                        <Route path="/adminpanel/orders" exact component={Orders} />
                        <Route path="/adminpanel/addcarousel" exact component={AddCarouselContent} />
                        <Route path="/adminpanel/carousellist" exact component={CarouselContentList} />
                        <Redirect to="/adminpanel/restaurantlist" />
                    </Switch>
                </Container>
            </div>
        )
    }
}
