import React from 'react';
import '../style/Footer.scss'
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer() {
    return(
        <footer className="main-footer">
            <div className="container flex">
                <p>Made by Thang</p>
                <a href="https://github.com/ducthang-vu/quizApp"><GitHubIcon/></a>
            </div>
        </footer>
    )
}

export default Footer
