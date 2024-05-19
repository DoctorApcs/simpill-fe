import classNames from 'classnames/bind';
import style from './DrugList.module.scss';

import { Container } from 'react-bootstrap';
import ProductCard from '~/components/ProductCard';
import { NavLink } from 'react-router-dom';

const fakeProduct = [
    {
        id: 1,
        name: 'Vitamin A 5000IU (Chai 80 viên)',
        price: 230000,
        description: 'Dự phòng và điều trị các triệu chứng thiếu vitamin A như bệnh khô mắt, quáng gà...',
        image: 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/500x500/P16109_1_l.webp',
    },
    {
        id: 2,
        name: 'Viên nang Vitamin A 5000IU phòng và điều trị tình trạng thiếu vitamin A (10 vỉ x 10 viên)',
        price: 200000,
        description: 'Phòng và Điều trị tình trạng thiếu vitamin A',
        image: 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/500x500/P00395_1_l.webp',
    },
    {
        id: 3,
        name: 'Viên nang Enpovid A,D phòng và điều trị tình trạng thiếu vitamin A, D (11 vỉ x 10 viên)',
        price: 470000,
        description: 'Phòng và Điều trị tình trạng thiếu vitamin A, D',
        image: 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/1000x1000/P02838_1_l.webp',
    },
    {
        id: 4,
        name: 'Viên nang Vitamin AD OPC phòng và điều trị tình trạng thiếu vitamin A, D (4 vỉ x10 viên)',
        price: 240000,
        description: 'Phòng và Điều trị tình trạng thiếu vitamin A, D',
        image: 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/1000x1000/P04560_1_l.webp',
    },
    {
        id: 5,
        name: 'Biovagen Welkids Multivitamin ADKE bổ sung vitamin A, D3, K2, E cho trẻ (Chai 10ml)',
        price: 385000,
        description:
            'Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh. Đọc kỹ tờ hướng dẫn sử dụng trước khi dùng.',
        image: 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/1000x1000/P26082_1.jpg',
    },
];

const cx = classNames.bind(style);
function DrugList() {
    return (
        <Container className="d-flex flex-column" style={{ gap: '16px' }}>
            <div>
                <h1 style={{ fontWeight: 800 }}>Drugs Recommended For You</h1>
                <div className={cx('product-list')}>
                    {fakeProduct.map((product, index) => (
                        <NavLink
                            key={index}
                            to={`/drug/${product.name}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            <ProductCard product={product} />
                        </NavLink>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default DrugList;
