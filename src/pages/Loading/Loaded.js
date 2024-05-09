import classNames from 'classnames/bind';
import style from './Loading.module.scss';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Image } from 'react-bootstrap';
import images from '~/assets/images';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(style);
function Loaded() {
    return (
        <div className={cx('content-loaded')}>
            <Image src={images.folder} style={{ height: '70%', width: '70%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '30px', fontWeight: 800, padding: '16px 20px' }}>Your results is ready.</h1>
                <p style={{ fontSize: '18px', padding: '0 20px', textAlign: 'center' }}>
                    Are you ready to see your symptom diagnosis result?
                </p>
            </div>
            <NavLink to="/supplements">
                <Button bsPrefix={cx('result-button')} style={{ display: 'flex', margin: '20px' }}>
                    See My Results
                    <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '10px' }} />
                </Button>
            </NavLink>
        </div>
    );
}

export default Loaded;
