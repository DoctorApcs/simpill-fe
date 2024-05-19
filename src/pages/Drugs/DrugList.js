import classNames from 'classnames/bind';
import style from './DrugList.module.scss';

import { Button, Collapse, Container } from 'react-bootstrap';
import ProductCard from '~/components/ProductCard';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as drugsService from '~/services/drugsService';

const cx = classNames.bind(style);
function DrugList({supplement}) {
    const [drugList, setDrugList]=useState([])
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            const drugs= await drugsService.drugs(supplement, 20);
            setDrugList(drugs)
        }
        fetchApi()
    }, [supplement]);
    return (
        <Container className="d-flex flex-column" style={{ gap: '16px' }}>
            <div>
                <h1 style={{ fontWeight: 800 }}>Drugs Recommended For You</h1>
                <div className={cx('product-list')}>
                    {drugList.slice(0, 6).map((product, index) => (
                        <NavLink
                            key={index}
                            to={product.url}
                            className={cx('product-item')}
                        >
                            <ProductCard product={product} />
                        </NavLink>
                    ))}
                <Collapse in={isExpanded}>
                    <div className={cx('product-list')}>
                    {drugList.slice(6, 14).map((product, index) => (
                        <NavLink
                            key={index}
                            to={product.url}
                            className={cx('product-item')}
                        >
                            <ProductCard product={product} />
                        </NavLink>
                    ))}
                    </div>
                </Collapse>
                </div>
            </div>
                <Button onClick={() => setIsExpanded(!isExpanded)} bsPrefix={cx('load-more')}>
                    {isExpanded ? 'Show less' : 'Show more'}
                </Button>
        </Container>
    );
}

export default DrugList;
