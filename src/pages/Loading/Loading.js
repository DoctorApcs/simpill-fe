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
        </div>
    );
}

export default Loading;
