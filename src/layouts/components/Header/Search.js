import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

const cx = classNames.bind(style);
function Search({ showSearchBox, setShowSearchBox }) {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const handleClose = () => {
        setShowSearchBox(false);
    };
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };
    const handleFocusInput = () => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    }
    return (
        <Offcanvas
            placement="top"
            show={showSearchBox}
            onHide={handleClose}
            style={{ height: '50vh' }}
            onEnter={handleFocusInput}
        >
            <div className={cx('wrapper')}>
                <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Search Supplements</h1>
                <div className={cx('search-container')}>
                    <div className={cx('search-box')}>
                        <FontAwesomeIcon
                            style={{ color: '#14b8a6', paddingLeft: '16px', fontSize: '2rem' }}
                            icon={faSearch}
                        />
                        <input
                            type="text"
                            ref={inputRef}
                            className={cx('search-input')}
                            placeholder="Search for supplements"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {!!searchValue && (
                            <span className={cx('close-icon')} onClick={handleClear}>
                                <FontAwesomeIcon style={{ color: '#475569' }} icon={faClose} />
                            </span>
                        )}
                    </div>
                    <Button
                        onClick={() => setShowSearchBox(false)}
                        style={{
                            color: '#14b8a6',
                            fontSize: '16px',
                            fontWeight: 800,
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Offcanvas>
    );
}

export default Search;
