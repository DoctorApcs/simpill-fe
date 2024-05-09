import classNames from 'classnames/bind';
import style from './Loading.module.scss';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loaded from './Loaded';

const cx = classNames.bind(style);
function Loading() {
    const [loading, setLoading] = useState(true);
    const activeSymptoms = useSelector((state) => state.activeSymptoms);
    console.log(activeSymptoms);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (loading) {
        document.body.style.backgroundColor = 'rgb(204, 251, 241)';
    } else {
        document.body.style.backgroundColor = 'white';
    }

    return (
        <div className={cx('container')}>
            {loading ? (
                <div className={cx('content')}>
                    <h1 style={{ fontSize: '30px', fontWeight: 800, padding: '20px', textAlign: 'center' }}>
                        Analyzing Symptoms
                    </h1>
                    <p style={{ fontSize: '18px', padding: '0 20px', textAlign: 'center' }}>
                        Please wait... We’re calculating the data based on your asessment.
                    </p>
                </div>
            ) : (
                <Loaded />
            )}
        </div>
    );
}

export default Loading;
