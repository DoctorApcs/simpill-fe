import classNames from 'classnames/bind';
import style from './Supplements.module.scss';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Image, ProgressBar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getBodyArea } from '../BodyMap/getBodyParts';
import images from '~/assets/images';

// Fake api data vitamins
const fakeAPIVitamins = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Vitamin ${i + 1}`,
}));
const cx = classNames.bind(style);
function Supplements() {
    // Get active symptoms from redux store
    const activeSymptoms = useSelector((state) => state.activeSymptoms);

    // Get body area based on active symptoms
    const bodyArea = useMemo(() => {
        return getBodyArea().find((area) => activeSymptoms.area === area.id);
    }, [activeSymptoms.area]);

    return (
        <Container className={cx('container')}>
            <NavLink to={'/bodymap'}>
                <Button
                    style={{
                        padding: '12px 18px',
                        borderRadius: '14px',
                        fontSize: '18px',
                        backgroundColor: '#f1f5f9',
                        color: '#000',
                        borderColor: '#f1f5f9',
                    }}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
            </NavLink>
            <div>
                <h1 style={{ fontWeight: 800, fontSize: '28px' }}>Supplements: What You Really Need</h1>
                <p>Here are the conditions that match your selected symptoms</p>
            </div>
            <div className={cx('active-symptoms')}>
                <div className={cx('symptom-logo')}>
                    <Image src={images.symptom} alt="symptom" />
                </div>
                <div style={{ paddingLeft: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', lineHeight: '30px' }}>
                        {activeSymptoms.active?.length} Active symptoms
                    </h3>
                    <h5 style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{bodyArea?.name}</h5>
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
                        <NavLink to={`/supplements/${vitamin.name}`} key={index}>
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
                                    <ProgressBar now={60} style={{ width: '100%' }} />
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

export default Supplements;
