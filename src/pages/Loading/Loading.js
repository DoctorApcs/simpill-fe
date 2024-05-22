import LinearProgress from '@mui/material/LinearProgress';
import classNames from 'classnames/bind';
import style from './Loading.module.scss';

const cx = classNames.bind(style);
function Loading() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <h1 style={{ fontSize: '30px', fontWeight: 800, padding: '20px', textAlign: 'center' }}>
                    Analyzing Symptoms
                </h1>
                <p style={{ fontSize: '18px', padding: '0 20px', textAlign: 'center' }}>
                    Please wait... We’re calculating the data based on your asessment.
                </p>
            </div>
            <div style={{
                border: '4px solid', 
                width: 'fit-content',
                borderRadius: '24px',
                padding: '4px',
            }}>
                <LinearProgress sx={{
                    background: 'linear-gradient(to right, #45EBA5, #163A5F)',
                    '> span': { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
                    borderRadius: '16px',
                    height: '32px',
                    width: '128px'
                }}/>
            </div>
        </div>
    );
}

export default Loading;
