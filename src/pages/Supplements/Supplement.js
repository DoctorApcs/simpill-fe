import classNames from 'classnames/bind';
import style from './Supplement.module.scss';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect, useRef, useState } from 'react';
import { Nav, Tab, TabPane } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import images from '~/assets/images';
import InfoTag from '~/components/InfoTag';
import Uses from '~/components/InfoTag/Uses';
import ProductLayout from '~/components/ProductLayout';
import DrugList from '~/pages/Drugs/DrugList';
import * as supplementService from '~/services/supplementService';
import * as winkjsService from '~/services/winkjsService';


const cx = classNames.bind(style);
const switchButton = [
    {
        eventKey: 'details',
        name: 'Details',
    },
    {
        eventKey: 'drugs',
        name: 'Drugs',
    },
];

const extractLiValues = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const liElements = doc.querySelectorAll('li');
    const liValues = Array.from(liElements).map((li) => li.textContent);
    return liValues;
};

const concatLiValues = (values) => {
    return '<ul>' + values.map((value) => `<li>${value}</li>`).join('') + '</ul>';
};

function Supplement() {
    const [activeId, setActiveId] = useState(0);
    const [supplement, setSupplement] = useState({});
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [originalSupplement, setOriginalSupplement] = useState({});
    const { name } = useParams();

    const handleSwitch = async () => {
        if (isHighlighted) {
            supplement.overview = originalSupplement.overview;
            supplement.uses = originalSupplement.uses;
        } else {
            supplement.overview = winkjsService.shortenText(originalSupplement.overview);

            for (let i = 0; i < originalSupplement.uses.length; i++) {
                const uses = extractLiValues(supplement.uses[i].uses);
                const highlightedUses = [];
                for (let j = 0; j < uses.length; j++) {
                    // only get the first 1 sentences
                    const firstSentence = uses[j].split('.').slice(0, 1).join('.') + '.';
                    highlightedUses.push(firstSentence)
                }
                supplement.uses[i].uses = concatLiValues(highlightedUses);
            }
        }

        setIsHighlighted(!isHighlighted);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const supplement = await supplementService.supplement(name);
            setOriginalSupplement(supplement);
            // make a deep copy of the supplement object
            setSupplement(JSON.parse(JSON.stringify(supplement)));
        };
        if (name !== '' && name !== undefined) {
            fetchApi();
        }
    }, [name]);

    const handleSelect = (key) => {
        setTimeout(() => {
            setActiveId(Number(key));
        });
    };

    const animationDelay = 100; // ms

    const sliderRef = useRef(null);

    const sliderDefaultStyle = {
        position: 'absolute',
        backgroundColor: '#14b8a6',
        width: '50%',
        zIndex: 0,
        borderRadius: 'inherit',
        transition: `transform ${animationDelay}ms`,
        fontSize: '14px',
        padding: '8px 12px',
        left: '4px'
    }

    const sliderTransitionStyle = {
        entering: { transform: 'translateX(0)' },
        entered: { transform: 'translateX(100%)' },
        exiting: { transform: 'translateX(100%)' },
        exited: { transform: 'translateX(0)' },
    };

    const navItemTextRef = useRef(null);

    const navItemTextDefaultStyle = {
        zIndex: 1,
        transition: `color ${animationDelay}ms`,
    };

    const navItemTextTransitionStyle = {
        entering: { color: '#fff' },
        entered: { color: '#fff' },
        exiting: { color: '#475569' },
        exited: { color: '#475569' },
    };

    return (
        <ProductLayout productImg={images.supplement} product={supplement} isShowTitle={true}>
            <Tab.Container activeKey={activeId} onSelect={(k) => handleSelect(k)}>
                <Nav variant="pills" className="d-flex justify-content-center" style={{ heigth: '60px' }}>
                    <div className={cx('switch-button')}>
                        {switchButton.map((item, index) => (
                            <Nav.Link
                                key={index}
                                bsPrefix={cx('nav-item')}
                                active={index === activeId}
                                eventKey={index}
                            >
                                <Transition nodeRef={navItemTextRef} in={index === activeId} timeout={animationDelay}>
                                    {state => (
                                        <Nav.Item ref={navItemTextRef} style={{
                                            ...navItemTextDefaultStyle,
                                            ...navItemTextTransitionStyle[state],
                                        }}>{item.name}</Nav.Item>
                                    )}
                                </Transition>
                            </Nav.Link>
                        ))}
                        <Transition nodeRef={sliderRef} in={activeId} timeout={animationDelay}>
                            {state => (
                                <div
                                    ref={sliderRef}
                                    style={{
                                        ...sliderDefaultStyle,
                                        ...sliderTransitionStyle[state],
                                    }}
                                ><wbr/>
                                </div>
                            )}
                        </Transition>
                    </div>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey={0}>
                        <div className={cx('content')}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isHighlighted}
                                        onChange={handleSwitch}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: 'rgb(20, 184, 166)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(241, 245, 249, 0.08)',
                                                },
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: 'rgba(20, 184, 166, 0.5)',
                                            },
                                            '& .MuiSwitch-switchBase': {
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                                },
                                            },
                                            '& .MuiSwitch-track': {
                                                backgroundColor: '#d3d3d3', // Default background color
                                            },
                                        }}
                                    />
                                }
                                label="Only show the key points"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        fontFamily: 'Manrope',
                                        color: '#627067',
                                    },
                                }}
                            />
                            {supplement?.overview && (
                                <InfoTag title="Overview" content={supplement.overview} initOpen={true} />
                            )}
                            {supplement?.dosing && <InfoTag title="Dosing" content={supplement.dosing} />}
                            {supplement?.uses && <InfoTag title="Uses" content={supplement.uses} Component={Uses} />}
                            {supplement?.side_effects && (
                                <InfoTag title="Side Effects" content={supplement.side_effects} />
                            )}
                            {supplement?.precautions && <InfoTag title="Precautions" content={supplement.precautions} />}
                            {/* {supplement?.interactions && (
                                <InfoTag
                                    title="Interactions"
                                    content={supplement.interactions}
                                    Component={Interactions}
                                />
                            )} */}
                        </div>
                    </Tab.Pane>
                    <TabPane eventKey={1}>
                        <DrugList supplement={supplement.name}/>
                    </TabPane>
                </Tab.Content>
            </Tab.Container>
        </ProductLayout>
    );
}

export default Supplement;
