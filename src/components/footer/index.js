import React, {Component} from 'react';

import './index.scss';

class Footer extends Component {
    render() {
        return (
           <footer className="footer__component-container -container">
                <div className="footer__site-branding -site-text-size">
                    <div className="footer__copyright-info">
                        © This site belongs to it's owner
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
