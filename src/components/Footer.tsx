import React from 'react';
import '../style/Footer.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    return(
        <footer className="main-footer">
            <div className="container flex">
                <p>Made by Thang</p>
                <a href="https://github.com/ducthang-vu/quizApp"><FontAwesomeIcon icon={["fab", "github"]}/></a>
            </div>
        </footer>
    )
}

export default Footer