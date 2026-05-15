import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SearchType from "../utils/search-type";
import PopularCategory from "../utils/popular-category";
import SearchAuto from "../utils/search-auto";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Search from "./Search/Search";
import Popular from "./Popular/Popular";
import Article from "./Article/Article";
import Footer from "./Footer/Footer";
import Contacts from "./Contacts/Contacts";
import Menu from "./Menu/Menu";
import PopupCart from "./PopupCart/PopupCart";
import Api from "../utils/Api";
import sitiesList from "../utils/sitiesList";
import JSONData from "../utils/export-data";

function App() {
  const categoryList = SearchType;
  const searchAuto = SearchAuto;
  const popular = PopularCategory;

  const [isLoading, setLoading] = useState(false);
  const [isProducts, setProducts] = useState(false);
  const [isExportData, setExportData] = useState();
  const [isSearch, setSearch] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCategory, setCategory] = useState([]);
  const [isMark, setMark] = useState([]);
  const [checkedModels, setCheckedModels] = useState([]);
  const [checkedGenerations, setCheckedGenerations] = useState([]);
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isCart, setCart] = useState([]);
  const [isCardCount, setCartCount] = useState(0);
  const [isCurrentCity, setCurretCity] = useState("");

  useEffect(() => {
    // Api.getData()
    //   .then((data) => {
    //     const currentData = dataParse(data);
    //     console.log(currentData);
        
    //     createCategoryList(currentData);
    //     setExportData(currentData);
    //     setLoading(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
      // });
    const currentData = dataParse(JSONData);
    createCategoryList(currentData);
    setExportData(currentData);
    setLoading(true);
  }, []);

