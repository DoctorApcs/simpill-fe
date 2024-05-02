function BodyContainer({ children }) {
    return (
        <div
            style={{
                width: '207px',
                height: '500px',
                margin: '30px auto',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.42 832.97">
                <g>{children}</g>
            </svg>
        </div>
    );
}

export default BodyContainer;
