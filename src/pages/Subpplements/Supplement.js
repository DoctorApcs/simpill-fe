import classNames from 'classnames/bind';
import style from './Supplement.module.scss';

import { Container, Nav, Tab, TabPane } from 'react-bootstrap';
import images from '~/assets/images';
import InfoTag from '~/components/InfoTag';
import { useState } from 'react';
import FruitsDrugs from '~/pages/Fruits&Drugs';

const supplement = {
    name: 'VITAMIN A',
    overview:
        'Vitamin A is a fat-soluble vitamin. Its different forms are often called retinoids. They include retinol, retinal, retinoic acid, and retinyl ester. Vitamin A is needed for the proper growth and functioning of many parts of the body, including the eyes, skin, and immune system. It can be found in many foods, including fruits, vegetables, and fish. Carotenoids are a group of chemicals found in plants. Some can be converted to vitamin A in the body. People most commonly use vitamin A for treating vitamin A deficiency. It is also used for aging skin, acne, HIV/AIDS, cataracts, child development, infections, and many other conditions.',
    uses: "Effective for Vitamin A deficiency. Taking vitamin A by mouth is effective for preventing and treating vitamin A deficiency. Possibly Effective for Aging skin. Applying vitamin A (retinol) on the skin improves skin color, flexibility, and wrinkles in people with aging skin. It isn't clear whether non-prescription retinol works as well as prescription products such as tretinoin (Renova). A lung disease that affects newborns (bronchopulmonary dysplasia). Giving vitamin A as a shot seems to reduce the risk of this lung disease in infants born with a low birth weight. Vitamin A shots can only be given by a healthcare provider. It isn't clear whether giving vitamin A by mouth is helpful. Diarrhea. Giving vitamin A by mouth to young children who are at risk of vitamin A deficiency seems to prevent diarrhea. It isn't clear whether taking vitamin A while breastfeeding can help to prevent diarrhea in the nursing infant. Measles. Taking vitamin A by mouth seems to reduce the risk of measles, its complications, and death in young children with vitamin A deficiency. Ability to see in low-light conditions. Taking vitamin A by mouth during pregnancy seems to reduce night blindness by 37% in malnourished adults. Vitamin A might work better for this condition when taken with zinc. White patches inside the mouth that are usually caused by smoking (oral leukoplakia). Taking high-dose vitamin A by mouth can help treat these lesions. Death from any cause. Taking high-dose vitamin A by mouth reduces the risk of death in children under 5 years of age who are at risk for vitamin A deficiency. Taking vitamin A doesn't seem to reduce the risk of death in healthy adults. Complications after childbirth. Taking vitamin A by mouth before, during, and after pregnancy reduces diarrhea and the risk of death after giving birth in malnourished adults. An inherited eye condition that causes poor night vision and loss of side vision (retinitis pigmentosa). Taking vitamin A by mouth can slow the progression of an eye disease that causes damage to the retina. A type of inflammatory bowel disease (ulcerative colitis). Taking vitamin A by mouth daily for 2 months can reduce symptoms in adults with ulcerative colitis. Skin wrinkles from sun damage. Applying non-prescription vitamin A (retinol) serum to the skin improves skin smoothness and wrinkles in females with sun-damaged skin. It might work as well as the prescription products that are approved by the FDA for treating skin wrinkles, such as tretinoin (Renova). Possibly Ineffective for Prone to allergies and allergic reactions (atopic disease). Giving a single dose of vitamin A by mouth to infants does not seem to prevent atopy. Death of an unborn or premature baby. Taking vitamin A by mouth before, during, or after pregnancy does not seem to prevent infant death during the first year of life. Also giving vitamin A by mouth directly to infants doesn't seem to prevent infant death. Infection of the intestines by parasites. Giving a single dose of vitamin A by mouth to children taking medicine to treat intestinal parasites doesn't seem to prevent reinfection. The most serious type of skin cancer (melanoma). Taking a high dose of vitamin A by mouth doesn't seem to improve survival in people with melanoma. Miscarriage. Taking vitamin A by mouth, alone or in combination with other vitamins, before or during early pregnancy doesn't reduce the risk of miscarriage or stillbirth. Blood infection (sepsis). Giving vitamin A to premature infants doesn't seem to prevent sepsis. Tuberculosis. Taking vitamin A by mouth doesn't seem to improve symptoms or decrease the risk of death in people with this condition. Likely InEffective for Head and neck cancer. Taking vitamin A by mouth does not reduce the risk of developing new tumors or improve survival in people with head and neck cancer. HIV transmission. Taking vitamin A by mouth does not lower the risk of passing HIV to the fetus during pregnancy, to newborns during delivery, or to infants during breastfeeding. Taking vitamin A supplements during pregnancy might actually increase the risk of passing HIV to babies through breast milk. Infection of the lower airways. Taking vitamin A by mouth does not prevent or reduce symptoms of lower airway infections in children. Also, taking vitamin A while breast-feeding does not seem to prevent these infections in nursing infants. There is interest in using vitamin A for a number of other purposes, but there isn't enough reliable information to say whether it might be helpful.",
    side_effects:
        'When taken by mouth: Vitamin A is likely safe when taken in amounts less than 10,000 units (3,000 mcg) daily. Vitamin A is available in two forms: pre-formed vitamin A (retinol or retinyl ester) and provitamin A (carotenoids). The maximum daily dose relates to only pre-formed vitamin A. Pre-formed vitamin A is possibly unsafe when taken in doses greater than 10,000 units (3,000 mcg) daily. Higher doses might increase the risk of side effects. Long-term use of large amounts might cause serious side effects including mental changes. When applied to the skin: Vitamin A is possibly safe when used short-term. Retinol 0.5% serum has been used daily for up to 12 weeks without serious side effects.',
    precautions:
        "When taken by mouth: Vitamin A is likely safe when taken in amounts less than 10,000 units (3,000 mcg) daily. Vitamin A is available in two forms: pre-formed vitamin A (retinol or retinyl ester) and provitamin A (carotenoids). The maximum daily dose relates to only pre-formed vitamin A. Pre-formed vitamin A is possibly unsafe when taken in doses greater than 10,000 units (3,000 mcg) daily. Higher doses might increase the risk of side effects. Long-term use of large amounts might cause serious side effects including mental changes. When applied to the skin: Vitamin A is possibly safe when used short-term. Retinol 0.5% serum has been used daily for up to 12 weeks without serious side effects. Pregnancy and breast-feeding: Vitamin A is likely safe when taken in recommended amounts of less than 10,000 units (3,000 mcg) of pre-formed vitamin A daily. Larger amounts are possibly unsafe and can cause birth defects. Monitor vitamin A intake from all sources during the first three months of pregnancy. Forms of vitamin A are found in several foods including animal liver, some fortified breakfast cereals, and dietary supplements. Children: Vitamin A is likely safe when taken in the recommended amounts. The maximum amounts of vitamin A that are safe for children are based on age. Vitamin A is possibly unsafe for children when taken by mouth in high doses. Taking high doses can cause side effects, including irritability, sleepiness, diarrhea, and other problems. Excessive use of alcohol: Drinking alcohol might increase vitamin A's potentially harmful effects on the liver. Disorders in which the body does not absorb fat properly: People with conditions that affect fat absorption are not able to absorb vitamin A properly. These conditions include celiac disease, short gut syndrome, jaundice, cystic fibrosis, pancreatic disease, and cirrhosis of the liver. If you have one of these conditions, take water-soluble forms of vitamin A, called carotenoids, instead. Iron deficiency: Iron deficiency might affect the body's ability to use vitamin A. Liver disease: Too much vitamin A might make liver disease worse. Do not take vitamin A supplements if you have liver disease. Malnutrition: In people with severe protein malnutrition, taking vitamin A supplements might result in having too much vitamin A in the body. Zinc deficiency: Zinc deficiency might cause symptoms of vitamin A deficiency. Taking a combination of vitamin A and zinc supplements might be necessary to improve this condition.",
    interactions:
        'Major Interaction Do not take this combination Medications for skin conditions (Retinoids) interacts with VITAMIN ASome medications for skin conditions are made from vitamin A. Taking vitamin A and these medications together could cause toxic effects.Moderate Interaction Be cautious with this combination Antibiotics (Tetracycline antibiotics) interacts with VITAMIN ATaking very large amounts of vitamin A along with tetracyclines can increase the chance of a serious side effect called intracranial hypertension. But taking normal doses of vitamin A along with tetracyclines does not seem to cause this problem. Do not take large amounts of vitamin A if you are taking antibiotics.Medications that can harm the liver (Hepatotoxic drugs) interacts with VITAMIN ATaking large amounts of vitamin A might harm the liver. Some medications can also harm the liver. Taking high doses of vitamin A along with a medication that can harm the liver might increase the risk of liver damage.Warfarin (Coumadin) interacts with VITAMIN AWarfarin is used to slow blood clotting. Large amounts of vitamin A can also slow blood clotting. Taking vitamin A along with warfarin can increase the chances of bruising and bleeding. Be sure to have your blood checked regularly. The dose of your warfarin might need to be changed.',
    dosing: 'Vitamin A is an important nutrient. It is found in many foods, including fruits, vegetables, eggs, whole milk, meat, and fish. The amount that should be consumed on a daily basis is called the recommended dietary allowance (RDA). The RDA is 900 mcg daily for males and 700 mcg daily for females. While pregnant, the RDA is 770 mcg daily. While breast-feeding, the RDA is 1300 mcg daily. In children, the RDA depends on age. In supplements, vitamin A is available in two forms: pre-formed vitamin A (retinol or retinyl ester) and provitamin A (carotenoids). For products that contain both, only count the amount of pre-formed vitamin A to determine what is safe. Vitamin A is also available in many topical products, including creams, serums, and lotions. Speak with a healthcare provider to find out what type of product and dose might be best for a specific condition.',
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

    const handleSelect = () => {
        setActiveId((prev) => 1 - prev);
    };

    return (
        <Container className={'d-flex flex-column'} style={{ gap: '32px' }}>
            <Tab.Container activeKey={activeId} onSelect={handleSelect}>
                <div className={cx('thumbnail')}>
                    <img className={cx('thumbnail-img')} src={images.supplement} alt="supplement" />
                    <div className={cx('shadow')}></div>
                    <h1 className={cx('title')}>{supplement.name}</h1>
                </div>
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
                            <InfoTag title="Overview" content={supplement.overview} />
                            <InfoTag title="Uses" content={supplement.uses} />
                            <InfoTag title="Side Effects" content={supplement.side_effects} />
                            <InfoTag title="Precautions" content={supplement.precautions} />
                            <InfoTag title="Interactions" content={supplement.interactions} />
                            <InfoTag title="Dosing" content={supplement.dosing} />
                        </div>
                    </Tab.Pane>
                    <TabPane eventKey={1}>
                        <FruitsDrugs />
                    </TabPane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
}

export default Supplement;
