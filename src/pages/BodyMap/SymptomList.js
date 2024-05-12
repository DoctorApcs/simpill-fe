import classNames from 'classnames/bind';
import style from './SymptomList.module.scss';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Nav, Offcanvas, Tab, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { findSymptomListByAreaId } from '~/handler';

const cx = classNames.bind(style);
const SymptomList = forwardRef(({ area, show, handleClose, className }, ref) => {
    const [activeSymptoms, setActiveSymptoms] = useState([]);
    const [selectedKey, setSelectedKey] = useState(0);
    const dispatch = useDispatch();
    const buttonGroupRef = useRef(null);

    // Handle active symptoms and scroll to the last active symptom
    const handleActiveSymptomList = (activeSymptomIds) => {
        console.log(activeSymptomIds);

        setActiveSymptoms([...activeSymptomIds]);
        // dispatch({ type: 'SET_ACTIVE_SYMPTOMS', payload: activeSymtomsArea });
        // const lastActiveSymptom = activeSymptomIds[activeSymptomIds.length - 1];
        // buttonGroupRef.current.children[(lastActiveSymptom - 1) * 2 + 1]?.scrollIntoView({
        //     behavior: 'auto',
        //     block: 'center',
        // });
    };

    const getActiveSymptomsListId = (activeSymptomList, id) => {
        for (let i = 0; i < activeSymptomList.length; i++) {
            if (activeSymptomList[i].area === id) {
                return i;
            }
        }
        return -1;
    };

    const handleSelectedKey = (key) => {
        return setSelectedKey(Number(key));
    };
    return (
        <Offcanvas id={cx('container', className)} placement="bottom" show={show} onHide={handleClose} ref={ref}>
            <Tab.Container activeKey={selectedKey} onSelect={(k) => handleSelectedKey(k)}>
                <Offcanvas.Header style={{ padding: '20px 20px 0', display: 'flex' }}>
                    <Nav variant="tabs">
                        <Offcanvas.Title style={{ fontSize: '20px', fontWeight: 800, display: 'flex' }}>
                            {area.name.map((name, index) => (
                                <Nav.Link eventKey={index} key={index}>
                                    <Nav.Item style={index === selectedKey ? { color: '#14b8a6' } : { color: '#000' }}>
                                        {name}
                                    </Nav.Item>
                                </Nav.Link>
                            ))}
                        </Offcanvas.Title>
                    </Nav>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ overflow: 'scroll' }}>
                    <Tab.Content>
                        {area.name.map((_, index) => (
                            <Tab.Pane key={index} eventKey={index}>
                                <ToggleButtonGroup
                                    type="checkbox"
                                    value={activeSymptoms}
                                    onChange={handleActiveSymptomList}
                                    bsPrefix={cx('symptom-list')}
                                    ref={buttonGroupRef}
                                >
                                    {findSymptomListByAreaId(area.id).map((symptom, symptomIndex) => (
                                        <ToggleButton
                                            key={symptomIndex}
                                            style={{
                                                backgroundColor: activeSymptoms?.includes(symptom.id)
                                                    ? '#14b8a6'
                                                    : '#f1f5f9',
                                                color: activeSymptoms?.includes(symptom.id) ? '#fff' : '#000',
                                                fontWeight: 600,
                                                fontSize: '16px',
                                                boxShadow:
                                                    activeSymptoms?.includes(symptom.id) && '0px 0px 0px 4px #14b8a640',
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
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Offcanvas.Body>
            </Tab.Container>
            <Button
                onClick={handleClose}
                style={{
                    margin: '8px',
                    padding: '16px 28px',
                    borderColor: '#1e293b',
                    fontWeight: 700,
                    fontSize: '16px',
                    backgroundColor: '#1e293b',
                }}
            >
                Done
                <FontAwesomeIcon style={{ paddingLeft: '10px' }} icon={faCheck} />
            </Button>
        </Offcanvas>
    );
});

export default SymptomList;
