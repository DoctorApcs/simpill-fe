function BodyPart({ id, d, fill, onClick, onMouseEnter, onMouseLeave }) {
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
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={Object.assign(
                {
                    WebkitTapHighlightColor: 'transparent',
                    cursor: 'pointer',
                },
                { fill },
            )}
        />
    );
}

export default BodyPart;
