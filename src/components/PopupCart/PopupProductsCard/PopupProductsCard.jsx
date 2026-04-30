import "./popupproductscard.css";
import { useState } from 'react';

function PopupProductsCard(props) {
    const card = props.card;

    const [isHover, setIsHover] = useState(false);

    function addToCart (){
        return props.onAddToCart(card);
    }

    const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

    return (
        <li className="popup_card-item">
            {/* Сделать слайдер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            {card["Фото"] ? <img src={`${card["Фото"].split(", ")[0]}`} alt="деталь" className="popup_card-img" /> : <img src={`https://samokatbook.ru/upload/iblock/f45/94ymvzywa1z1ktbbvrh3qutgxu8c2bxg.jpg`} alt="деталь" className="popup_card-img" />}
            <h3 className="popup_card-title">{card.name}</h3>
            <ul className="popup_card-description-list">
                <li className="popup_card-description-item">
                    <div className="popup_card-description-container">
                        <p className="popup_card-description-element">Наименование:</p>
                        <p className="popup_card-description-element" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{!isHover ? card["Наименование"].length > 15 ? card["Наименование"].slice(0, 15 - 1) + '…' : card["Наименование"] : card["Наименование"]}</p>
                    </div>
                    <div className="popup_card-description-container">
                        <p className="popup_card-description-element">Артикул:</p>
                        <p className="popup_card-description-element">{card["Артикул"] ? card["Артикул"] : "Данных нет"}</p>
                    </div>
                    <div className="popup_card-description-container">
                        <p className="popup_card-description-element">Год:</p>
                        <p className="popup_card-description-element">{card["Год"]}</p>
                    </div>
                    {card["Комментарий"] && <div className="popup_card-description-container">
                        <p className="popup_card-description-element">Комментарий:</p>
                        <p className="popup_card-description-element" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{!isHover ? card["Комментарий"].length > 15 ? card["Комментарий"].slice(0, 15 - 1) + '…' : card["Комментарий"] : card["Комментарий"]}</p>
                    </div>}
                    <div className="popup_card-description-container">
                        <p className="popup_card-description-element">Количество:</p>
                        <p className="popup_card-description-element">{card["Количество"]}</p>
                    </div>
                    <p className="popup_card-description-element__price">{card["Цена"]} ₽</p>
                </li>
            </ul>
            {!props.noBtn && <button className="propucts_add-to-cart-btn" onClick={addToCart}>В корзину</button>}
        </li>
    );
}

export default PopupProductsCard;
