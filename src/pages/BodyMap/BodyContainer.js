function BodyContainer({ children }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f1f5f9',
                borderRadius: '32px',
                width: '360px',
                padding: '30px',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.42 832.97" width="280">
                <g>{children}</g>
            </svg>
        </div>
    );
}

export default BodyContainer;
