import "./brands.css";
import { useEffect, useState } from "react";

function Brands(props) {

    const [categories, setCategory] = useState(props.category);
    const [isAllMarks, setAllMarks] = useState([]);
    const currentCategory = props.category;
    function createMarksList() {
        const marks = [];
        props.marks.map((data) => {
            if (!marks.includes(data.mark)) {
                marks.push(data.mark);
            }
        })
        marks.sort();
        return setAllMarks(marks);
    }

    useEffect(() => {
        return createMarksList();
    }, [props.marks])


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

    return (
        <section className="brands">
            <div className="brands_select-container">
                <button id="popularMarks" className="brands_selector" onClick={viewMarks}>Популярные марки</button>
                <button id="allMarks" className="brands_selector" onClick={viewMarks}>Все марки</button>
            </div>
            <div className="brands_container">
                <ul className="brands_list">
                    {isAllMarks.map((elem, index) => {
                        return <li className={`brands_item brands_item__${index}`} key={`brands_${index}`}>
                            <p className="brands_element">{elem}</p>
                        </li>
                    })
                    }
                </ul>
            </div>
        </section>
    );
}

export default Brands;
