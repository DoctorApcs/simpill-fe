import { forwardRef } from 'react';

const BodyPart = forwardRef(({ id, d, fill, onClick, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const handleClick = () => {
        onClick(id);
    };

    const handleMouseEnter = () => {
        onMouseEnter(id);
    };

    const handleMouseLeave = () => {
        onMouseLeave(id);
    };
    return (
        <path
            d={d}
            id={id}
            ref={ref}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
            style={Object.assign(
                {
                    WebkitTapHighlightColor: 'transparent',
                    cursor: 'pointer',
                },
                { fill },
            )}
        />
    );
});

export default BodyPart;
