import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {

    return (
        <section className="footer">
            <div className="footer-container">
                <div className="footer_logo">
                    <span className="footer_logo-img"></span>
                    <div className="footer_phone-container">
                        <p className="footer_phone">+7 (916) 160 61 30</p>
                        <p className="footer_phone__correct">Audi</p>
                    </div>
                    <div className="footer_phone-container">
                        <p className="footer_phone">+7 (929) 665 30 10</p>
                        <p className="footer_phone__correct">Ford</p>
                    </div>
                    <p className="footer_datetime">Пн-Вс 09:00-18:00</p>
                </div>
                <div className="footer_information">
                    <h3 className="footer_subtitle">Информация</h3>
                    <ul className="footer_info-list">
                        <li className="footer_info-item">
                            <Link to="" className="footer_info-link">О нас</Link>
                        </li>
                        <li className="footer_info-item">
                            <Link to="" className="footer_info-link">Доставка</Link>
                        </li>
                        <li className="footer_info-item">
                            <Link to="" className="footer_info-link">Возврат</Link>
                        </li>
                        <li className="footer_info-item">
                            <Link to="" className="footer_info-link">Оплата</Link>
                        </li>
                        <li className="footer_info-item">
                            <Link to="" className="footer_info-link">Контакты</Link>
                        </li>
                        <li className="footer_info-item">
                            <Link to="" className="footer_info-link">Политика конфиденциальности</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer_contacts-container">
                    <div className="footer_contacts">
                        <h3 className="footer_subtitle">Реквизиты</h3>
                        <p className="footer_addres">ИП ТОМАШЕВА ОЛЬГА ВЛАДИМИРОВНА</p>
                        <p className="footer_addres">г.Железнодорожный, ул.Юбилейная, д.2, корп.1</p>
                        <p className="footer_addres">ИНН: 502753259828</p>
                        <p className="footer_addres">ОГРНИП: 321508100116041</p>
                        <p className="footer_addres">Расчётный счёт: 40802810340000164914</p>
                        <p className="footer_addres">Наименование: ПАО Сбербанк</p>
                        <p className="footer_addres">БИК: 044525225</p>
                    </div>
                    <div className="footer_contacts">
                        <h3 className="footer_subtitle">Реквизиты</h3>
                        <p className="footer_addres">ООО «АВТО ФОРВАРД»</p>
                        <p className="footer_addres">115612, г. Москва, ул. Борисовские пруды, д. 20, корп.1
                        </p>
                        <p className="footer_addres">ОГРН:	1147746008805
                        </p>
                        <p className="footer_addres">ИНН/КПП:	7724904959/772401001
                        </p>
                        <p className="footer_addres">р/с:	40702810700000085855
                        </p>
                        <p className="footer_addres">Наименование банка:	ФИЛИАЛ "ЦЕНТРАЛЬНЫЙ" БАНКА ВТБ (ПАО)
                        </p>
                        <p className="footer_addres">Бик:	044525411
                        </p>
                        <p className="footer_addres">к/с:	30101810145250000411
                        </p>
                        <p className="footer_addres">ОКПО:	26936549
                        </p>
                        <p className="footer_addres">Бик:	044525411
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Footer;
