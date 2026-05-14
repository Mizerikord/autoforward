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
// import JSONData from "../utils/export-data";

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
    Api.getData()
      .then((data) => {
        createCategoryList(dataParse(data));
        setExportData(dataParse(data));
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function dataParse(baseData) {
    // Проверяем, есть ли данные для обработки
    if (!baseData || baseData.length === 0) {
        return [];
    }
    const headerLine = Object.values(baseData[0])[0];
    const headers = headerLine.split(';');
    const newData = [];
    baseData.forEach((elem) => {
        const objElementData = {};
        const dataLine = Object.values(elem)[0];
        const values = dataLine.split(';');
        headers.forEach((header, index) => {
            const cleanHeader = header.trim().replace(/"/g, '');
            // Если в строке данных есть значение для этого столбца
            if (values[index] !== undefined) {
                const cleanValue = values[index].trim().replace(/"/g, '');
                objElementData[cleanHeader] = cleanValue;
            } else {
                // Если строка короче заголовка, можно задать значение по умолчанию
                objElementData[cleanHeader] = null;
            }
        });
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

  function searchCarsData(data, mark, model, generation, inputValue, category) {
  // Создаем копию исходных данных, чтобы не мутировать оригинал
  let resultData = [...data];

  // 1. Поиск по строке (по всем полям)
  if (inputValue) {
    const searchTerm = inputValue.toUpperCase().trim();
    resultData = resultData.filter((item) => {
      // Проверяем каждое значение в объекте
      return Object.values(item).some((value) => {
        if (typeof value === 'string') {
          return value.toUpperCase().includes(searchTerm);
        }
        return false;
      });
    });
  }
  // 2. Поиск по марке
  if (mark && mark.length > 0) {
    const searchTerms = mark.map((m) => m.toUpperCase().trim());
    resultData = resultData.filter((item) => {
      const itemMark = (item["Марка"] || "").toUpperCase();
      return searchTerms.some((term) => itemMark.includes(term));
    });
  }
  // 3. Поиск по модели
  if (model && model.length > 0) {
    const searchTerms = model.map((m) => m.toUpperCase().trim());
    resultData = resultData.filter((item) => {
      const itemModel = (item["Модель"] || "").toUpperCase();
      return searchTerms.some((term) => itemModel.includes(term));
    });
  }

  // 4. Поиск по поколению/году
  if (generation && generation.length > 0) {
    const searchTerms = generation.map((g) => g.toUpperCase().trim());
    resultData = resultData.filter((item) => {
      const itemGen = (item["Год"] || "").toUpperCase();
      return searchTerms.some((term) => itemGen.includes(term));
    });
  }
  // 5. Поиск по категории
  if (category && category.length > 0) {
    const searchTerms = category.map((c) => c.toUpperCase().trim());
    resultData = resultData.filter((item) => {
      const itemCat = (item.category || "").toUpperCase();
      return searchTerms.some((term) => itemCat.includes(term));
    });
  }
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
