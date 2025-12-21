import "./products.css";
import { useState, useEffect } from "react";
import arrow from "../../media/down-arrow.png";
import ProductsCard from "./ProductsCard/ProductsCard";


function Products(props) {

    const [isCount, setCount] = useState(0);
    const [isItemsCount, setItemsCount] = useState(6);
    const [isNum, setNum] = useState(3);
    const [isCards, setCards] = useState([]);
    const [isCard, setIsCard] = useState([]);

    function handleResize() {
        if (window.innerWidth > 1425) {
            return setNum(3);
        } else if (window.innerWidth > 670) {
            return setNum(2);
        } else if (window.innerWidth <= 670) {
            return setNum(1);
        }
    }

    function addItemsCount() {
        console.log(isCount, isNum);
        const currentCount = isCount + 1;
        let cards = isCard;
        const addeditems = isCards.slice(isCount * isNum + 6, isCount * isNum + 6 + isNum);
        addeditems.map((card) => {
            cards.push(card);
        });
        setIsCard(cards);
        setItemsCount(isItemsCount + isNum);
        if (cards.length >= isCards.length) {
            if (!document.querySelector(".add-products").classList.contains("add-products_disable")) {
                document.querySelector(".add-products").classList.add("add-products_disable");
            }
        }
        return setCount(currentCount)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, []);

    function openCategory(e) {
        if (e.target.classList.contains("products_category-text")) {
            return;
        }
        if (document.querySelector(".products_category-arrow").style.rotate === "-90deg") {
            document.querySelector(".products_category-arrow").style.rotate = "0deg"
        } else {
            document.querySelector(".products_category-arrow").style.rotate = "-90deg";
        }
        return document.querySelector(".products_category-list").classList.toggle("products_category-list__hide");
    };

    function changeCategory(e) {
        document.querySelector(".products_category__default").textContent = e.target.textContent;
        if (document.querySelector(".products_category-arrow").style.rotate === "-90deg") {
            document.querySelector(".products_category-arrow").style.rotate = "0deg"
        } else {
            document.querySelector(".products_category-arrow").style.rotate = "-90deg";
        }
        return document.querySelector(".products_category-list").classList.add("products_category-list__hide");
    };

    function search() {
        setItemsCount(6);
        setNum(3);
        const inputData = document.querySelector(".products_search").value;
        return props.onSearch(props.mark, props.model, props.generation, inputData);
    }

    useEffect(() => {
        if (props.isSearch) {
            setCount(0);
            setNum(3);
            if (props.isSearch.length > 6) {
                if (document.querySelector(".add-products").classList.contains("add-products_disable")) {
                    document.querySelector(".add-products").classList.remove("add-products_disable");
                }
            }
            let currentExports = props.isSearch.slice(0, 6);
            setIsCard(currentExports);
            return setCards(props.isSearch);
        }
    }, [props.isSearch])

    

    return (props.isSearch &&
        <div className="products">
            <div className="products_container">
                <input type="search" id="products" name="products" className="products_search" />
                <button className="products_btn" onClick={search}>Найти</button>
            </div>
            <div className="products_info-container">
                <p className="products_count">Запчасти в наличии на {props.mark}:<span className="products_count__number"> {props.isSearch.length}</span> </p>
                <div className="products_category" onClick={openCategory}>
                    <p className="products_category__default">Новое поступление</p>
                    <img src={arrow} alt="" className="products_category-arrow" />
                    <ul className="products_category-list products_category-list__hide">
                        <li className="products_category-item" >
                            <p className="products_category-text" onClick={changeCategory}>Новое поступление</p>
                        </li>
                        <li className="products_category-item" >
                            <p className="products_category-text" onClick={changeCategory}>Остаток</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="products_cards-container">
                <ul id="cards-list" className="products_card-list">
                    {isCard.length > 0 && isCard.map((card, index) => {
                        return <ProductsCard card={card} key={index} onAddToCart={props.onAddToCart}/>
                    })
                    }
                </ul>
                <button className={`add-products ${document.querySelectorAll(".products_card-item").length >= isCards.length ? "add-products_disable" : ""}`} onClick={addItemsCount}>Добавить еще</button>
            </div>
        </div>
    );
}

export default Products;
