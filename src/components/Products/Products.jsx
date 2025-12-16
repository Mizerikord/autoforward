import "./products.css";
import { useState, useEffect } from "react";
import arrow from "../../media/down-arrow.png";
import searchElements from "../../utils/search";


function Products(props) {
    const exports = props.export;
    let currentExports = exports.slice(0, 6);
    const [isCount, setCount] = useState(0);
    const [isItemsCount, setItemsCount] = useState(6);
    const [isNum, setNum] = useState(3);
    const [isCards, setCards] = useState();

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
        const currentCount = isCount + 1;
        const addeditems = exports.slice(isCount * isNum + 5, isCount * isNum + 5 + isNum);
        addeditems.map((card) => {
            renderCards(card);
            currentExports.pop(card);
        });
        return setCount(currentCount)
    }

    function renderCards(card) {
        const box = document.querySelector(".products_card-list");
        const li = document.createElement("li");
        li.classList.add("products_card-item");
        const img = document.createElement("img");
        img.classList.add("products_card-img");
        img.src = `https://imgs.softrazborki.net/g/ft6ohfmh/${card.imageUrl}.jpg`
        const h3 = document.createElement("h3");
        h3.classList.add("products_card-title");
        h3.textContent = card.name;
        const ul = document.createElement("ul");
        ul.classList.add("products_card-description-list");
        const liIn = document.createElement("lu");
        liIn.classList.add("products_card-description-item");
        const p = document.createElement("p");
        p.classList.add("products_card-description-element");
        const p_1 = document.createElement("p");
        p_1.classList.add("products_card-description-element");
        const p_price = document.createElement("p");
        p_price.classList.add("products_card-description-element__price");
        p_price.textContent = card.price;
        liIn.appendChild(p);
        liIn.appendChild(p_1);
        liIn.appendChild(p_price);
        ul.appendChild(liIn);
        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(ul);
        return box.appendChild(li);
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
        return props.onSearch();
    }

    function clearCardList() {
        const box = document.querySelector(".products_card-list");
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
    }

    useEffect(() => {
        if (props.isSearch) {
            setCards(props.isSearch);
            clearCardList();
            props.isSearch.forEach((elem => {
                renderCards(elem);
            }))

        }
    }, [props.isSearch, exports])

    return (
        <div className="products">
            <div className="products_container">
                <input type="search" id="products" name="products" className="products_search" />
                <button className="products_btn" onClick={search}>Найти</button>
            </div>
            <div className="products_info-container">
                <p className="products_count">Запчасти в наличии на {props.mark}:<span className="products_count__number"> {exports.length}</span> </p>
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
                <ul className="products_card-list">
                    {exports && currentExports.map((elem, index) => {
                        return <li className="products_card-item" key={index}>
                            <img src={`https://imgs.softrazborki.net/g/ft6ohfmh/${elem.imageUrl}.jpg`} alt="" className="products_card-img" />
                            <h3 className="products_card-title">{elem.name}</h3>
                            <ul className="products_card-description-list">
                                <li className="products_card-description-item">
                                    <p className="products_card-description-element"></p>
                                    <p className="products_card-description-element"></p>
                                    <p className="products_card-description-element__price">{elem.price}</p>
                                </li>
                            </ul>
                        </li>
                    })}
                </ul>
                <button className={`add-products ${document.querySelectorAll(".products_card-item").length >= exports.length ? "add-products_disable" : ""}`} onClick={addItemsCount}>Добавить еще</button>
            </div>
        </div>
    );
}

export default Products;
