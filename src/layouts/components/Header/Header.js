import classNames from 'classnames/bind';
import style from './Header.module.scss';

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(style);
function Header({ showBackButton, to, title, desc }) {
    return (
        <header className={cx('wrapper')}>
            {showBackButton && (
                <NavLink to={to} className={cx('back-button')}>
                    <Button
                        style={{
                            padding: '12px 18px',
                            borderRadius: '14px',
                            fontSize: '18px',
                            backgroundColor: '#f1f5f9',
                            color: '#000',
                            borderColor: '#f1f5f9',
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                </NavLink>
            )}
            <div style={showBackButton ? {} : { alignItems: 'center', padding: '0 18px' }} className={cx('title')}>
                <h1 style={{ fontSize: '24px', fontWeight: 800 }}>{title ? title : ''}</h1>
                <p style={{ textAlign: 'center' }}>{desc}</p>
            </div>
        </header>
    );
}

export default Header;
