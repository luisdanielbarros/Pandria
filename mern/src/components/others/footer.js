import React from "react";
import { FaBehance, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer id="navigationFooter">
            <div>
                <p>Trabalho realizado em âmbito educativo.</p>
            </div>
            <div>
                <a href="https://www.behance.net/luisdanielbarros"><FaBehance/>&nbsp;/luisdanielbarros</a>
                <a href="https://www.github.com/luisdanielbarrospt"><FaGithub/>&nbsp;/luisdanielbarrospt</a>
                <a href="https://www.linkedin.com/in/luisdanielbarros"><FaLinkedin/>&nbsp;/luisdanielbarros</a>
            </div>
        </footer>
    );
}

export default Footer;