import classNames from 'classnames/bind';
import style from './ProductLayout.module.scss';
import { Container } from 'react-bootstrap';

const cx = classNames.bind(style);
function ProductLayout({ children, productImg, product, isShowTitle = false }) {
    return (
        <Container className={'d-flex flex-column'} style={{ gap: '32px' }}>
            <div className={cx('thumbnail')}>
                <img className={cx('thumbnail-img')} src={productImg} alt="product.name" />
                {isShowTitle && (
                    <>
                        <div className={cx('shadow')}></div>
                        <h1 className={cx('title')}>{product.name}</h1>
                    </>
                )}
            </div>
            {children}
        </Container>
    );
}

export default ProductLayout;
