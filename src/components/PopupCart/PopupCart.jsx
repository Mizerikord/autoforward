import "./popupcart.css";
import closePopup from "../../media/closeImg.svg";
import PopupProductsCard from "./PopupProductsCard/PopupProductsCard";
// import EmailSend from "../EmailSend/EmailSend";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function PopupCart(props) {

    const [isCost, setCost] = useState("0");
    const [isCart, setCart] = useState([]);
    const [isChecked, setIsChecked] = useState(false);


    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        mode: "onSubmit"
    });

    function handleFormSubmit(data) {
        const userData = {
            email: data.email,
            phone: data.phone,
            city: data.city,
            inn: data.inn
        };
        return props.onCheckedUserData(userData);
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        handleFormSubmit(data);
    }

    function togglePopup() {
        return props.onOpen();
    }

    function checkPolicy(e){
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        function sumPrice(cart) {
            let sum = 0;
            cart.map((card) => {
                return sum = Number(card["Цена"]) * Number(card["Количество"]) + sum;
            })
            return sum;
        }
        const totalCost = sumPrice(props.isCartItems);
        return setCost(totalCost);
    }, [props.isCartItems, props.isCardCount]);

    useEffect(() => {
        return setCart(props.isCurCart);
    }, [props.isCurCart])

    return (
        <div className="popup-cart">
            <div className="popup-cart-box">
                <h2 className="popup-cart_title">Корзина</h2>
                <div className="popup-data">
                    <form action="#" className="popup_form" onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" name="email" id="email" className="popup_form-input popup_form-email" placeholder="Адрес электронной почты"
                            {...register("email", {
                                required: "Это поле обязательно к заполнению",
                                pattern: {
                                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-z]{2,4}$/,
                                    message: "Некорректно введен адрес электронной почты"
                                }
                            })}
                        />
                        <div className='elem-error-container'>{errors?.email && <span className="elem-error">{errors?.email?.message || "Error!"}</span>}</div>
                        <input type="tel" name="phone" id="phone" className="popup_form-input popup_form-phone" placeholder="Телефон"
                            {...register("phone", {
                                required: "Это поле обязательно к заполнению",
                                pattern: {
                                    value: /^\+?[1-9][0-9]{9,10}$/,
                                    message: "Некорректно введен номер"
                                }
                            })}
                        />
                        <div className='elem-error-container'>{errors?.phone && <span className="elem-error">{errors?.phone?.message || "Error!"}</span>}</div>
                        <input type="text" name="city" id="city" className="popup_form-input popup_form-city" placeholder="Город" defaultValue={props.isCity}
                            {...register("city", {
                                required: "Это поле обязательно к заполнению",
                                message: "Это поле обязательно",
                            })} />
                        <div className='elem-error-container'>{errors?.city && <span className="elem-error">{errors?.city?.message || "Error!"}</span>}</div>
                        <input type="text" name="inn" id="inn" className="popup_form-input popup_form-city" placeholder="ИНН(необязательно)"
                            {...register("inn")}
                        />
                        <div className="popup-policy">
                            <input type="checkbox" name="check" id="" className="polycy-check" onChange={checkPolicy}/>
                            <Link href="" className="polycy-link" target="_blank">Согласие на обработку данных</Link>
                        </div>
                        <button type="submit" className={`popup-cart_btn ${isValid && isChecked && isCart.length > 0 ? "popup-form-submit" : "popup-btn-disabled"}`} disabled={!isValid && isChecked && isCart.length > 0}>Оформить</button>
                    </form>
                    <div className="popup-cart-container">
                        <img className="popup-cart_close" src={closePopup} alt="" onClick={togglePopup} />
                        <ul className="popup-cart_list">
                            {props.isCartItems && props.isCartItems.map((card, index) => {
                                return <PopupProductsCard card={card} noBtn={true} key={index} />
                            })}
                        </ul>
                    </div>
                </div>
                <div className="popup-cart_total-container">
                    <p className="popup-cart_total">Общая стоимость: </p>
                    <p className="popup-cart_total">{isCost} ₽</p>
                </div>

            </div>
        </div>
    );
}

export default PopupCart;
