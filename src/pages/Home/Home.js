import classNames from 'classnames/bind';
import style from './Home.module.scss';
import { Button, Image, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';

const cx = classNames.bind(style);
function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('logo')}>
                <Image src={images.logo} />
                <p className={cx('slogan')}>A guide to relieve your symptoms with vitamins and supplements</p>
            </div>
            <Card.Body>
                <p className={cx('title')}>Welcome to Simpill</p>
            </Card.Body>
            <NavLink bsPrefix={cx('intro-link')} to={config.routes.bodymap}>
                <Button bsPrefix={cx('intro-button')}>Get Started</Button>
            </NavLink>
        </div>
    );
}

export default Home;
