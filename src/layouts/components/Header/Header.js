import classNames from 'classnames/bind';
import style from './Header.module.scss';

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(style);
function Header({ showBackButton, to, pageNumb }) {
    const breadcrumb = [
        {
            name: 'Sympotom Checker',
            to: config.routes.bodymap,
        },
        {
            name: 'Supplements',
            to: config.routes.supplements,
        },
        {
            name: 'Supplement',
            to: config.routes.supplement,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
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
                <div className={cx('breadcrumb')}>
                    {breadcrumb.slice(0, pageNumb + 1).map((item, index) => (
                        <NavLink key={index} to={item.to} className={cx('breadcrumb-item')}>
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Header;
