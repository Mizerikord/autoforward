import "./contacts.css";
// import { Link } from "react-router-dom";
// import cart from "../../media/cart.svg";
// import { useEffect, useState } from "react";
import telegram from "../../media/telegram.png"
import watsapp from "../../media/whatsapp.png"

function Contacts() {

    return <div className="contacts">
        <div className="header_contacts">
            <ul className="header_mark-contacts-list">
                <li className="header_mark-contacts-item">
                    <h2 className="header_mark-contacts-title">Volkswagen, Skoda, Audi</h2>
                    <ul className="header_contacts-phone-list">
                        <li className="header_contacts-phone-item">
                            <p className="header_contacts-phone">8 (926) 794-90-10</p>
                            <div className="header_contacts-links"><img src={telegram} alt="telegram" className="header_contacts-link-img" /><img src={watsapp} alt="watsapp" className="header_contacts-link-img" /></div>
                        </li>
                        <li className="header_contacts-phone-item">
                            <p className="header_contacts-phone">8 (916) 160-61-31</p>
                            <div className="header_contacts-links"><img src={telegram} alt="telegram" className="header_contacts-link-img" /><img src={watsapp} alt="watsapp" className="header_contacts-link-img" /></div>
                        </li>
                        <li className="header_contacts-phone-item">
                            <p className="header_contacts-phone">8 (926) 873-51-79</p>
                            <div className="header_contacts-links"><img src={telegram} alt="telegram" className="header_contacts-link-img" /><img src={watsapp} alt="watsapp" className="header_contacts-link-img" /></div>
                        </li>
                    </ul>
                </li>
                <li className="header_mark-contacts-item">
                    <h2 className="header_mark-contacts-title">Ford</h2>
                    <ul className="header_contacts-phone-list">
                        <li className="header_contacts-phone-item">
                            <p className="header_contacts-phone">8 (929) 665-30-10</p>
                            <div className="header_contacts-links"><img src={telegram} alt="telegram" className="header_contacts-link-img" /><img src={watsapp} alt="watsapp" className="header_contacts-link-img" /></div>
                        </li>
                        <li className="header_contacts-phone-item">
                            <p className="header_contacts-phone">8 (925) 032-63-82</p>
                            <div className="header_contacts-links"><img src={telegram} alt="telegram" className="header_contacts-link-img" /><img src={watsapp} alt="watsapp" className="header_contacts-link-img" /></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>;
}

export default Contacts;
