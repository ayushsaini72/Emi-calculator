import { useState } from "react";
import currencies from "./countries.json"
import getSymbolFromCurrency from 'currency-symbol-map'


function Main() {
    const [loanAmount, setLoanAmount] = useState(1000000)
    const [loanTerm, setLoanTerm] = useState(120)
    const [interestRate, setInterestRate] = useState(7.2)
    const [emi, setEmi] = useState(11714.29)
    const [totalAmount, setTotalAmount] = useState(0)
    const [principalAmount, setPrincipalAmount] = useState(0)
    const [currency, setCurrency] = useState("₹")

    const handleLoanAmountChange = event => {
        setLoanAmount(event.target.value)
    };

    const handleLoanTermChange = event => {
        setLoanTerm(event.target.value)
    };

    const handleInterestRateChange = event => {
        setInterestRate(event.target.value)
    };

    const handleCurrency = event => {
        setCurrency(event.target.value)
    };

    const calculateEmi = event => {
        event.preventDefault();
        let P = loanAmount
        let N = loanTerm
        let R = (interestRate) / 12 / 100
        let s = Math.pow(1 + R, N);
        let S = s.toFixed(2)

        let emiAmount = (P * R * S) / (S - 1)
        let roundedEmiAmount = emiAmount.toFixed(2)

        setEmi(roundedEmiAmount)
        setTotalAmount((roundedEmiAmount * loanTerm).toFixed(2))
        setPrincipalAmount(loanAmount)
    }

    const allCurrencies = currencies.map(data => {
        console.log(data)
        return(
            <option value={getSymbolFromCurrency(data.currency.code) || "₹"}>{data.name} ({data.currency.name}) - {getSymbolFromCurrency(data.currency.code)}</option>
        )
    })

    console.log(currency)

    return(
        <section className="main-section">
            <form onSubmit={calculateEmi} className="loan">
                <select className="currency-dropdown input" value={currency} onChange={handleCurrency}>
                    <option value="₹">Choose your Country's Currency</option>
                    {allCurrencies}
                </select>
                <label htmlFor="loanAmount">Loan Amount</label>
                <input type="number" name="loanAmount" className="input" value={loanAmount} onChange={handleLoanAmountChange}/>
                <label htmlFor="loanTerm">Loan Term (In Months)</label>
                <input type="number" name="loanTerm" className="input" min={1} max={500} value={loanTerm} onChange={handleLoanTermChange} />
                <label htmlFor="interestRate">Interest Rate</label>
                <input type="number" name="interestRate" className="input" min={1} max={100} step=".01" value={interestRate} onChange={handleInterestRateChange} />
                <input type="submit" value="Calculate"  className="submit-btn"/>
            </form>
            <div className="loan-results">
                <h1 className="emi-amount">Monthly Payment (EMI): - <span className="emi-value">{currency} {emi}</span></h1>
                <h2 className="total-payable-amount">Total Amount Payable: - <span>{currency} {totalAmount}</span></h2>
                <h2 className="intrest-amount">Intrest Amount Payable: - <span>{currency} {(totalAmount - principalAmount).toFixed(2)}</span></h2>
                <h2 className="principal-amount">Principal Amount: - <span>{currency} {principalAmount}</span></h2>
            </div>
        </section>
    )
}

export default Main;