import classNames from 'classnames/bind';
import style from './DrugList.module.scss';

import { useEffect, useState } from 'react';
import { Button, Collapse, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductCard from '~/components/ProductCard';
import * as drugsService from '~/services/drugsService';

const cx = classNames.bind(style);
function DrugList({ supplement }) {
    const [drugList, setDrugList] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const drugs = await drugsService.drugs(supplement, 20);
            setDrugList(drugs);
        };
        fetchApi();
    }, [supplement]);

    const handleOnProductClick = (product) => {
        navigate('/drug/details', { state: { product } });
    }

    return (
        <Container className="d-flex flex-column" style={{ gap: '16px' }}>
            <div>
                <h1 style={{ fontWeight: 800 }}>Drugs Recommended For You</h1>
                <div className={cx('product-list')}>
                    {drugList.slice(0, 6).map((product, index) => (
                        <ProductCard product={product} onClick={handleOnProductClick} />
                        // <NavLink key={index} to={product.url} className={cx('product-item')}>
                        // </NavLink>
                    ))}
                    <Collapse in={isExpanded}>
                        <div>
                            {drugList.slice(6, 14).map((product, index) => (
                                <ProductCard product={product} onClick={handleOnProductClick} />
                                // <NavLink key={index} to={product.url} className={cx('product-item')}>
                                // </NavLink>
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
