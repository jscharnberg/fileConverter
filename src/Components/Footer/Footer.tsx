import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faGithub, faInstagram, faLinkedin);

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-icons">
                <a href="https://github.com/jscharnberg/fileConverter" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
            <div className="footer-links">
                <a href="/impressum">Impressum/Legal Notice</a>
            </div>
        </footer>
    );
}
