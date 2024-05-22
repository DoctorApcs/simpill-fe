import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { faAngleRight, faClose, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { ButtonBase as MaterialButton } from '@mui/material';
import * as searchService from '~/services/searchService';
import { useDebounce } from '~/hooks';
import { NavLink } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(style);
function Search({ showSearchBox, setShowSearchBox }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedValue=useDebounce(searchValue, 500)
    
    const inputRef = useRef();
    const handleClose = () => {
        setSearchValue('');
        setSearchResult([]);
        setShowSearchBox(false);
    };

    const handleClear = () => {
        setSearchResult([]);
        setSearchValue('');
        inputRef.current.focus();
    };
    
    const handleFocusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    
    useEffect(() => {
        if(!debouncedValue) {
            setSearchResult([])
            return;
        }
        const fetchAPI = async () => {
            setLoading(true);
            const result = await searchService.search(searchValue);
            setSearchResult(result);
            setLoading(false);
        }
        fetchAPI();
    }, [debouncedValue]);

    return (
        <Offcanvas
            placement="top"
            show={showSearchBox}
            onHide={handleClose}
            style={{ height: '60vh' }}
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
                        {!!searchValue && !loading && (
                            <span className={cx('close-icon')} onClick={handleClear}>
                                <FontAwesomeIcon  icon={faClose} />
                            </span>
                        )} 
                        {loading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
                    </div>
                    <MaterialButton
                        onClick={handleClose}
                        style={{
                            color: '#14b8a6',
                            fontSize: '16px',
                            fontWeight: 800,
                            backgroundColor: 'transparent',
                            border: 'none',
                            height: '100%',
                            paddingInline: '6px',
                            borderRadius: '16px'
                        }}
                    >
                        Cancel
                    </MaterialButton>
                </div>
                <div className={cx('search-result')}> 
                    {searchResult.map((vitamin, index) => (
                        <NavLink onClick={handleClose} to={`${config.routes.supplement.replace(':name', vitamin.name.toLowerCase())}`} key={index}>
                            <MaterialButton
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '12px 20px',
                                    backgroundColor: '#f1f5f9',
                                    borderColor: '#f1f5f9',
                                    borderRadius: '24px',
                                    color: '#000',
                                    fontSize: '16px',
                                    fontWeight: 800,
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    {vitamin.name}
                                </div>
                                <FontAwesomeIcon icon={faAngleRight} style={{ float: 'right' }} />
                            </MaterialButton>
                        </NavLink>
                    ))}
                </div>
            </div>
        </Offcanvas>
    );
}

export default Search;
