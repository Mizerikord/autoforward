import "./App.css";
import { useState, useEffect } from "react";
import SearchType from "../utils/search-type";
import PopularCategory from "../utils/popular-category";
import SearchAuto from "../utils/search-auto";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Search from "./Search/Search";
import Popular from "./Popular/Popular";
import Article from "./Article/Article";
import Footer from "./Footer/Footer";
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

  function search(mark, model, generation, inputValue) {
    if (
      document
        .querySelector(".main-form_model")
        .classList.contains("main-form_select__disabled")
    ) {
      document
        .querySelector(".main-form_model")
        .classList.remove("main-form_select__disabled");
      document.querySelector(".main-news").classList.add("main-news-disabled");
      document.querySelector(".models").classList.remove("models-disabled");
    }
    const searchElement = inputValue;
    if (searchElement) {
      const searchArrays = [];
      const searchData =
        isSearch.length === 0
          ? isExportData
          : searchCarsData(mark, model, generation);
      searchData.map((elem) => {
        Object.values(elem).find((value) => {
          if (value === "") {
            return "";
          } else {
            if (value.toUpperCase().indexOf(searchElement.toUpperCase()) >= 0) {
              return searchArrays.push(elem);
            }
            return "";
          }
        });
      });
      return setSearch(searchArrays);
    }
    return;
  }

  function searchCarsData(mark, model, generation) {
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
    if (mark.length === 0) {
      return isExportData;
    } else if (mark.length !== 0 && model.length === 0) {
      const searchArray = findMark(mark);
      setSearch(searchArray);
      return searchArray;
    } else if (model.length !== 0 && generation.length === 0) {
      const searchMarks = findMark(mark);
      const searchModels = findModel(searchMarks, model);
      setSearch(searchModels);
      return searchModels;
    } else if (generation.length !== 0) {
      const searchMarks = findMark(mark);
      const searchModels = findModel(searchMarks, model);
      const searchGeneration = findGeneration(searchModels, generation);
      setSearch(searchGeneration);
      return searchGeneration;
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
          onSearch={search}
          mark={isMark}
          model={checkedModels}
          generation={checkedGenerations}
          onOpen={openPopup}
          isCurrentCart={isCart}
        />
        <Main
          onCarsData={setCarsData}
          onCategory={categories}
          onShow={showProducts}
          export={isExportData}
          onSearch={search}
          onSearchCarsData={searchCarsData}
          isSearch={isSearch}
          onAddToCart={addToCart}
        />
        {!isProducts && (
          <Search
            search={categoryList}
            category={searchAuto}
            onSearch={search}
            mark={isMark}
            model={checkedModels}
            generation={checkedGenerations}
          />
        )}
        {!isProducts && <Popular popular={popular} />}
        <Article />
        <Footer />
        {isOpenPopup && <PopupCart onOpen={openPopup} isCartItems={isCart} />}
      </div>
    )
  );
}

export default App;
