import classNames from 'classnames/bind';
import style from './SupplementList.module.scss';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import images from '~/assets/images';
import config from '~/config';
import Header from '~/layouts/components/Header';

// Fake api data vitamins
const fakeAPIVitamins = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Vitamin ${i + 1}`,
}));
const cx = classNames.bind(style);
function SupplementList() {
    // Get active symptoms from redux store
    const activeSymptoms = useSelector((state) => state.activeSymptoms);

    return (
        <Container className={cx('container')}>
            <Header showBackButton={true} to={config.routes.bodymap} pageNumb={1} />
            <div>
                <h1 style={{ fontWeight: 800, fontSize: '28px' }}>Recommended Supplements</h1>
                <p className={cx('instruction')}>
                    Here are the recommended vitamins and supplements to use for your symptoms
                </p>
            </div>
            <div className={cx('active-symptoms')}>
                <div className={cx('symptom-logo')}>
                    <Image src={images.symptom} alt="symptom" />
                </div>
                <div style={{ paddingLeft: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', lineHeight: '30px' }}>
                        {activeSymptoms.active?.length} Active symptoms
                    </h3>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <div className={cx('vitamin-list')}>
                    <div>
                        <h5 style={{ fontWeight: 800, fontSize: '16px' }}>All Results</h5>
                    </div>
                    {fakeAPIVitamins.map((vitamin, index) => (
                        <NavLink to={`${config.routes.supplement}${vitamin.name}`} key={index}>
                            <Button
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100px',
                                    padding: '0 24px',
                                    backgroundColor: '#f1f5f9',
                                    borderColor: '#f1f5f9',
                                    borderRadius: '24px',
                                    color: '#000',
                                    fontSize: '18px',
                                    fontWeight: 800,
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    {vitamin.name}
                                </div>
                                <FontAwesomeIcon icon={faAngleRight} style={{ float: 'right' }} />
                            </Button>
                        </NavLink>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default SupplementList;
