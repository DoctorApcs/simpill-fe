import classNames from 'classnames/bind';
import style from './BodyMap.module.scss';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getBodyArea, getBodyPart } from './getBodyParts';
import BodyPart from './BodyPart';
import BodyContainer from './BodyContainer';

const cx = classNames.bind(style);
function BodyMap() {
    const [clicked, setClicked] = useState(null);
    const [clickedList, setClickedList] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [hoveredList, setHoveredList] = useState([]);

    const antBodyParts = useMemo(() => {
        return getBodyPart().filter(({ face }) => face === 'ant');
    });

    const bodyAreas = useMemo(() => {
        return getBodyArea();
    });
    // const postBodyPart = useMemo(() => {
    //     return getBodyPart().filter(({ face }) => face === 'post');
    // });

    const clickedName = useMemo(() => {
        return getBodyPart().find((bodyPart) => clicked === bodyPart.id)?.name || '';
    }, [clicked]);

    const getFill = useCallback(
        (bodyPartId) => {
            if (clicked === bodyPartId || clickedList.includes(bodyPartId)) return '#F43F5E';
            if (hovered === bodyPartId || hoveredList.includes(bodyPartId)) return '#E8ECF1';
            return '#CBD5E1';
        },
        [clicked, hovered, clickedList, hoveredList],
    );
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

    useEffect(() => {
        const bodyPartIds = handleBodyArea(clicked);
        setClickedList(bodyPartIds);
    }, [clicked]);

    useEffect(() => {
        const bodyPartIds = handleBodyArea(hovered);
        setHoveredList(bodyPartIds);
    }, [hovered]);

    const handleBodyArea = (searchedId) => {
        for (let i = 0; i < bodyAreas.length; i++) {
            if (bodyAreas[i].bodyPartIds.includes(searchedId)) return bodyAreas[i].bodyPartIds;

            // const bodyPartLength = bodyAreas[i].bodyPartIds.length;
            // for (let j = 0; j < bodyPartLength; j++) {
            //     if (bodyAreas[i].bodyPartIds[j] === clicked) {
            //         return bodyAreas[i].bodyPartIds;
            //     }
            // }
        }
        return [];
    };

    return (
        <>
            <div className={style.bodies}>
                <div>
                    <p>{txt[1]}</p>
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
            <div className={style.header}>
                <p>{clickedName || txt[0]}</p>
            </div>
        </>
    );
}

const txt = {
    0: 'Click on the body!',
    1: 'Front View',
    2: 'Back View',
};
export default BodyMap;
