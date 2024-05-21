import Header from '~/layouts/components/Header';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function DrugDetail() {
    const { product }  = useLocation().state;
    return (
        <Container className="d-flex flex-column" style={{ gap: '16px' }}>
            <Header showBackButton={true} to={''} pageNumb={1} />
            <iframe
                src={product.url}
                style={{ width: '100%', height: '90vh', border: 'none', marginTop: '16px' }}
                loading='lazy'
            ></iframe>
        </Container>
    )
}

export default DrugDetail;