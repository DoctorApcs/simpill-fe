import classNames from 'classnames/bind';
import style from './Header.module.scss';

import { faAngleLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase as Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import config from '~/config';
import { useEffect, useState } from 'react';
import Search from './Search';

const cx = classNames.bind(style);
const breadcrumb = [
    {
        name: 'Symptoms Checker',
        to: config.routes.bodymap,
    },
    {
        name: 'Supplements',
        to: config.routes.supplements,
    }
];
function Header({ showBackButton, pageNumb, breadCrumbName = '' }) {
    const [isScroll, setIsScroll] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        });
    }, []);

    return (
        <header className={cx('wrapper', `${isScroll ? 'white-header' : ''}`)}>
            <div className={cx('container')}>
                {showBackButton && (
                    <Button
                        bsPrefix={cx('back-button')}
                        style={{
                            padding: '12px 18px',
                            borderRadius: '14px',
                            fontSize: '18px',
                            backgroundColor: '#f1f5f9',
                            color: '#000',
                            borderColor: '#f1f5f9',
                        }}
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                )}
                <div className={cx('breadcrumb')}>
                    {breadCrumbName ? (
                        <div  className={cx('breadcrumb-item')}>
                            {breadCrumbName}
                        </div>
                    ) : (
                        breadcrumb.slice(0, pageNumb + 1).map((item, index) => (
                            <NavLink key={index} to={item.to} className={cx('breadcrumb-item')}>
                                {item.name}
                            </NavLink>
                        ))
                    )}
                </div>
                <Button
                    style={{
                        padding: '12px 18px',
                        borderRadius: '14px',
                        fontSize: '18px',
                        backgroundColor: '#f1f5f9',
                        color: '#000',
                        borderColor: '#f1f5f9',
                    }}
                    onClick={() => setShowSearchBox(true)}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
                <Search showSearchBox={showSearchBox} setShowSearchBox={setShowSearchBox} />
            </div>
        </header>
    );
}

export default Header;
