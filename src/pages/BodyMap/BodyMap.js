import classNames from 'classnames/bind';
import style from './BodyMap.module.scss';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import BodyPart from './BodyPart';
import BodyContainer from './BodyContainer';
import { Button, Container } from 'react-bootstrap';
import SymptomList from './SymptomList';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getBodyAreas, getBodyParts, findAreaGroupByAreaId, findAreaIdByBodyPartId } from '~/handler';
import Header from '~/layouts/components/Header';

const cx = classNames.bind(style);
function BodyMap() {
    // state for clicked and hovered body part
    const [clicked, setClicked] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [areaIdx, setAreaIdx] = useState(-1);
    const [areaHoveredIdx, setAreaHoveredIdx] = useState(-1);
    //state for showing symptom list
    const [showSymptomList, setShowSymptomList] = useState(false);
    //state for loading
    const [isLoading, setLoading] = useState(false);
    //get ref for symptom list and body area buttons
    const symptomListRef = useRef(null);
    const bodyAreaButtonsRef = useRef(null);

    // state for active symptoms list
    const [areaIdxList, setAreaIdxList] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    // Get body parts and areas
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
    }, [selectedSymptoms, areaIdx]);
    const getFill = useCallback(
        (bodyPartId) => {
            if (areaIdx !== -1) {
                if (bodyAreas[areaIdx].bodyPartIds.includes(bodyPartId)) return '#F44F5E';
            }
            for (const areaId of areaIdxList) {
                if (bodyAreas[areaId].bodyPartIds.includes(bodyPartId)) return '#F44F5E';
            }
            if (areaHoveredIdx !== -1) {
                if (bodyAreas[areaHoveredIdx].bodyPartIds.includes(bodyPartId)) return '#E8ECF1';
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

    // Close symptom list when clicked outside
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (symptomListRef.current && !symptomListRef.current.dialog?.contains(event.target)) {
    //             if (selectedSymptoms.includes((selectedSymptom) => selectedSymptom.areaId !== areaIdx)) {
    //                 setAreaIdx(-1);
    //             }
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    const handleClickAreaButton = (index) => {
        setShowSymptomList(true);
        setAreaIdx(index);
    };

    const handleSubmit = () => {
        setLoading(true);
    };

    if (isLoading) return <Loading />;

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
                {/* <div>
                    <p>{txt[2]}</p>
                    <BodyContainer>
                        {postBodyPart.map((bodyPart, index) => (
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
                </div> */}
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
                    showSymptomList={showSymptomList}
                    areaGroup={findAreaGroupByAreaId(areaIdx)}
                    setClicked={setClicked}
                    setAreaIdx={setAreaIdx}
                    selectedSymptoms={selectedSymptoms}
                    setSelectedSymptoms={setSelectedSymptoms}
                    setShowSymptomList={setShowSymptomList}
                />
            ) : (
                ''
            )}
            <Button
                disabled={selectedSymptoms.length === 0}
                onClick={handleSubmit}
                style={{
                    margin: '8px',
                    padding: '16px 28px',
                    borderColor: '#1e293b',
                    fontWeight: 700,
                    fontSize: '16px',
                    backgroundColor: '#1e293b',
                }}
            >
                Submit
                <FontAwesomeIcon style={{ paddingLeft: '10px' }} icon={faCheck} />
            </Button>
        </Container>
    );
}

export default BodyMap;
