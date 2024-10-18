import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Card, Button, Form, Badge } from 'react-bootstrap';
import mascotasService from '../../services/mascotasService';
import { BsPlus, BsSearch } from 'react-icons/bs';
import NavBar from '../NavBar';

const HomeProtectora = () => {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['Gato', 'Perro', 'Hamster', 'Conejo'];

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await mascotasService.getMascotas();
                setMascotas(response);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar las mascotas. Por favor, intenta de nuevo.', err);
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []);


    if (loading) return (
        <Container className="text-center my-5">
            <Spinner animation="border" variant="primary" />
        </Container>
    );

    console.log("MASCOTAS: ", loading, mascotas)
    return (
        <Container>
            <NavBar />
            <Container>
                <Row className="justify-content-between align-items-center my-3">
                    <Col xs={9}>
                        <Form.Control type="text" placeholder="Nombre; estado, protectora y sexo" />
                    </Col>
                    <Col xs={1}>
                        <Button variant="outline-primary">
                            <BsSearch />
                        </Button>
                    </Col>
                </Row>

                <Row className="my-3">
                    <Col>
                        <h5>Categorías</h5>
                        <div className="d-flex flex-wrap">
                            {categories.map((category, index) => (
                                <Button key={index} variant="light" className="mx-1 my-1">
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </Col>
                </Row>

                <Row className="my-3">
                    <Col>
                        <h5>Animales</h5>
                        <Row>
                            {mascotas.length > 0 ? (
                                mascotas.map((animal, index) => (
                                    <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                                        <Card>
                                            <Card.Img variant="top" src={animal.fotos[0]} alt={animal.nombre} />
                                            <Card.Body>
                                                <Card.Title>{animal.nombre}</Card.Title>
                                                <Card.Text>
                                                    <span className="text-muted">{animal.ciudad}</span>
                                                    <br />
                                                    <Badge bg={animal.sexo === 'Macho' ? 'primary' : 'pink'}>
                                                        {animal.sexo === 'Macho' ? '♂' : '♀'}
                                                    </Badge>
                                                </Card.Text>
                                                <Button variant="outline-warning">
                                                    <BsPlus /> Editar
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>No hay animales registrados actualmente</p>
                            )}
                        </Row>
                    </Col>
                </Row>

                <Button variant="warning" className="rounded-circle position-fixed" style={{ bottom: '20px', right: '20px' }}>
                    <BsPlus size={25} />
                </Button>
            </Container>
        </Container>
    );
};

export default HomeProtectora;
