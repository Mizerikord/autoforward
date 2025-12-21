import "./main.css";
import news from "../../utils/news";
import arrow from "../../media/arrow.png";
import paramsImg from "../../media/add-params.png";
import { useState, useEffect } from "react";
import News from "./News/News";
import ModelList from "./ModelList/ModelList";
import Products from "../Products/Products";
import categoryElements from "../../utils/categories";

function Main(props) {
    const exports = props.export;

    const [isMark, setMark] = useState([]);
    const [isModel, setModel] = useState([]);
    const [isGeneration, setGeneration] = useState([]);
    const [isCount, setIsCount] = useState(0);
    const [allMarks, setAllMarks] = useState([]);
    const [checkedModels, setCheckedModels] = useState([]);
    const [checkedGenerations, setCheckedGenerations] = useState([]);
    const [isSearched, setSearched] = useState();

    function filterData(data) {
        const newArrData = []
        Object.values(exports).map((elem) => {
            if (!newArrData.includes(elem[data])) {
                newArrData.push(elem[data]);
            }
        })
        setAllMarks(newArrData);
    }

    //новостная лента
    const slederLength = news.length;
    function enterContent() {
        news.forEach((elem, index) => {
            const newCard = document.createElement("li");
            const newImg = document.createElement("img");
            newCard.classList.add("main-news_card");
            newImg.classList.add("main-news_screen");
            newCard.key = index;
            newImg.style.cssText = (`background-image: url(${elem}); background-size: cover; background-repeat: no-repeat; background-position: center;`)
            newCard.appendChild(newImg);
            return document.querySelector(".main-news_cards").appendChild(newCard);
        })
    }

    useEffect(() => {
        // setSearched(exports);
        filterData("mark");
        return enterContent();
    }, []);


    function handleChangeMark(e) {
        if (e.target.name === "mark") {
            document.querySelectorAll(".main-form_option").forEach(el => {
                if (el.parentNode.classList.contains("main-form_mark")) {
                    return;
                }
                setModel("Модель");
                setGeneration("Поколение");
                el.remove();
            });
            const option = [];
            exports.map((elem) => {
                if (isMark.toUpperCase === elem.mark.toUpperCase) {
                    return option.push(elem);
                }
            })

            option.forEach((elem, index) => {
                const newOption = document.createElement("option");
                newOption.classList.add("main-form_option");
                newOption.value = elem.model;
                newOption.key = index;
                newOption.textContent = elem.model;
                document.querySelector(".main-form_model").appendChild(newOption);
            }
            )
            if (isMark.length === 0) {
                props.onCarsData("mark", [e.target.value]);
                return setMark([e.target.value]);
            }
            if (isMark.includes(e.target.value)) {
                return;
            }
            if (isMark.length > 0) {
                props.onCarsData("mark", [e.target.value]);
                return setMark(e.target.value);
            }
            return
        }
        if (e.target.name === "model") {
            document.querySelectorAll(".main-form_option").forEach(el => {
                if (el.parentNode.classList.contains("main-form_mark")) {
                    return;
                }
                if (el.parentNode.classList.contains("main-form_model")) {
                    return;
                }
                setGeneration("Поколение");
                el.remove();
            });
            const option = [];
            exports.map((elem) => {
                if (isModel.toUpperCase === elem.model.toUpperCase) {
                    return option.push(elem);
                }
            })

            option.forEach((elem, index) => {
                const newOption = document.createElement("option");
                newOption.classList.add("main-form_option");
                newOption.value = elem.generation;
                newOption.key = index;
                newOption.textContent = elem.generation;
                document.querySelector(".main-form_generation").appendChild(newOption);
            }
            )
            return setModel(e.target.value);
        }
        if (e.target.name === "generation") {
            return setGeneration(e.target.value);
        }
    }

    //новостной слайдер
    function slideNews(e) {
        let arrow;
        if (e.target.classList.contains("main-news_select-arrow")) {
            arrow = e.target.parentNode;
        } else {
            arrow = e.target;
        }
        const elementStyle = document.querySelector(".main-news_cards");
        function moveSlide(index) {
            if (index < 0) {
                return;
            } else if (index >= slederLength) {
                return;
            }
            if (index > 0 && document.querySelector(".main-news_select-btn-left").classList.contains("main-news_select-btn__disable")) {
                document.querySelector(".main-news_select-btn-left").classList.remove("main-news_select-btn__disable");
            } else if (index < slederLength && document.querySelector(".main-news_select-btn-right").classList.contains("main-news_select-btn__disable")) {
                document.querySelector(".main-news_select-btn-right").classList.remove("main-news_select-btn__disable");
            }

            elementStyle.style.cssText = `transform: translate(${-index * document.querySelector(".main-news_screen").offsetWidth}px, 0); transition-duration: 1s;`;
            if (index === 0) {
                document.querySelector(".main-news_select-btn-left").classList.add("main-news_select-btn__disable");
            } else if (index === slederLength - 1) {
                document.querySelector(".main-news_select-btn-right").classList.add("main-news_select-btn__disable");
            }
            return setIsCount(index);
        }

        if (arrow.id === "slide-left") {
            moveSlide(isCount - 1);
        }
        if (arrow.id === "slide-right") {
            moveSlide(isCount + 1);
        }
        return;
    }

    function handleOpenParams(e) {
        document.querySelector(".main-form_params-container").classList.contains("main-form_params-container-disable") ? document.querySelector(".main-form_params-container").classList.remove("main-form_params-container-disable") : document.querySelector(".main-form_params-container").classList.add("main-form_params-container-disable");
        return;
    }

    //открытие вкладки поиска
    function openList(e) {
        if (e.target.id === "mark-list" && document.querySelector(".main-form_option-list__marks").classList.contains("main-form_option-list__disbled")) {
            document.querySelector(".main-form_option-list__marks").classList.remove("main-form_option-list__disbled");
        } else {
            document.querySelector(".main-form_option-list__marks").classList.add("main-form_option-list__disbled");
        }

        if (e.target.id === "model-list" && document.querySelector(".main-form_option-list__models").classList.contains("main-form_option-list__disbled")) {
            if (isMark.length === 0) {
                return;
            }
            document.querySelector(".main-form_option-list__models").classList.remove("main-form_option-list__disbled");
        } else {
            document.querySelector(".main-form_option-list__models").classList.add("main-form_option-list__disbled");
        }

        if (e.target.id === "generation-list" && document.querySelector(".main-form_option-list__generation").classList.contains("main-form_option-list__disbled")) {
            if (checkedModels.length === 0) {
                return;
            }
            document.querySelector(".main-form_option-list__generation").classList.remove("main-form_option-list__disbled");
        } else {
            document.querySelector(".main-form_option-list__generation").classList.add("main-form_option-list__disbled");
        }
    }

    // useEffect(() => {
    //     if (isMark.length > 0) {
    //         document.querySelector(".main-form_model").classList.remove("main-form_select__disabled");
    //         document.querySelector(".main-news").classList.add("main-news-disabled");
    //         document.querySelector(".models").classList.remove("models-disabled");
    //     }
    //     else {
    //         document.querySelector(".main-news").classList.remove("main-news-disabled");
    //         document.querySelector(".models").classList.add("models-disabled");
    //     }
    // }, [isModel, isGeneration, isMark])

    //формирование наполнения вкладки
    function handleCheck(e) {
        const modelList = document.querySelector(".model-list")
        let currentTarget = "";
        if (e.target.classList.contains("main-form_option-item")) {
            currentTarget = e.target.querySelector(".main-form_option__text");
        } else if (e.target.classList.contains("main-form_option__text")) {
            currentTarget = e.target;
        }
        const currentCategory = currentTarget.parentNode.parentNode.previousSibling.id;
        if (currentCategory === "mark-list") {
            if (modelList.classList.contains("model-list__category")) {
                modelList.classList.remove("model-list__category");
            }
            props.onCarsData("mark", [currentTarget.textContent]);
            setMark([currentTarget.textContent]);
            props.onCarsData("model", [])
            setCheckedModels([]);
            props.onCarsData("generation", [])
            setCheckedGenerations([]);
            document.querySelector(".main-form_option-list__marks").classList.add("main-form_option-list__disbled");
            return createModelList(currentTarget.textContent)
        } else if (currentCategory === "model-list") {
            if (modelList.classList.contains("model-list__category")) {
                modelList.classList.remove("model-list__category");
            }
            const currentmodel = currentTarget.textContent;
            let newChecked = [];
            if (checkedModels.length === 0) {
                newChecked.push(currentmodel);
            } else if (checkedModels.includes(currentmodel)) {
                //если такой есть, удаляем из списка
                checkedModels.map(model => {
                    if (model !== currentmodel) {
                        return newChecked.push(model);
                    } else {
                        return "";
                    }
                })
            } else {
                checkedModels.map(model => {
                    newChecked.push(model);
                })
                newChecked.push(currentmodel);
                newChecked.sort();
            }
            props.onCarsData("generation", [])
            setCheckedGenerations([]);
            newChecked.length === 0 ? createDataList(isModel) : createGenerationlist(newChecked);
            // props.onSearchCarsData(newChecked, "model", isMark);
            props.onCarsData("model", newChecked);
            return setCheckedModels(newChecked);
        } else if (currentCategory === "generation-list") {
            const currentGeneration = currentTarget.textContent;
            let newChecked = [];
            if (checkedGenerations.length === 0) {
                newChecked.push(currentGeneration);
            } else if (checkedGenerations.includes(currentGeneration)) {
                //если такой есть, удаляем из списка
                checkedGenerations.map(gen => {
                    if (gen !== currentGeneration) {
                        return newChecked.push(gen);
                    } else {
                        return "";
                    }
                })
            } else {
                checkedGenerations.map(gen => {
                    return newChecked.push(gen);
                })
                newChecked.push(currentGeneration);
                newChecked.sort();
            }
            createParametersList();
            props.onCarsData("generation", []);
            return setCheckedGenerations(newChecked);
        }
    }

    //очистка поля отображения
    function clearModelList() {
        const box = document.querySelector(".model-list");
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
    }

    //формирование списка моделей
    function createModelList(mark) {
        clearModelList();
        let modelList = [];
        exports.map((elem => {
            if (elem.mark === mark) {
                if (modelList.length === 0) {
                    modelList.push(elem.model);
                } else if (modelList.includes(elem.model)) {
                    return "";
                } else {
                    modelList.push(elem.model);
                }
            }
        }))
        setModel(modelList);
        return createDataList(modelList);
    }

    //формирование списка поколения авто
    function createGenerationlist(model) {
        clearModelList();
        const generationList = [];
        model.map(curModel => {
            exports.map(elem => {
                if (elem.model === curModel) {
                    if (!generationList.includes(elem.generation)) {
                        return generationList.push(elem.generation);
                    } else if (!elem.generation) {
                        return;
                    } else {
                        return;
                    }
                }
            })
        })
        setGeneration(generationList);
        return createDataList(generationList);
    }

    //формирование табло с данными на месте новостей
    function createDataList(content) {
        clearModelList();
        const contentBox = document.querySelector(".model-list");
        content.map(element => {
            if (element === "") {
                return
            } else {
                const li = document.createElement("li");
                li.classList.add("model-item");
                const p = document.createElement("p");
                p.classList.add("model-item_text");
                p.textContent = element;
                li.appendChild(p);
                return contentBox.appendChild(li);
            }
        })
    }

    //формирование табло с категориями доп параметров на месте новостей
    function createParametersList() {
        clearModelList();
        const targetBox = document.querySelector(".model-list");
        targetBox.classList.add("model-list__category");
        props.onCategory.map(elem => {
            if (elem === "") {
                return
            } else {
                const li = document.createElement("li");
                li.classList.add("main-form_params-item__category");
                const p = document.createElement("p");
                p.classList.add("model-item_text__category");
                p.textContent = elem;
                li.appendChild(p);
                return targetBox.appendChild(li);
            }

        })
    }

    //получение ширины окна для формирования сетки карточек
    useEffect(() => {
        const listWidth = document.querySelector(".models").offsetWidth;
        document.querySelector(".main-form_params-item").style.width = `${listWidth}/3`;
    }, [window.innerWidth])

    //ограничиваем количество символов для вывода в окно
    function renderLimitSymbol(data) {
        const currentText = data.join(", ");
        if (currentText.length > 27) {
            function limit(string = '', limit = 0) {
                return string.substring(0, limit);
            };
            const isText = limit(currentText, 27)
            return isText + "...";
        } else {
            return currentText;
        }
    }

    function handleSubmit() {
        if (isMark.length > 0) {
            document.querySelector(".main-form_model").classList.remove("main-form_select__disabled");
            document.querySelector(".main-news").classList.add("main-news-disabled");
            document.querySelector(".models").classList.remove("models-disabled");
        }
        else {
            document.querySelector(".main-news").classList.remove("main-news-disabled");
            document.querySelector(".models").classList.add("models-disabled");
        }
        if (document.querySelector("#products")){
            document.querySelector("#products").value = "";
        } 
        if (document.querySelector("#search")){
            document.querySelector("#search").value = "";
        }
        if (document.querySelector("#search-elements")){
            document.querySelector("#search-elements").value = "";
        }
        return props.onSearchCarsData(isMark, checkedModels, checkedGenerations);
    }

    function addViewEvent(e) {
        // ???????
        const elements = document.querySelectorAll(".main-form_select__text");
    }

    useEffect(()=>{
        return setSearched(props.isSearch);
    }, [props.isSearch])

    return <section className="main">
        <h1 className="main-title">Поиск б/у и новых автозапчастей онлайн с разбора по всей России</h1>
        <p className="main-subtitle">Выбирайте из 24 396 745 б/у запчастей по доступным ценам в одном магазине</p>
        <div className="main-container">
            <div className="main-search">
                <form action="" className="main-search-form">
                    <div className="main-form_search-container">
                        <input type="search" id="search-main" className="main-form_search" placeholder="Марка, запчасть, артикул, VIN " />
                        <span className="main-form_search-img"></span>
                    </div>
                    <p className="main-form_search-description">Поиск по авто</p>
                    <div className="main-form_select main-form_mark" onChange={handleChangeMark}>
                        <p id="mark-list" className="main-form_select__text" onClick={openList} onMouseEnter={addViewEvent}>{isMark.length > 0 ? isMark.join(", ") : "Марка"}</p>
                        <ul className="main-form_option-list main-form_option-list__marks main-form_option-list__disbled">
                            {allMarks.map((car, index) => {
                                if (car === "") {
                                    return
                                } else {
                                    return <li className="main-form_option-item" key={index} onClick={handleCheck}>
                                        <p className="main-form_option__text">{car}</p>
                                        <input name={car} className="main-form_option" type="checkbox" value={car} />

                                    </li>
                                }
                            })}
                        </ul>
                    </div>
                    <div className={`main-form_select main-form_model ${isMark.length === 0 ? "main-form_select__disabled" : ""}`} onChange={handleChangeMark}>
                        <p id="model-list" className="main-form_select__text" onClick={openList} onMouseEnter={addViewEvent}>{checkedModels.length > 0 ? renderLimitSymbol(checkedModels) : "Модель"}</p>
                        <ul className="main-form_option-list main-form_option-list__models main-form_option-list__disbled">
                            {isMark.length !== 0 &&
                                isModel.map((car, index) => {
                                    if (car === "") {
                                        return
                                    } else {
                                        return <li className="main-form_option-item" key={index} onClick={handleCheck}>
                                            <p className="main-form_option__text">{car}</p>
                                            <input className="main-form_option" type="checkbox" value={car.model} />
                                        </li>
                                    }
                                })}
                        </ul>
                    </div>
                    <div className={`main-form_select main-form_generation ${checkedModels.length === 0 ? "main-form_select__disabled" : ""}`}
                        onChange={handleChangeMark}>
                        <p id="generation-list" className="main-form_select__text" onClick={openList} onMouseEnter={addViewEvent}>{checkedGenerations.length > 0 ? renderLimitSymbol(checkedGenerations) : "Поколение"}</p>
                        <ul className="main-form_option-list main-form_option-list__generation main-form_option-list__disbled">
                            {isModel.length !== 0 &&
                                isGeneration.map((gen, index) => {
                                    if (gen === "") {
                                        return
                                    } else {
                                        return <li className="main-form_option-item main-form_option-item-generation" key={index} onClick={handleCheck}>
                                            <p className="main-form_option__text main-form_option__text-generation">{gen}</p>
                                            <input className="main-form_option" type="checkbox" value={gen.generation} />
                                        </li>
                                    }

                                })
                            }
                        </ul>
                    </div>
                    <p className="main-form_params" onClick={handleOpenParams}>Дополнительные параметры <img src={paramsImg} alt="" className="main-form_params-icon" /> </p>
                    <input type="button" value="Применить" className="main-form_submit-btn" onClick={handleSubmit} />
                    <div className="main-form_params-container main-form_params-container-disable">
                        <p className="main-form_category-text">Поиск по категориям</p>
                        <ul className="main-form_params-list">
                            {props.onCategory.map((category, index) => {
                                return <li className="main-form_params-item" key={index}>
                                    <p className="main-form_params-element">{category}</p>
                                    <span className="main-form_arrow"></span>
                                </li>
                            })}
                        </ul>
                    </div>
                </form>
            </div>
            <div className="export-data-container">
                <News slideNews={slideNews} arrow={arrow} />
                <ModelList />
                {props.isSearch.length > 0 && <Products
                    mark={isMark} model={checkedModels} generation={checkedGenerations} onSearch={props.onSearch} isSearch={isSearched} onAddToCart={props.onAddToCart}/>}
            </div>
        </div>
        <div className="main_contacts-container">
            <div className="main_contacts-menu">
                <span className="main_contacts-img-menu" />
                <p className="main_contacts-name">Меню</p>
            </div>
            <div className="main_contacts">
                <span className="main_contacts-img-phone" />
                <p className="main_contacts-name">Контакты</p>
            </div>
        </div>
    </section>;
}

export default Main;
