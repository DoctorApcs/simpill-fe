import classNames from 'classnames/bind';
import style from './InfoTag.module.scss';

const cx = classNames.bind(style);
function Uses({ content }) {
    return (
        <div>
            {content.map((item, index) => (
                <div key={index}>
                    <h2 className={cx('subtitle')} dangerouslySetInnerHTML={{ __html: item.title }}></h2>
                    <p className={cx('content')} dangerouslySetInnerHTML={{ __html: item.uses }}></p>
                </div>
            ))}
        </div>
    );
}

export default Uses;
