import classNames from 'classnames/bind';
import style from './ProductCard.module.scss';

import { Card } from 'react-bootstrap';

const cx = classNames.bind(style);
function ProductCard({ product, onClick }) {
    const shorter = (string, size) => (string.length > size ? string.slice(0, size) + '...' : string);
    const parseStringPrice = (price) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (
        <Card bsPrefix={cx('container')} onClick={() => onClick(product)} style={{ cursor: "pointer" }}>
            <Card.Img variant="top" src={product.image} style={{ borderRadius: '16px', padding: '18px', backgroundColor: '#fff'}} />
            <Card.Body bsPrefix={cx('info')}>
                <Card.Title style={{ fontWeight: 600, fontSize: '16px' }}>{shorter(product.name, 32)}</Card.Title>
                {product.price ? (
                    <Card.Text style={{ fontWeight: 800}}>{parseStringPrice(product.price)} đ</Card.Text>
                ) : (
                    <Card.Text style={{ fontWeight: 800, fontSize: '12px'}}>Need advice from pharmacist</Card.Text>
                )}
                {product.specification && (
                    <div className={cx('unit')}>{product.specification}</div>
                )}
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
