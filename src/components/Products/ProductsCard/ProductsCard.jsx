import "./productscard.css";

function ProductsCard(props) {
    const card = props.card;

    function addToCart (){
        return props.onAddToCart(card);
    }

    return (
        <li className="products_card-item">
            {/* Сделать слайдер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            {card["Фото"] ? <img src={`${card["Фото"].split(", ")[0]}`} alt="деталь" className="products_card-img" /> : <img src={`https://samokatbook.ru/upload/iblock/f45/94ymvzywa1z1ktbbvrh3qutgxu8c2bxg.jpg`} alt="деталь" className="products_card-img" />}
            <h3 className="products_card-title">{card.name}</h3>
            <ul className="products_card-description-list">
                <li className="products_card-description-item">
                    <div className="products_card-description-container">
                        <p className="products_card-description-element">Наименование:</p>
                        <p className="products_card-description-element">{card["Наименование"].length > 20 ? card["Наименование"].slice(0, 20 - 1) + '…' : card["Наименование"]}</p>
                    </div>
                    <div className="products_card-description-container">
                        <p className="products_card-description-element">Артикул:</p>
                        <p className="products_card-description-element">{card["Артикул"] ? card["Артикул"] : "Данных нет"}</p>
                    </div>
                    <div className="products_card-description-container">
                        <p className="products_card-description-element">Год:</p>
                        <p className="products_card-description-element">{card["Год"]}</p>
                    </div>
                    {card["Комментарий"] && <div className="products_card-description-container">
                        <p className="products_card-description-element">Комментарий:</p>
                        <p className="products_card-description-element">{card["Комментарий"].length > 23 ? card["Комментарий"].slice(0, 23 - 1) + '…' : card["Комментарий"]}</p>
                    </div>}
                    <p className="products_card-description-element__price">{card["Цена"]} ₽</p>
                </li>
            </ul>
            {!props.noBtn && <button className="propucts_add-to-cart-btn" onClick={addToCart}>В корзину</button>}
        </li>
    );
}

export default ProductsCard;
