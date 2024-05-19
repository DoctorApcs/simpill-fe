import classNames from 'classnames/bind';
import style from './BodyMap.module.scss';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import BodyPart from './BodyPart';
import BodyContainer from './BodyContainer';
import { Button, Container } from 'react-bootstrap';
import SymptomList from './SymptomList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {  getBodyParts, findAreaGroupByAreaId, findAreaIdByBodyPartId, handleAPI, getBodyAreas } from '~/handler';
import Header from '~/layouts/components/Header';
import { NavLink } from 'react-router-dom';
import config from '~/config';
import * as symptomsService from '~/services/symptomsService';
import requests from '~/utils/routes';
import * as drugsService from '~/services/drugsService';

const cx = classNames.bind(style);
function BodyMap() {
    // state for clicked and hovered body part
    const [clicked, setClicked] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [areaIdx, setAreaIdx] = useState(-1);
    const [areaHoveredIdx, setAreaHoveredIdx] = useState(-1);
    //state for showing symptom list
    const [showSymptomList, setShowSymptomList] = useState(false);
    //get ref for symptom list and body area buttons
    const symptomListRef = useRef(null);
    const bodyAreaButtonsRef = useRef(null);

    // state for active symptoms list
    const [areaIdxList, setAreaIdxList] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const symptomList = await symptomsService.symptomList(requests.symptomList);
            handleAPI(symptomList);
        }
        fetchApi();
    }, []);
    // Get body parts and areas
    const [selectedSymptoms, setSelectedSymptoms] = useState(() => {
        // Try to get the initial state from local storage
        const storedData = localStorage.getItem('selectedSymptoms');
        if (storedData) {
            const { timestamp, symptoms } = JSON.parse(storedData);
            const oneHour = 60*60*1000; // in milliseconds
            const isExpired = Date.now() - timestamp > oneHour;
            if (!isExpired) {
                return symptoms;
            }
        }
        return [];
    })
    // Save selected symptoms to local storage
    useEffect(() => {
        const data = {
            timestamp: Date.now(), // Store a timestamp
            symptoms: selectedSymptoms,
        };
        localStorage.setItem('selectedSymptoms', JSON.stringify(data));
    }, [selectedSymptoms]);

    const antBodyParts = useMemo(() => {
        return getBodyParts().filter(({ face }) => face === 'ant');
    }, []);

    const bodyAreas = useMemo(() => {
        return getBodyAreas();
    }, []);

    useEffect(() => {
        let selectedAreaIdxList = [];
        for (const selectedSymptom of selectedSymptoms) {
            selectedAreaIdxList.push(selectedSymptom.areaId);
        }
        setAreaIdxList(selectedAreaIdxList);
    }, [selectedSymptoms]);
    

    const getFill = useCallback(
        (bodyPartId) => {
            if (areaIdx !== -1) {
                if (bodyAreas[areaIdx]?.bodyPartIds.includes(bodyPartId)) return '#F44F5E';
            }
            for (const areaId of areaIdxList) {
                if (bodyAreas[areaId]?.bodyPartIds.includes(bodyPartId)) return '#F44F5E';
            }
            if (areaHoveredIdx !== -1) {
                if (bodyAreas[areaHoveredIdx]?.bodyPartIds.includes(bodyPartId)) return '#E8ECF1';
            }
            return '#CBD5E1';
        },
        [bodyAreas, areaHoveredIdx, areaIdxList, areaIdx],
    );

    // Handle click and hover events
    const handleClick = (id) => {
        setShowSymptomList(true);
        setClicked(id);
    };

    const handleMouseEnter = (id) => {
        if ('ontouchstart' in window) return;
        setHovered(id);
    };

    const handleMouseLeave = () => {
        if ('ontouchstart' in window) return;
        setHovered(null);
    };

    // Set area index when clicked or hovered
    useEffect(() => {
        const areaIndex = findAreaIdByBodyPartId(clicked);
        setAreaIdx(areaIndex);
        bodyAreaButtonsRef.current.children[areaIndex]?.scrollIntoView({
            behaivor: 'smooth',
        });
    }, [clicked]);

    useEffect(() => {
        const areaHoveredIndex = findAreaIdByBodyPartId(hovered);
        setAreaHoveredIdx(areaHoveredIndex);
    }, [hovered]);

    const handleClickAreaButton = (index) => {
        setShowSymptomList(true);
        setAreaIdx(index);
    };

    useEffect(() => {
        if(!showSymptomList) {
            setAreaIdx(-1);
            setClicked(null);
        }
    }, [showSymptomList]);

    return (
        <Container className="d-inline-flex flex-column justify-content-center" style={{ gap: '20px' }}>
            <Header pageNumb={0} />
            <div className={cx('header-content')}>
                <h1 className={cx('header')}>Symptoms Checker</h1>
                <p className={cx('instruction')}>Select a body part where you are experiencing symptoms.</p>
            </div>
            <div className={cx('body')}>
                <BodyContainer>
                    {antBodyParts.map((bodyPart, index) => (
                        <BodyPart
                            key={index}
                            id={bodyPart.id}
                            d={bodyPart.d}
                            fill={getFill(bodyPart.id)}
                            onClick={handleClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </BodyContainer>
            </div>
            <div className={cx('button-row')} ref={bodyAreaButtonsRef}>
                {bodyAreas.map((area, index) => (
                    <label key={index} style={{ display: 'flex' }}>
                        <Button
                            key={index}
                            bsPrefix={cx('body-part-button')}
                            onClick={() => handleClickAreaButton(index)}
                            style={
                                areaIdxList.includes(index)
                                    ? { color: '#fff', backgroundColor: '#14b8a6' }
                                    : { color: '#000', backgroundColor: '#f1f5f9' }
                            }
                        >
                            {area.name}
                        </Button>
                    </label>
                ))}
            </div>
            {areaIdx !== -1 ? (
                <SymptomList
                    ref={symptomListRef}
                    areaId={areaIdx}
                    areaGroup={findAreaGroupByAreaId(areaIdx)}
                    selectedSymptoms={selectedSymptoms}
                    setSelectedSymptoms={setSelectedSymptoms}
                    showSymptomList={showSymptomList}
                    setShowSymptomList={setShowSymptomList}
                />
            ) : (
                ''
            )}
            <NavLink
                to={selectedSymptoms.length === 0 ? '#' : config.routes.supplements}
                className={cx('submit-button', `${selectedSymptoms.length === 0 ? 'disabled-link' : ''}`)}
            >
                Submit
                <FontAwesomeIcon style={{ paddingLeft: '10px' }} icon={faCheck} />
            </NavLink>
        </Container>
    );
}

export default BodyMap;
