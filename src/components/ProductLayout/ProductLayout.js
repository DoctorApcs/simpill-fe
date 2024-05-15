import classNames from 'classnames/bind';
import style from './ProductLayout.module.scss';
import { Container } from 'react-bootstrap';
import Header from '~/layouts/components/Header';
import config from '~/config';

const cx = classNames.bind(style);
function ProductLayout({ children, productImg, product, isShowTitle = false }) {
    return (
        <Container className={'d-flex flex-column'} style={{ gap: '32px' }}>
            <Header showBackButton={true} to={config.routes.supplements} pageNumb={2} breadCrumbName={product.name} />
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
