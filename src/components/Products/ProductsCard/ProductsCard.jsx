import "./productscard.css";

function ProductsCard(props) {
    const card = props.card;

    function addToCart (){
        return props.onAddToCart(card);
    }

    return (
        <li className="products_card-item">
            <img src={`https://imgs.softrazborki.net/g/ft6ohfmh/${card.imageUrl}.jpg`} alt="деталь" className="products_card-img" />
            <h3 className="products_card-title">{card.name}</h3>
            <ul className="products_card-description-list">
                <li className="products_card-description-item">
                    <div className="products_card-description-container">
                        <p className="products_card-description-element">Артикул:</p>
                        <p className="products_card-description-element">{card.articul ? card.articul : "Данных нет"}</p>
                    </div>
                    <div className="products_card-description-container">
                        <p className="products_card-description-element">VIN:</p>
                        <p className="products_card-description-element">{card.VIN ? card.VIN : "Данных нет"}</p>

                    </div>
                    <div className="products_card-description-container">
                        <p className="products_card-description-element">Год:</p>
                        <p className="products_card-description-element">{card.year}</p>
                    </div>
                    <div className="products_card-description-container">
                        <p className="products_card-description-element"></p>
                        <p className="products_card-description-element"></p>
                    </div>
                    <p className="products_card-description-element__price">{card.price} ₽</p>
                </li>
            </ul>
            {!props.noBtn && <button className="propucts_add-to-cart-btn" onClick={addToCart}>В корзину</button>}
        </li>
    );
}

export default ProductsCard;
