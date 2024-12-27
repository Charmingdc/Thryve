import "./Footer.css";
const Footer = () => {
    return (
        <footer className="footer-section">
            <div>
                <strong>Thryve Inc, {new Date(Date.now()).getFullYear()}</strong>
            </div>
        </footer>
    )
}
export default Footer;
