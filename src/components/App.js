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
import Api from "../utils/Api";
import JSONData from "../utils/export-data";

function App() {
  const categoryList = SearchType;
  const searchAuto = SearchAuto;
  const popular = PopularCategory;

  const [isLoading, setLoading] = useState(false);
  const [isProducts, setProducts] = useState(false);
  const [isExportData, setExportData] = useState();
  const [isSearch, setSearch] = useState();

  useEffect(() => {
    return getApiData();
  }, []);

  function getApiData() {
    Api.getData()
      .then((data) => {
        // setExportData(data);
        setExportData(JSONData);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showProducts(selectedItem) {
    setProducts(true);
  }

  function search() {
    const searchElement = document.querySelector("#products");
    if (searchElement.value) {
      const searchArrays = [];
      isExportData.map((elem) => {
        Object.values(elem).find((value) => {
          console.log(value.indexOf(searchElement.value));
          if (value === "") {
            return;
          } else {
            if (
              value.toUpperCase().indexOf(searchElement.value.toUpperCase()) >=
              0
            ) {
              return searchArrays.push(elem);
            }
            return;
          }
        });
      });
      setSearch(searchArrays);
      console.log(searchArrays);
    }
    return;
  }

  return (
    isLoading && (
      <div className="App">
        <Header />
        <Main onShow={showProducts} export={isExportData} onSearch={search} isSearch={isSearch}/>
        {!isProducts && <Search search={categoryList} category={searchAuto} />}
        {!isProducts && <Popular popular={popular} />}
        <Article />
        <Footer />
      </div>
    )
  );
}

export default App;
