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
  const [isMark, setMark] = useState([]);
  const [checkedModels, setCheckedModels] = useState([]);
  const [checkedGenerations, setCheckedGenerations] = useState([]);
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isCart, setCart] = useState([]);

  useEffect(() => {
    return getApiData();
  }, []);

  function getApiData() {
    setExportData(JSONData);
    setLoading(true);
    createCategoryList(JSONData);
    // Api.getData()
    //   .then((data) => {
    //     createCategoryList(data);
    //     setExportData(data);
    //     setLoading(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  function showProducts() {
    setProducts(true);
  }

  function createCategoryList(data) {
    const category = [];
    data.map((cat) => {
      if (cat.category !== "") {
        if (!category.includes(cat.category)) {
          return category.push(cat.category);
        }
      } else {
        return "";
      }
    });
    return setCategories(category);
  }

  function searchCarsData(mark, model, generation, inputValue) {
    function findMark(checkData, mark) {
      const searchArrays = [];
      isExportData.map((data) => {
        if (checkData.length === 0) {
          if (data.mark.toUpperCase().indexOf(mark[0].toUpperCase()) >= 0) {
            return searchArrays.push(data);
          }
        } else {
          if (
            data.mark.toUpperCase().indexOf(checkData[0].toUpperCase()) >= 0
          ) {
            return searchArrays.push(data);
          }
        }
      });
      searchArrays.sort();
      return searchArrays;
    }
    function findModel(marks, model) {
      const searchArrays = [];
      marks.map((element) => {
        model.map((mod) => {
          if (mod.indexOf(element.model) >= 0) {
            return searchArrays.push(element);
          }
        });
      });
      searchArrays.sort();
      return searchArrays;
    }
    function findGeneration(models, generation) {
      const searchArrays = [];
      models.map((element) => {
        generation.map((gen) => {
          if (gen.indexOf(element.generation) >= 0) {
            return searchArrays.push(element);
          }
        });
      });
      searchArrays.sort();
      return searchArrays;
    }

    function searchValue(inputValue, searchArray) {
      if (inputValue) {
        const currentData = [];
        const searchData =
          searchArray.length === 0 ? isExportData : searchArray;
        searchData.map((elem) => {
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
      }
      return;
    }
    if (mark.length === 0) {
      if (inputValue !== "") {
        const resultArr = searchValue(inputValue, isExportData);
        setSearch(resultArr);
        return resultArr;
      } else {
        return isExportData;
      }
    } else if (mark.length !== 0 && model.length === 0) {
      if (inputValue !== "") {
        const searchArray = findMark(mark);
        const resultArr = searchValue(inputValue, searchArray);
        setSearch(resultArr);
        return resultArr;
      } else {
        const searchArray = findMark(mark);
        setSearch(searchArray);
        return searchArray;
      }
    } else if (model.length !== 0 && generation.length === 0) {
      if (inputValue !== "") {
        const searchMarks = findMark(mark);
        const searchModels = findModel(searchMarks, model);
        const resultArr = searchValue(inputValue, searchModels);
        setSearch(resultArr);
        return resultArr;
      } else {
        const searchMarks = findMark(mark);
        const searchModels = findModel(searchMarks, model);
        setSearch(searchModels);
        return searchModels;
      }
    } else if (generation.length !== 0) {
      if (inputValue !== "") {
        const searchMarks = findMark(mark);
        const searchModels = findModel(searchMarks, model);
        const searchGeneration = findGeneration(searchModels, generation);
        setSearch(searchGeneration);
        return searchGeneration;
      }
      const searchMarks = findMark(mark);
      const searchModels = findModel(searchMarks, model);
      const searchGeneration = findGeneration(searchModels, generation);
      const resultArr = searchValue(inputValue, searchGeneration);
      setSearch(resultArr);
      return resultArr;
    }
  }

  function setCarsData(element, data) {
    if (element === "mark") {
      return setMark(data);
    } else if (element === "model") {
      return setCheckedModels(data);
    } else if (element === "generation") {
      return setCheckedGenerations(data);
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
    return setCart([...isCart, card]);
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
        />
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/menu" element={<Menu isCategory={categories} />} />

          {/* Главная страница */}
          <Route
            path="/"
            element={
              <>
                <Main
                  onCarsData={setCarsData}
                  isCategory={categories}
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
                  <PopupCart onOpen={openPopup} isCartItems={isCart} />
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
