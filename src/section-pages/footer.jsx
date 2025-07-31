
import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const currentYear = new Date().getFullYear();
    return(
        <footer>
            <div className="container">
                <div className="row gx-5">
                    <div className="col-lg-4">
                        <img src="./img/logo.png" alt="" />
                        <div className="spacer-20"></div>
                        <p>Lorem ipsum culpa tempor tempor eu laboris adipisicing sunt excepteur enim laborum officia eiusmod laborum sint do aliqua incididunt est aute deserunt in elit non sed ut velit ullamco aliquip. Nulla cupidatat elit amet sed labore ut et consequat nostrud laboris aliqua ex est fugiat quis aliqua duis quis esse dolor laboris non duis sunt.</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-6 col-sm-6">
                                <div className="widget">
                                    <h5>{i18n.language === 'es' ? 'Legal' : 'Legal'}</h5>
                                    <ul>
                                        <li><Link to={i18n.language === 'es' ? "/terms?lang=es" : "/terms"}>{i18n.language === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}</Link></li>
                                        <li><Link to={i18n.language === 'es' ? "/privacy?lang=es" : "/privacy"}>{i18n.language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <div className="widget">
                                    <h5>{i18n.language === 'es' ? 'Páginas' : 'Pages'}</h5>
                                    <ul>
                                        <li><Link to="/">{i18n.language === 'es' ? 'Servidor de Juegos' : 'Game Server'}</Link></li>
                                        <li><Link to="/">{i18n.language === 'es' ? 'Base de conocimiento' : 'Knowledgebase'}</Link></li>
                                        <li><Link to="/">{i18n.language === 'es' ? 'Acerca de' : 'About Us'}</Link></li>
                                        <li><Link to="/">{i18n.language === 'es' ? 'Afiliados' : 'Affiliates'}</Link></li>
                                        <li><Link to="/">{i18n.language === 'es' ? 'Ubicaciones' : 'Locations'}</Link></li>
                                        <li><Link to="/">{i18n.language === 'es' ? 'Noticias' : 'News'}</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="widget">
                            <h5>Newsletter</h5>
                            <form action="blank.php" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                            <div className="col text-center">
                                <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder={i18n.language === 'es' ? 'ingresa tu correo' : 'enter your email'} type="text" /> <Link to="/" id="btn-subscribe"><i className="arrow_right bg-color-secondary"></i></Link>
                                <div className="clearfix"></div>
                            </div>
                            </form>
                            <div className="spacer-10"></div>
                            <small>{i18n.language === 'es' ? 'Tu correo está seguro con nosotros. No enviamos spam.' : "Your email is safe with us. We don't spam."}</small>
                            <div className="spacer-30"></div>
                            <div className="widget">
                                <h5>{i18n.language === 'es' ? 'Síguenos en' : 'Follow Us on'}</h5>
                                <div className="social-icons">
                                    <Link to="/"><i className="fa-brands fa-facebook-f"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-twitter"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-discord"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-tiktok"></i></Link>
                                    <Link to="/"><i className="fa-brands fa-youtube"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-sm-6">
                           Copyright {currentYear} - Playhost by Designesia
                        </div>
                        <div className="col-lg-6 col-sm-6 text-lg-end text-sm-start">
                            <ul className="menu-simple">
                                <li><Link to={i18n.language === 'es' ? "/terms?lang=es" : "/terms"}>{i18n.language === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}</Link></li>
                                <li><Link to={i18n.language === 'es' ? "/privacy?lang=es" : "/privacy"}>{i18n.language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;