import classNames from 'classnames/bind';
import style from './Loading.module.scss';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(style);
function Loading() {
    const [loading, setLoading] = useState(true);
    // Get active symptoms from redu9x store
    const activeSymptoms = useSelector((state) => state.activeSymptoms);

    // console.log(activeSymptoms);

    const debouncedValue = useDebounce(activeSymptoms, 3000);
    console.log(debouncedValue);

    const navigate = useNavigate();

    // Simulate loading time
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            document.body.style.backgroundColor = 'white';
            navigate('/supplements');
        }, 3000);
    }, [navigate]);

    // Change background color based on loading state
    if (loading) {
        document.body.style.backgroundColor = 'rgb(204, 251, 241)';
    }
    return (
        <div className={cx('container')}>
            {loading && (
                <div className={cx('content')}>
                    <h1 style={{ fontSize: '30px', fontWeight: 800, padding: '20px', textAlign: 'center' }}>
                        Analyzing Symptoms
                    </h1>
                    <p style={{ fontSize: '18px', padding: '0 20px', textAlign: 'center' }}>
                        Please wait... We’re calculating the data based on your asessment.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Loading;
