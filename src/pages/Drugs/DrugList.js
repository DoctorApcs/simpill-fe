import classNames from 'classnames/bind';
import style from './DrugList.module.scss';

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductCard from '~/components/ProductCard';
import * as drugsService from '~/services/drugsService';

const cx = classNames.bind(style);
function DrugList({ supplement }) {
    const [drugList, setDrugList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const drugs = await drugsService.drugs(supplement, 20);
            setDrugList(drugs);
        } 
        if(supplement) {
            fetchApi();
        };
    }, [supplement]);

    const handleOnProductClick = (product) => {
        navigate('/drug/details', { state: { product } });
    }

    return (
        <Container className="d-flex flex-column" style={{ gap: '16px' }}>
            <div>
                <h1 style={{ fontWeight: 800 }}>Drugs Recommended For You</h1>
                <div className={cx('product-list')}>
                    {drugList.map((product, index) => (
                        <div key={index}>
                            <ProductCard key={index} product={product} onClick={handleOnProductClick} />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default DrugList;
