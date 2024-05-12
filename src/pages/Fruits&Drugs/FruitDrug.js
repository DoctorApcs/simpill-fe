import classNames from 'classnames/bind';
import style from './FruitDrug.module.scss';

import { Card, Table } from 'react-bootstrap';
import ProductLayout from '~/components/ProductLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const fakeProduct = {
    name: 'Vitamin A 5000IU (Chai 80 viên)',
    price: '34.500 ₫',
    unit: 'Chai',
    favourite: '1.1k',
    sell: 'Đã bán 6.7k',
    category: 'Vitamin & Khoáng chất',
    active_ingredient: 'Vitamin A 5000 IU',
    indication: 'Dự phòng và điều trị các triệu chứng thiếu vitamin A như bệnh khô mắt, quáng gà...',
    dosage_form: 'viên nang cứng',
    country: 'Việt Nam',
    manufacturer: 'Nadyphar',
    specifications: 'Chai 80 viên',
    detail: 'Thành phần Vitamin A 5000 IU Tá dược: Bột talc, tinh bột sắn vừa đủ 1 viên nang Chỉ định (Thuốc dùng cho bệnh gì?) - Dự phòng và điều trị các triệu chứng thiếu vitamin A như bệnh khô mắt, quáng gà. - Bổ sung cho người bệnh xơ gan nguyên phát do mật hay gan ứ mật mạn tính, thường hay thiếu hụt vitamin A. Liều dùng Điều trị và phòng ngừa thiếu vitamin A có thể uống liều cao cách quãng như sau: - Phòng ngừa thiếu vitamin A - Đề phòng bệnh khô mắt gây mù lòa do thiếu vitamin A - Trẻ em từ 1 tuổi và người lớn: Cứ 3- 6 tháng một lần uống liều 200.000 IU - Trẻ em dưới 1 tuổi: Dùng liều bằng ½ liều trên - Điều trị thiếu vitamin A - Điều trị bệnh khô mắt - Trẻ em từ 1 tuổi và người lớn: Uống 200.000 IU ngay sau khi chẩn đoán, lặp lại liều vào ngày hôm sau và thêm một liều sau hai tuần - Trẻ em dưới 1 tuổi: Dùng liều bằng ½ liều trên - Đối với bệnh xơ gan nguyên phát do mật hay bệnh gan mạn tính có ứ mật: Thường cho người bệnh uống thêm vitamin A vì những người này thường bị thiếu hụt vitamin A - Người lớn: Cứ 3- 6 tháng một lần uống liều 200.000 IU Bảo quản: Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp Đóng gói: Chai 80 viên Thương hiệu: Nadyphar Nơi sản xuất: Công ty cổ phần dược phẩm 2/9 - Nadyphar (Việt Nam) Mọi thông tin trên đây chỉ mang tính chất tham khảo. Việc sử dụng thuốc phải tuân theo hướng dẫn của bác sĩ, dược sĩ. Vui lòng đọc kĩ thông tin chi tiết ở tờ rơi bên trong hộp sản phẩm.',
    image: 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/500x500/P16109_1_l.webp',
};

const cx = classNames.bind(style);
function FruitDrug() {
    const [isExpanded, setIsExpanded] = useState(false);
    // Add the keys to the selectedKeys array

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    const selectedKeys = [
        { key: 'unit', title: 'Unit' },
        { key: 'category', title: 'Category' },
        { key: 'active_ingredient', title: 'Active Ingredient' },
        { key: 'indication', title: 'Indication' },
        { key: 'dosage_form', title: 'Dosage Form' },
        { key: 'country', title: 'Country' },
        { key: 'manufacturer', title: 'Manufacturer' },
        { key: 'specifications', title: 'Specifications' },
    ];
    return (
        <ProductLayout productImg={fakeProduct.image} product={fakeProduct}>
            <div className={cx('detail')}>
                <Card.Title style={{ fontSize: '18px', fontWeight: 800 }}>{fakeProduct.name}</Card.Title>
                <Card.Text style={{ color: '#14b8a6', fontSize: '36px', fontWeight: 400, marginBottom: 0 }}>
                    {fakeProduct.price}
                </Card.Text>
                <div className={cx('detail-info')}>
                    <label>
                        <FontAwesomeIcon icon={faHeart} /> {fakeProduct.favourite}
                    </label>
                    <label style={{ padding: ' 0 8px' }}>|</label>
                    <label>{fakeProduct.sell}</label>
                </div>
            </div>
            <Table borderless={true} responsive={true}>
                <tbody>
                    {selectedKeys.map((field, index) => (
                        <tr key={index}>
                            <td style={{ color: '#000', fontWeight: 600, paddingRight: '16px' }}>{field.title}</td>
                            {field.key === 'unit' ? (
                                <td>
                                    <label className={cx('product-unit')}>{fakeProduct[field.key]}</label>
                                </td>
                            ) : (
                                <td>{fakeProduct[field.key]}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Card.Title style={{ fontSize: '18px', fontWeight: 800 }}>Detail</Card.Title>
                <Card.Text>
                    {isExpanded ? fakeProduct.detail : `${fakeProduct.detail.substring(0, 300)}...`}{' '}
                    <button onClick={toggleExpanded} className={cx('show-more-button')}>
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                </Card.Text>
            </div>
        </ProductLayout>
    );
}

export default FruitDrug;
