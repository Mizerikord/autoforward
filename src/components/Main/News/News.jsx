import "./news.css";

function News(props) {

    return (
         <div className="main-news">
                <div className="main-news_cards-container">
                    <div className="main-news_select-btns">
                        <div type="text" id="slide-left" className="main-news_select-btn main-news_select-btn-left main-news_select-btn__disable" onClick={props.slideNews}>
                            <img src={props.arrow} alt="" className="main-news_select-arrow main-news_select-arrow-left " />
                        </div>
                        <div type="text" id="slide-right" className="main-news_select-btn main-news_select-btn-right" onClick={props.slideNews}>
                            <img src={props.arrow} alt="" className="main-news_select-arrow main-news_select-arrow-right" />
                        </div>
                    </div>
                    <ul className="main-news_cards">
                    </ul>
                </div>
            </div>
    );
}

export default News;
