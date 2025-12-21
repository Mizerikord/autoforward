import "./popupcart.css";
import closePopup from "../../media/closeImg.svg";
import ProductsCard from "../Products/ProductsCard/ProductsCard";
import { useState, useEffect } from "react";

function PopupCart(props) {

    const [isCost, setCost] = useState("0");

    function togglePopup() {
        props.onOpen();
    }

    useEffect(() => {
        function sumPrice(cart) {
            let sum = 0;
            cart.map((card) => {
                return sum = Number(card.price) + sum;
            })
            return sum;
        }
        const totalCost = Number(isCost) + sumPrice(props.isCartItems);
        return setCost(totalCost);
    }, [props.isCartItems])

    return (
        <div className="popup-cart">
            <div className="popup-cart-container">
                <img className="popup-cart_close" src={closePopup} alt="" onClick={togglePopup} />
                <h2 className="popup-cart_title">Корзина</h2>
                <ul className="popup-cart_list">
                    {props.isCartItems && props.isCartItems.map((card, index) => {
                        return <ProductsCard card={card} noBtn={true} key={index} />
                    })}
                </ul>
                <div className="popup-cart_total-container">
                    <p className="popup-cart_total">Общая стоимость: </p>
                    <p className="popup-cart_total">{isCost}</p>
                </div>
                <button className="popup-cart_btn">Оформить</button>
            </div>
        </div>
    );
}

export default PopupCart;
