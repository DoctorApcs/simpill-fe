import classNames from 'classnames/bind';
import style from './InfoTag.module.scss';

const cx = classNames.bind(style);
function Interactions({ content }) {
    return (
        <div>
            {content.map((item, index) => (
                <div key={index}>
                    <h2 className={cx('subtitle')} dangerouslySetInnerHTML={{ __html: item?.title }}></h2>
                    <p className={cx('content')} dangerouslySetInnerHTML={{ __html: item?.annotation }}></p>
                    {item.list.map((interaction, index) => (
                        <div key={index}>
                            <h3
                                className={cx('subtitle')}
                                dangerouslySetInnerHTML={{ __html: interaction?.subtitle }}
                            ></h3>
                            <p className={cx('content')} dangerouslySetInnerHTML={{ __html: interaction?.content }}></p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Interactions;
