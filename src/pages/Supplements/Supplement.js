import classNames from 'classnames/bind';
import style from './Supplement.module.scss';

import { Nav, Tab, TabPane } from 'react-bootstrap';
import { Transition } from 'react-transition-group';
import images from '~/assets/images';
import InfoTag from '~/components/InfoTag';
import { useRef, useState } from 'react';
import FruitDrugList from '~/pages/Fruits&Drugs/FruitDrugList';
import ProductLayout from '~/components/ProductLayout';
import Uses from '~/components/InfoTag/Uses';
import Interactions from '~/components/InfoTag/Interactions';

const supplement = {
    name: 'VITAMIN A',
    overview:
        'Vitamin A is a fat-soluble vitamin. Its different forms are often called "retinoids." They include retinol, retinal, retinoic acid, and retinyl ester.<br><br> Vitamin A is needed for the proper growth and functioning of many parts of the body, including the eyes, skin, and immune system. It can be found in many foods, including fruits, vegetables, and fish. Carotenoids are a group of chemicals found in plants. Some can be converted to vitamin A in the body.<br><br> People most commonly use vitamin A for treating vitamin A deficiency. It is also used for aging skin, acne, HIV/AIDS, cataracts, child development, infections, and many other conditions. <br><br> ',
    uses: [
        {
            title: 'Effective for',
            uses: '<ul><li>Vitamin A deficiency. Taking vitamin A by mouth is effective for preventing and treating vitamin A deficiency. </li></ul>',
        },
        {
            title: 'Possibly Effective for',
            uses: "<ul><li>Aging skin. Applying vitamin A (retinol) on the skin improves skin color, flexibility, and wrinkles in people with aging skin. It isn't clear whether non-prescription retinol works as well as prescription products such as tretinoin (Renova).</li><li>A lung disease that affects newborns (bronchopulmonary dysplasia). Giving vitamin A as a shot seems to reduce the risk of this lung disease in infants born with a low birth weight. Vitamin A shots can only be given by a healthcare provider. It isn't clear whether giving vitamin A by mouth is helpful. </li><li>Diarrhea. Giving vitamin A by mouth to young children who are at risk of vitamin A deficiency seems to prevent diarrhea. It isn't clear whether taking vitamin A while breastfeeding can help to prevent diarrhea in the nursing infant.</li><li>Measles. Taking vitamin A by mouth seems to reduce the risk of measles, its complications, and death in young children with vitamin A deficiency.</li><li>Ability to see in low-light conditions. Taking vitamin A by mouth during pregnancy seems to reduce night blindness by 37% in malnourished adults. Vitamin A might work better for this condition when taken with zinc.</li><li>White patches inside the mouth that are usually caused by smoking (oral leukoplakia). Taking high-dose vitamin A by mouth can help treat these lesions.</li><li>Death from any cause. Taking high-dose vitamin A by mouth reduces the risk of death in children under 5 years of age who are at risk for vitamin A deficiency. Taking vitamin A doesn't seem to reduce the risk of death in healthy adults. </li><li>Complications after childbirth. Taking vitamin A by mouth before, during, and after pregnancy reduces diarrhea and the risk of death after giving birth in malnourished adults. </li><li>An inherited eye condition that causes poor night vision and loss of side vision (retinitis pigmentosa). Taking vitamin A by mouth can slow the progression of an eye disease that causes damage to the retina. </li><li>A type of inflammatory bowel disease (ulcerative colitis). Taking vitamin A by mouth daily for 2 months can reduce symptoms in adults with ulcerative colitis.</li><li>Skin wrinkles from sun damage. Applying non-prescription vitamin A (retinol) serum to the skin improves skin smoothness and wrinkles in females with sun-damaged skin. It might work as well as the prescription products that are approved by the FDA for treating skin wrinkles, such as tretinoin (Renova).</li></ul>",
        },
        {
            title: 'Possibly Ineffective for',
            uses: "<ul><li>Prone to allergies and allergic reactions (atopic disease). Giving a single dose of vitamin A by mouth to infants does not seem to prevent atopy.</li><li>Death of an unborn or premature baby. Taking vitamin A by mouth before, during, or after pregnancy does not seem to prevent infant death during the first year of life. Also giving vitamin A by mouth directly to infants doesn't seem to prevent infant death.</li><li>Infection of the intestines by parasites. Giving a single dose of vitamin A by mouth to children taking medicine to treat intestinal parasites doesn't seem to prevent reinfection.</li><li>The most serious type of skin cancer (melanoma). Taking a high dose of vitamin A by mouth doesn't seem to improve survival in people with melanoma. </li><li>Miscarriage. Taking vitamin A by mouth, alone or in combination with other vitamins, before or during early pregnancy doesn't reduce the risk of miscarriage or stillbirth.</li><li>Blood infection (sepsis). Giving vitamin A to premature infants doesn't seem to prevent sepsis. </li><li>Tuberculosis. Taking vitamin A by mouth doesn't seem to improve symptoms or decrease the risk of death in people with this condition.</li></ul>",
        },
        {
            title: 'Likely InEffective for',
            uses: '<ul><li>Head and neck cancer. Taking vitamin A by mouth does not reduce the risk of developing new tumors or improve survival in people with head and neck cancer.</li><li>HIV transmission. Taking vitamin A by mouth does not lower the risk of passing HIV to the fetus during pregnancy, to newborns during delivery, or to infants during breastfeeding. Taking vitamin A supplements during pregnancy might actually increase the risk of passing HIV to babies through breast milk.</li><li>Infection of the lower airways. Taking vitamin A by mouth does not prevent or reduce symptoms of lower airway infections in children. Also, taking vitamin A while breast-feeding does not seem to prevent these infections in nursing infants.</li></ul>',
        },
    ],
    side_effects:
        '<b>When taken by mouth</b>: Vitamin A is likely safe when taken in amounts less than 10,000 units (3,000 mcg) daily. Vitamin A is available in two forms: pre-formed vitamin A (retinol or retinyl ester) and provitamin A (carotenoids). The maximum daily dose relates to only pre-formed vitamin A. <br><br> Pre-formed vitamin A is possibly unsafe when taken in doses greater than 10,000 units (3,000 mcg) daily. Higher doses might increase the risk of side effects. Long-term use of large amounts might cause serious side effects including mental changes. <br><br> <b>When applied to the skin</b>: Vitamin A is possibly safe when used short-term. Retinol 0.5% serum has been used daily for up to 12 weeks without serious side effects. <br><br> ',
    precautions:
        "<b>When taken by mouth</b>: Vitamin A is likely safe when taken in amounts less than 10,000 units (3,000 mcg) daily. Vitamin A is available in two forms: pre-formed vitamin A (retinol or retinyl ester) and provitamin A (carotenoids). The maximum daily dose relates to only pre-formed vitamin A. <br><br> Pre-formed vitamin A is possibly unsafe when taken in doses greater than 10,000 units (3,000 mcg) daily. Higher doses might increase the risk of side effects. Long-term use of large amounts might cause serious side effects including mental changes. <br><br> <b>When applied to the skin</b>: Vitamin A is possibly safe when used short-term. Retinol 0.5% serum has been used daily for up to 12 weeks without serious side effects. <br><br> <b>Pregnancy and breast-feeding</b>: Vitamin A is likely safe when taken in recommended amounts of less than 10,000 units (3,000 mcg) of pre-formed vitamin A daily. Larger amounts are possibly unsafe and can cause birth defects. Monitor vitamin A intake from all sources during the first three months of pregnancy. Forms of vitamin A are found in several foods including animal liver, some fortified breakfast cereals, and dietary supplements.<br><br> <b>Children</b>: Vitamin A is likely safe when taken in the recommended amounts. The maximum amounts of vitamin A that are safe for children are based on age. Vitamin A is possibly unsafe for children when taken by mouth in high doses. Taking high doses can cause side effects, including irritability, sleepiness, diarrhea, and other problems.<br><br> <b>Excessive use of alcohol</b>: Drinking alcohol might increase vitamin A's potentially harmful effects on the liver.<br><br> <b>Disorders in which the body does not absorb fat properly</b>: People with conditions that affect fat absorption are not able to absorb vitamin A properly. These conditions include celiac disease, short gut syndrome, jaundice, cystic fibrosis, pancreatic disease, and cirrhosis of the liver. If you have one of these conditions, take water-soluble forms of vitamin A, called carotenoids, instead.<br><br> <b>Iron deficiency</b>: Iron deficiency might affect the body's ability to use vitamin A. <br><br> <b>Liver disease</b>: Too much vitamin A might make liver disease worse. Do not take vitamin A supplements if you have liver disease.<br><br> <b>Malnutrition</b>: In people with severe protein malnutrition, taking vitamin A supplements might result in having too much vitamin A in the body.<br><br> <b>Zinc deficiency</b>: Zinc deficiency might cause symptoms of vitamin A deficiency. Taking a combination of vitamin A and zinc supplements might be necessary to improve this condition.<br><br> ",
    interactions: [
        {
            title: 'Major Interaction',
            annotation: 'Do not take this combination',
            list: [
                {
                    subtitle: 'Medications for skin conditions (Retinoids) interacts with VITAMIN A',
                    content:
                        'Some medications for skin conditions are made from vitamin A. Taking vitamin A and these medications together could cause toxic effects.',
                },
            ],
        },
        {
            title: 'Moderate Interaction',
            annotation: 'Be cautious with this combination',
            list: [
                {
                    subtitle: 'Antibiotics (Tetracycline antibiotics) interacts with VITAMIN A',
                    content:
                        'Taking very large amounts of vitamin A along with tetracyclines can increase the chance of a serious side effect called intracranial hypertension. But taking normal doses of vitamin A along with tetracyclines does not seem to cause this problem. Do not take large amounts of vitamin A if you are taking antibiotics.',
                },
                {
                    subtitle: 'Medications that can harm the liver (Hepatotoxic drugs) interacts with VITAMIN A',
                    content:
                        'Taking large amounts of vitamin A might harm the liver. Some medications can also harm the liver. Taking high doses of vitamin A along with a medication that can harm the liver might increase the risk of liver damage.',
                },
                {
                    subtitle: 'Warfarin (Coumadin) interacts with VITAMIN A',
                    content:
                        'Warfarin is used to slow blood clotting. Large amounts of vitamin A can also slow blood clotting. Taking vitamin A along with warfarin can increase the chances of bruising and bleeding. Be sure to have your blood checked regularly. The dose of your warfarin might need to be changed.',
                },
            ],
        },
    ],
    dosing: 'Vitamin A is an important nutrient. It is found in many foods, including fruits, vegetables, eggs, whole milk, meat, and fish. The amount that should be consumed on a daily basis is called the recommended dietary allowance (RDA). The RDA is 900 mcg daily for males and 700 mcg daily for females. While pregnant, the RDA is 770 mcg daily. While breast-feeding, the RDA is 1300 mcg daily. In children, the RDA depends on age.<br><br>',
};

const cx = classNames.bind(style);
const switchButton = [
    {
        eventKey: 'details',
        name: 'Details',
    },
    {
        eventKey: 'fruits&drugs',
        name: 'Fruits & Drugs',
    },
];
function Supplement() {
    const [activeId, setActiveId] = useState(0);

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
                        <FruitDrugList />
                    </TabPane>
                </Tab.Content>
            </Tab.Container>
        </ProductLayout>
    );
}

export default Supplement;
