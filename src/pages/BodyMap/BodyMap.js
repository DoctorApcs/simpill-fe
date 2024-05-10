import classNames from 'classnames/bind';
import style from './BodyMap.module.scss';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { getBodyArea, getBodyPart } from './getBodyParts';
import BodyPart from './BodyPart';
import BodyContainer from './BodyContainer';
import { Button, Container } from 'react-bootstrap';
import SymptomList from './SymptomList';

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

    // Get body parts and areas
    const antBodyParts = useMemo(() => {
        return getBodyPart().filter(({ face }) => face === 'ant');
    }, []);

    const bodyAreas = useMemo(() => {
        return getBodyArea();
    }, []);

    // const postBodyPart = useMemo(() => {
    //     return getBodyPart().filter(({ face }) => face === 'post');
    // });

    // Change color of body part when clicked and hovered
    const getFill = useCallback(
        (bodyPartId) => {
            if (areaIdx !== -1) {
                if (bodyAreas[areaIdx].bodyPartIds.includes(bodyPartId)) return '#F44F5E';
            }
            if (areaHoveredIdx !== -1) {
                if (bodyAreas[areaHoveredIdx].bodyPartIds.includes(bodyPartId)) return '#E8ECF1';
            }
            return '#CBD5E1';
        },
        [areaIdx, areaHoveredIdx],
    );

    // Handle click and hover events
    const handleClick = (id) => {
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
        const areaIndex = findArea(clicked);
        setAreaIdx(areaIndex);
        bodyAreaButtonsRef.current.children[areaIndex]?.scrollIntoView({
            behaivor: 'smooth',
        });
    }, [clicked]);

    useEffect(() => {
        const areaHoveredIndex = findArea(hovered);
        setAreaHoveredIdx(areaHoveredIndex);
    }, [hovered]);

    // Find area index by body part id
    const findArea = (searchedId) => {
        for (let i = 0; i < bodyAreas.length; i++) {
            if (bodyAreas[i].bodyPartIds.includes(searchedId)) {
                return i;
            }
        }
        return -1;
    };

    useEffect(() => {
        setShowSymptomList(true);
    }, [areaIdx]);

    // Close symptom list when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (symptomListRef.current && !symptomListRef.current.dialog?.contains(event.target)) {
                setAreaIdx(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Container className="d-inline-flex flex-column justify-content-center" style={{ gap: '20px' }}>
            <h1 className={cx('header')}>Symptom Checker</h1>
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
                    <Button
                        key={index}
                        bsPrefix={cx('body-part-button')}
                        onClick={() => setAreaIdx(index)}
                        style={
                            index === areaIdx
                                ? { color: '#fff', backgroundColor: '#14b8a6' }
                                : { color: '#000', backgroundColor: '#f1f5f9' }
                        }
                    >
                        {area.name}
                    </Button>
                ))}
            </div>
            {areaIdx !== -1 ? (
                <SymptomList
                    ref={symptomListRef}
                    area={bodyAreas[areaIdx]}
                    show={showSymptomList}
                    handleClose={() => setShowSymptomList(false)}
                />
            ) : (
                ''
            )}
        </Container>
    );
}

export default BodyMap;
