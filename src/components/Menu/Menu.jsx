import "./menu.css";
import { Link } from "react-router-dom";
// import cart from "../../media/cart.svg";
// import { useEffect, useState } from "react";

function Menu(props) {

    const categories = props.isCategory;

    return <div className="menu">
        <div className="menu_content">
            <div className="menu_sections">
            <ul className="main-form_params-list menu-list">
                {categories.map((category, index) => {
                    return <li className="main-form_params-item" key={index}>
                        <p className="main-form_params-element">{category}</p>
                        <span className="main-form_arrow"></span>
                    </li>
                })}
            </ul>
            <div className="menu_category">
                <ul className="menu_category-list">
                    <li className="menu_category-item">
                        <p className="menu_category-text">Мотоциклы</p>
                    </li>
                    <li className="menu_category-item">
                        <p className="menu_category-text">Легковые автомобили</p>
                    </li>
                    <li className="menu_category-item">
                        <p className="menu_category-text">Коммерческий транспорт</p>
                    </li>
                    <li className="menu_category-item">
                        <p className="menu_category-text">Грузовики</p>
                    </li>
                    <li className="menu_category-item">
                        <p className="menu_category-text">Автобусы</p>
                    </li>
                    <li className="menu_category-item">
                        <p className="menu_category-text">Популярные категории</p>
                    </li>
                </ul>
                <ul className="menu_category-links">
                    <li className="menu_category-link">
                        <Link to="" className="menu-link" >Доставка</Link>
                    </li>
                    <li className="menu_category-link">
                        <Link to="" className="menu-link" >Возврат</Link>
                    </li>
                    <li className="menu_category-link">
                        <Link to="" className="menu-link" >Оплата</Link>
                    </li>
                    <li className="menu_category-link">
                        <Link to="" className="menu-link" >Контакты</Link>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        <div className="menu-nav-container">
            <Link to="/menu" className="menu_contacts">
                <span className="menu_contacts-img-menu" />
                <p className="menu_contacts-name">Меню</p>
            </Link>
            <Link to="/contacts" className="menu_contacts">
                <span className="menu_contacts-img-phone" />
                <p className="menu_contacts-name">Контакты</p>
            </Link>
        </div>
    </div>;
}

export default Menu;
