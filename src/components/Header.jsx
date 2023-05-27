import { useState } from "react";
import logo from '../assets/Calculator-logo.svg'

function Header() {
    return(
        <header className="header-section">
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo-pic" />
                <h1 className="logo-text">Loan Calculator</h1>
            </div>
            <h3 className="pageTitle">
                EMI Calculator
            </h3>
        </header>
    )
}

export default Header;