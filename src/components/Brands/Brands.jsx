import "./brands.css";
import { useEffect, useState } from "react";

function Brands(props) {

    const [categories, setCategory] = useState(props.category);
    const currentCategory = props.category;

    const searchAuto = props.searchAuto;


    function viewMarks(e) {
        // ????????????????
        if (e.target.id === "popularMarks") {
            setCategory(currentCategory);
            e.target.style.background = "#666666";
            document.querySelector("#allMarks").style.background = "linear-gradient(90deg, #de556f, #48204e)";
        }
        if (e.target.id === "allMarks") {
            setCategory(Object.keys(props.searchAuto[0].autos));
            e.target.style.background = "#666666";
            document.querySelector("#popularMarks").style.background = "linear-gradient(90deg, #de556f, #48204e)";
        }
    }

    function renderMarks(categories) {
        const elemForRemove = document.querySelectorAll(".brands_item");
        elemForRemove.forEach(elem => elem.remove());
        const parenElement = document.querySelector(".brands_list");
        categories.forEach((elem, index) => {
            const element = document.createElement("li");
            element.classList.add("brands_item");
            element.key = index;
            const elementText = document.createElement("p");
            elementText.classList.add("brands_element");
            elementText.textContent = elem;
            element.appendChild(elementText);
            return parenElement.appendChild(element);
        })
    }

    useEffect(() => {
        if (categories.length > 0) {
            return renderMarks(categories);
        }
        if (currentCategory.length > 0 ) {
            return renderMarks(currentCategory);
        }
        return;
    }, [categories, currentCategory])

    return (
        <section className="brands">
            <div className="brands_select-container">
                <button id="popularMarks" className="brands_selector" onClick={viewMarks}>Популярные марки</button>
                <button id="allMarks" className="brands_selector" onClick={viewMarks}>Все марки</button>
            </div>
            <div className="brands_container">
                <ul className="brands_list">
                </ul>
            </div>
        </section>
    );
}

export default Brands;
