import classNames from 'classnames/bind';
import style from './Supplement.module.scss';

import { useEffect, useState } from 'react';
import { Nav, Tab, TabPane } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import images from '~/assets/images';
import InfoTag from '~/components/InfoTag';
import Interactions from '~/components/InfoTag/Interactions';
import Uses from '~/components/InfoTag/Uses';
import ProductLayout from '~/components/ProductLayout';
import DrugList from '~/pages/Drugs/DrugList';
import * as supplementService from '~/services/supplementService';
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';

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
function Supplement() {
    const [activeId, setActiveId] = useState(0);
    const [supplement, setSupplement] = useState({});
    const [isHighlighted, setIsHighlighted] = useState(false);
    const { name } = useParams();

    const handleSwitch = () => {
        setIsHighlighted(!isHighlighted);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const supplement = await supplementService.supplement(name);
            setSupplement(supplement);
        };
        if (name !== '' && name !== undefined) {
            fetchApi();
        }
    }, [name]);

    const handleSelect = (key) => {
        setActiveId(Number(key));
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
                                style={{
                                    backgroundColor: activeId === index ? '#14b8a6' : 'transparent',
                                    color: activeId === index ? '#fff' : '#475569',
                                }}
                            >
                                <Nav.Item>{item.name}</Nav.Item>
                            </Nav.Link>
                        ))}
                    </div>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey={0}>
                        <div className={cx('content')}>
                            <FormControlLabel
                                control={<Switch checked={isHighlighted} style={{color: '#14b8a6' }} onChange={handleSwitch} />}
                                label="Highlight the key points"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '16px',
                                        fontWeight: 550,
                                        fontFamily: 'sans-serif',
                                    }
                                }}
                            />
                            {supplement.overview && (
                                <InfoTag title="Overview" content={supplement.overview} initOpen={true} />
                            )}
                            {supplement.uses && <InfoTag title="Uses" content={supplement.uses} Component={Uses} />}
                            {supplement.side_effects && (
                                <InfoTag title="Side Effects" content={supplement.side_effects} />
                            )}
                            {supplement.precautions && <InfoTag title="Precautions" content={supplement.precautions} />}
                            {supplement.interactions && (
                                <InfoTag
                                    title="Interactions"
                                    content={supplement.interactions}
                                    Component={Interactions}
                                />
                            )}
                            {supplement.dosing && <InfoTag title="Dosing" content={supplement.dosing} />}
                        </div>
                    </Tab.Pane>
                    <TabPane eventKey={1}>
                        <DrugList />
                    </TabPane>
                </Tab.Content>
            </Tab.Container>
        </ProductLayout>
    );
}

export default Supplement;
