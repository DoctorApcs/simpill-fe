import classNames from 'classnames/bind';
import style from './InfoTag.module.scss';

const cx = classNames.bind(style);
function InfoTag({ title, content }) {
    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>{title}</h2>
            <p className={cx('content')}>{content}</p>
        </div>
    );
}

export default InfoTag;
