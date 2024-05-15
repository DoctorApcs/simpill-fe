import classNames from 'classnames/bind';
import style from './InfoTag.module.scss';
import { Button, Collapse } from 'react-bootstrap';
import { useState } from 'react';

const cx = classNames.bind(style);
function InfoTag({ title, content, initOpen = false, Component }) {
    const [open, setOpen] = useState(initOpen);
    const isList = Array.isArray(content);
    return (
        <>
            <Button onClick={() => setOpen(!open)} bsPrefix={cx('title')}>
                {title}
                <span className={cx('caret', `${open ? 'caret-toggle' : ''}`)}></span>
            </Button>
            <Collapse in={open}>
                <div className={cx('container')}>
                    {isList ? (
                        <Component content={content} />
                    ) : (
                        <p className={cx('content')} dangerouslySetInnerHTML={{ __html: content }}></p>
                    )}
                </div>
            </Collapse>
        </>
    );
}

export default InfoTag;
