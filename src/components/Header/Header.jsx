import "./header.css";
import { Link } from "react-router-dom";
import cart from "../../media/cart.svg";

function Header() {
    return <section className="header">
        <div className="header_logo-container">
            <span className="header_location">Москва</span>
            <span className="header_logo"></span>
        </div>
        <div className="header_navbar-container">
            <div className="header_navbar-contacts">
                <div className="header_navbar-phones">
                    <div className="header_navbar-phone-container">
                        <p className="header_navbar-phone">+7 (916) 160-61-30</p>
                        <p className="header_navbar-phone__correct">Audi</p>
                    </div>
                    <div className="header_navbar-phone-container">
                        <p className="header_navbar-phone">+7 (929) 665 30 10</p>
                        <p className="header_navbar-phone__correct">Ford</p>
                    </div>
                    <Link className="header_navbar-link">Контакты</Link>
                </div>
                <div className="header_navbar-pays">
                    <Link className="header_navbar-pay">Доставка</Link>
                    <Link className="header_navbar-pay">Возврат</Link>
                    <Link className="header_navbar-pay">Оплата</Link>
                </div>
            </div>
            <div className="header_navbar-search-container">
                <button type="button" value="" id="catalog" className="header_navbar-catalog-btn">
                    <svg viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="header-menu">
                        <path d="M0.5 0H19.5V2H0.5V0Z" fill="white" />
                        <path d="M0.5 5H19.5V7H0.5V5Z" fill="white" />
                        <path d="M0.5 10H19.5V12H0.5V10Z" fill="white" />
                    </svg>Каталог</button>
                <p className="header_navbar-search-container">

                    <input type="search" name="search" id="search" className="header_navbar-search" 
                    placeholder="Марка, запчасть, артикул или VIN"
                    // placeholder="Поиск"
                     />
                    <span className="header_navbar-search-img"></span>
                </p>
                <input type="button" value="Найти" className="header_navbar-button" />
                <div className="header_navbar-cart-container">
                    <span className="header_navbar-cart-number">2</span>
                    <img src={cart} alt="" className="header_navbar-cart" />
                    <p className="header_navbar-cart-description">Корзина</p>
                </div>
                <p className="header_navbar-cost">100000&nbsp;₽</p>
            </div>
        </div>
    </section>;
}

export default Header;
