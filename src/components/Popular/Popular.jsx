import "./popular.css";

function Popular(props) {

    const popularAuto = props.popular;

    return (
        <section className="popular">
            <h2 className="popular-title">Популярные категории</h2>
            <div className="popular_cards-container">
                <ul className="popular_cards">
                    {popularAuto.map((elem, index) => {
                        return <li className="popular_card" key={index}>
                            <img src={elem.img} alt="" className="popular_card-img" />
                            <p className="popular_card-text">{elem.category}</p>
                        </li>
                    })}
                </ul>
            </div>
        </section>
    );
}

export default Popular;