function dataParse(baseData) {
    const regex = /"/g;
    const newData = [];
    const firstStr = Object.keys(baseData[0])[0].split('";"');
    // newData.push(firstStr);
    baseData.forEach((elem) => {
      const objElementData = {};
      let valueSplit = Object.values(elem)[0].split(";");
      for (let i = 0; i < firstStr.length; i++) {
        objElementData[firstStr[i].replace(regex, "")] = valueSplit[i].replace(
          regex,
          "",
        );
      }
      newData.push(objElementData);
    });
    return newData;
  }

  function handleCheckUserData(data) {
    Api.postEmail(data, isCart)
      .then((res) => {
        alert(
          `успешный заказ ${isCart.length} позиций товара, с вами свяжется менеджер по телефону ${data.phone}`,
        );
        console.log(data, isCart);
      })
      .catch((err) => {
        alert(`Что-то пошло не так, попробуйте позднее`);
        console.log(err);
      });
  }

  function showProducts() {
    return setProducts(true);
  }

  function createCategoryList(data) {
    const category = [];
    data.map((cat) => {
      if (cat.category !== "") {
        if (!category.includes(cat.category)) {
          return category.push(cat.category);
        }
        return "";
      } else {
        return "";
      }
    });
    return setCategories(category);
  }

  function searchCarsData(mark, model, generation, inputValue, category) {
    //поиск по марке
    function findMark(checkData, mark) {
      if (mark.length !== 0 && checkData.length !== 0) {
        const searchArrays = [];
        checkData.forEach((data) => {
          data["Марка"].toUpperCase().indexOf(mark[0].toUpperCase()) >= 0 &&
            searchArrays.push(data);
        });
        searchArrays.sort();
        return searchArrays;
      } else {
        return checkData;
      }
    }
    //поиск по модели
    function findModel(currentArr, model) {
      if (model.length !== 0 && currentArr.length !== 0) {
        const searchArrays = [];
        currentArr.forEach((element) => {
          model.forEach((mod) => {
            if (mod.indexOf(element["Модель"]) >= 0) {
              return searchArrays.push(element);
            }
          });
        });
        searchArrays.sort();
        return searchArrays;
      } else {
        return currentArr;
      }
    }
    //поиск по поколению
    function findGeneration(currentArr, generation) {
      if (generation.length !== 0 && currentArr.length !== 0) {
        const searchArrays = [];
        currentArr.forEach((element) => {
          generation.forEach((gen) => {
            if (gen.indexOf(element["Год"]) >= 0) {
              return searchArrays.push(element);
            }
          });
        });
        searchArrays.sort();
        return searchArrays;
      } else {
        return currentArr;
      }
    }
    //поиск по строке поиска
    function searchValue(inputValue, searchArray) {
      if (inputValue && inputValue.length !== 0) {
        const currentData = [];
        const searchData =
          searchArray.length === 0 ? isExportData : searchArray;
        searchData.forEach((elem) => {
          Object.values(elem).find((value) => {
            if (value === "") {
              return "";
            } else {
              if (value.toUpperCase().indexOf(inputValue.toUpperCase()) >= 0) {
                return currentData.push(elem);
              }
              return "";
            }
          });
        });
        return currentData;
      } else {
        return searchArray;
      }
    }
    //поиск по доп. парамерам
    function findCategory(currentArr, category) {
      if (category !== undefined && currentArr.length !== 0) {
        if (category.length !== 0) {
          const searchArrays = [];
          currentArr.forEach((element) => {
            category.forEach((cat) => {
              if (cat.indexOf(element.category) >= 0) {
                return searchArrays.push(element);
              }
            });
          });
          searchArrays.sort();
          return searchArrays;
        } else {
          return currentArr;
        }
      } else {
        return currentArr;
      }
    }
    //пошаговый поиск
    let resultData = findCategory(isExportData, category);
    resultData = searchValue(inputValue, resultData);
    resultData = findMark(resultData, mark);
    resultData = findModel(resultData, model);
    resultData = findGeneration(resultData, generation);
    setSearch(resultData);
    return resultData;
  }

  //Изменение данных в стэйте хранения
  function setCarsData(element, data) {
    if (element === "mark") {
      return setMark(data);
    } else if (element === "model") {
      return setCheckedModels(data);
    } else if (element === "generation") {
      return setCheckedGenerations(data);
    } else if (element === "category") {
      return setCategory(data);
    }
  }

  function openPopup() {
    if (isOpenPopup) {
      document.body.classList.remove("hideOverflow");
    } else {
      document.body.classList.add("hideOverflow");
    }
    return setOpenPopup(!isOpenPopup);
  }

  function addToCart(card) {
    if (isCart.length === 0) {
      card["Количество"] = 1;
      return setCart([...isCart, card]);
    } else {
      let artNums = [];
      isCart.forEach((elem) => {
        artNums.push(elem["Артикул"]);
      });
      if (artNums.includes(card["Артикул"])) {
        console.log(Number(isCart[isCart.indexOf(card)]["Количество"]));

        Number(isCart[isCart.indexOf(card)]["Количество"]++);
      } else {
        card["Количество"] = 1;
        return setCart([...isCart, card]);
      }
    }
    return setCartCount(isCardCount + 1);
  }

  function setCustomersCity(city) {
    return setCurretCity(city);
  }

  return (
    isLoading && (
      <div className="App">
        <Header
          onSearchCarsData={searchCarsData}
          mark={isMark}
          model={checkedModels}
          generation={checkedGenerations}
          onOpen={openPopup}
          isCurrentCart={isCart}
          isCardCount={isCardCount}
          isSities={sitiesList}
          onCity={setCustomersCity}
        />
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/menu" element={<Menu isCategory={categories} />} />
          <Route
            path="autoforward/"
            element={
              <>
                <Main
                  onCarsData={setCarsData}
                  isCategory={categories}
                  currentCategory={isCategory}
                  onShow={showProducts}
                  export={isExportData}
                  onSearchCarsData={searchCarsData}
                  isSearch={isSearch}
                  onAddToCart={addToCart}
                />
                {!isProducts && (
                  <Search
                    export={isExportData}
                    search={categoryList}
                    category={searchAuto}
                    mark={isMark}
                    model={checkedModels}
                    generation={checkedGenerations}
                    onSearchCarsData={searchCarsData}
                  />
                )}
                {!isProducts && <Popular popular={popular} />}
                <Article />
                <Footer />
                {isOpenPopup && (
                  <PopupCart
                    onOpen={openPopup}
                    isCartItems={isCart}
                    onCheckedUserData={handleCheckUserData}
                    isCardCount={isCardCount}
                    isCity={isCurrentCity}
                    is
                    isCurCart={isCart}
                  />
                )}
              </>
            }
          />
        </Routes>
      </div>
    )
  );
}

export default App;
