import classNames from 'classnames/bind';
import style from './BodyMap.module.scss';

import { useCallback, useMemo, useState } from 'react';
import { getBodyPart } from './getBodyParts';
import BodyPart from './BodyPart';
import BodyContainer from './BodyContainer';

const cx = classNames.bind(style);
function BodyMap() {
    const [clicked, setClicked] = useState(null);
    const [hovered, setHovered] = useState(null);

    const antBodyParts = useMemo(() => {
        return getBodyPart().filter(({ face }) => face === 'ant');
    });

    // const postBodyPart = useMemo(() => {
    //     return getBodyPart().filter(({ face }) => face === 'post');
    // });

    const clickedName = useMemo(() => {
        if (!clicked) {
            return '';
        }
        return getBodyPart().find((d) => clicked === d.id)?.name || '';
    }, [clicked]);

    const getFill = useCallback(
        (bodyPartId) => {
            if (clicked === bodyPartId) return 'rgb(255, 59, 48)';
            if (hovered === bodyPartId) return 'rgb(85, 85, 87)';
            return 'rgb(75, 75, 77)';
        },
        [clicked, hovered],
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
