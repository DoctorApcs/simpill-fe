import classNames from 'classnames/bind';
import style from './Home.module.scss';
import { Button, Container, Image, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(style);
function Home() {
    return (
        <Container bsPrefix="d-flex flex-column align-items-center row-gap-5">
            <div className={cx('logo')}>
                <Image src={images.logo} />
                <Card.Text bsPrefix={cx('slogan')}>An apple a day keep the doctor away!</Card.Text>
            </div>
            <Card.Body>
                <Card.Text bsPrefix={cx('title')}>Welcome to Simpill</Card.Text>
            </Card.Body>
            <NavLink bsPrefix={cx('intro-link')} to="/bodymap">
                <Button bsPrefix={cx('intro-button')}>Get Started</Button>
            </NavLink>
        </Container>
    );
}

export default Home;
