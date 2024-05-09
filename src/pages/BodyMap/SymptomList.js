import classNames from 'classnames/bind';
import style from './SymptomList.module.scss';

import { forwardRef, useRef, useState } from 'react';
import { Button, Offcanvas, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// generate 10 fake symptoms
const fakeAPISymtomList = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Symptom ${i + 1}`,
}));

const cx = classNames.bind(style);
const SymptomList = forwardRef(({ area, show, handleClose, className }, ref) => {
    const [activeSymptoms, setActiveSymptoms] = useState({ area: area.id, active: [] });
    const dispatch = useDispatch();
    const buttonGroupRef = useRef(null);

    // Handle active symptoms and scroll to the last active symptom
    const handleActiveSymptoms = (activeSymptomIds) => {
        const activeSymtomsArea = { area: area.id, active: activeSymptomIds };
        dispatch({ type: 'SET_ACTIVE_SYMPTOMS', payload: activeSymtomsArea });
        setActiveSymptoms(activeSymtomsArea);
        const lastActiveSymptom = activeSymptomIds[activeSymptomIds.length - 1];
        buttonGroupRef.current.children[(lastActiveSymptom - 1) * 2 + 1]?.scrollIntoView({
            behavior: 'auto',
            block: 'center',
        });
    };

    return (
        <Offcanvas id={cx('container', className)} placement="bottom" show={show} onHide={handleClose} ref={ref}>
            <Offcanvas.Header style={{ padding: '20px 20px 0' }} closeButton>
                <Offcanvas.Title style={{ fontSize: '20px', fontWeight: 800 }}>{area.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ overflow: 'scroll', maxHeight: '36vh' }}>
                <ToggleButtonGroup
                    type="checkbox"
                    value={activeSymptoms.active}
                    onChange={handleActiveSymptoms}
                    bsPrefix={cx('symptom-list')}
                    ref={buttonGroupRef}
                >
                    {fakeAPISymtomList.map((symptom, index) => (
                        <ToggleButton
                            key={index}
                            style={{
                                backgroundColor: activeSymptoms.active.includes(symptom.id) ? '#14b8a6' : '#f1f5f9',
                                color: activeSymptoms.active.includes(symptom.id) ? '#fff' : '#000',
                                fontWeight: 600,
                                fontSize: '16px',
                                boxShadow: activeSymptoms.active.includes(symptom.id) && '0px 0px 0px 4px #14b8a640',
                                borderRadius: '14px',
                                padding: '14px',
                            }}
                            id={'symptom-'.concat(symptom.id)}
                            value={symptom.id}
                        >
                            {symptom.name}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Offcanvas.Body>
            <NavLink
                to="/loading"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 20px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#1e293b',
                }}
            >
                <Button
                    style={{
                        margin: '8px',
                        padding: '16px 28px',
                        borderColor: '#1e293b',
                        fontWeight: 700,
                        fontSize: '16px',
                        backgroundColor: '#1e293b',
                    }}
                >
                    Apply
                    <FontAwesomeIcon style={{ paddingLeft: '10px' }} icon={faCheck} />
                </Button>
            </NavLink>
        </Offcanvas>
    );
});

export default SymptomList;
