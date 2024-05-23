import LinearProgress from '@mui/material/LinearProgress';
import classNames from 'classnames/bind';
import style from './Loading.module.scss';

const cx = classNames.bind(style);

const quotes = [
    "The greatest wealth is health. - Virgil",
    "Good health and good sense are two of life's greatest blessings. - Publilius Syrus",
    "He who has health has hope, and he who has hope has everything. - Arabian Proverb",
    "Health is not valued till sickness comes. - Thomas Fuller",
    "Take care of your body. It's the only place you have to live. - Jim Rohn",
    "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear. - Buddha"
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function Loading() {
    const quote = getRandomQuote();
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <h1 style={{ fontSize: '30px', fontWeight: 800, padding: '20px', textAlign: 'center' }}>
                    Analyzing Symptoms
                </h1>
                <p style={{ fontSize: '18px', padding: '0 20px', textAlign: 'center' }}>
                    Please wait... We’re finding the best supplements for you.
                </p>
                <div style={{
                    margin: '20px 10px',
                    padding: '10px 10px',
                    fontSize: '16px',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    color: '#555',
                    background: '#f9f9f9',
                    borderRadius: '10px',
                    maxWidth: '600px',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <p>"{quote}"</p>
                </div>
            </div>
            <div style={{
                border: '4px solid #575757', 
                width: 'fit-content',
                borderRadius: '24px',
                padding: '4px',
            }}>
                <LinearProgress sx={{
                    background: 'linear-gradient(to right, #45EBA5, #7b8782)',
                    '> span': { backgroundColor: 'rgba(128, 128, 128, 0.15)' },
                    borderRadius: '16px',
                    height: '32px',
                    width: '128px'
                }}/>
            </div>
        </div>
    );
}

export default Loading;
