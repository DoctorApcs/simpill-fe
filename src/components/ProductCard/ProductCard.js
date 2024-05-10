import classNames from 'classnames/bind';
import style from './ProductCard.module.scss';

import { Card } from 'react-bootstrap';

const cx = classNames.bind(style);
function ProductCard({ product }) {
    const shorter = (string, size) => (string.length > size ? string.slice(0, size) + '...' : string);
    const parseStringPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (
        <Card bsPrefix={cx('container')}>
            <Card.Img variant="top" src={product.image} style={{ borderRadius: '8px', border: '#14b8a6 2px solid' }} />
            <Card.Body bsPrefix={cx('info')}>
                <Card.Title style={{ fontWeight: 600, fontSize: '14px' }}>{shorter(product.name, 32)}</Card.Title>
                <Card.Text style={{ color: 'rgb(71, 85, 105)', fontSize: '12px', marginBottom: 0 }}>
                    {shorter(product.description, 20)}
                </Card.Text>
                <Card.Text style={{ fontWeight: 800 }}>{parseStringPrice(product.price)} đ</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
