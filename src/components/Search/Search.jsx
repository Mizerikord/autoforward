import "./search.css";
import Brands from "../Brands/Brands";
import { useState } from "react";

function Search(props) {

    const searchAuto = props.search;
    const [category, setCategory] = useState("");

    function handleSearch(e) {
    }

    function handleSubmit(){
        const inputValue = document.querySelector("#search-elements").value;
        return props.onSearchCarsData(props.mark, props.model, props.generation, inputValue);
    }

    return (
        <section className="search">
            <h2 className="search-title">Поиск запчастей по марке автомобиля</h2>
            <div className="search_search-container">
                <div className="search_search-text-container">
                    <input id="search-elements" type="text" className="search_search-text" placeholder="Марка, запчасть, артикул или VIN" />
                    <span className="search_search-text-img"></span>
                </div>
                <button className="search_search-button" onClick={handleSubmit}>Найти</button>
            </div>
            <div className="search_cards-container">
                <ul className="search_cards">
                    {searchAuto.map((elem, index) => {
                        return <li className="search_card" key={index} onClick={handleSearch}>
                            <img src={elem.img} alt="" className="search_card-img" />
                            <p className="search_card-text">{elem.type}</p>
                        </li>
                    })}
                </ul>
            </div>
            <Brands category={category} searchAuto={props.category} marks={props.export}/>
        </section>
    );
}

export default Search;
