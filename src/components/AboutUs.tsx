import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Adventure Tours - Todos los derechos reservados.</p>
    </footer>
  );
}

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Container className="about-us mt-5">
        {/* Sección de Introducción */}
        <Row className="mb-5 text-center">
          <Col>
            <h1 className="fw-bold">Sobre Nosotros</h1>
            <p className="text-muted">
              Descubre quiénes somos y nuestra pasión por brindarte las mejores experiencias en excursiones inolvidables.
            </p>
          </Col>
        </Row>

        {/* Sección de Misión y Visión */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <img 
              src="https://images.odigoo.com/df4f9331-8c0a-43c6-aef6-7eaf225fea60/images/destinations/cancun/categories/playas/webp/meta-playas-38xp.webp" 
              alt="Misión" 
              className="img-fluid rounded shadow-lg" 
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold">Nuestra Misión</h2>
            <p>
              Ofrecer experiencias únicas y seguras a nuestros viajeros, conectándolos con la naturaleza, la cultura y la aventura.
            </p>
            <h2 className="fw-bold mt-4">Nuestra Visión</h2>
            <p>
              Ser la agencia de excursiones líder en Latinoamérica, destacando por nuestro compromiso con la sostenibilidad y la calidad.
            </p>
          </Col>
        </Row>

        {/* Sección de Valores */}
        <Row className="text-center mb-5">
          <h2 className="fw-bold mb-4">Nuestros Valores</h2>
          {[
            { title: "Compromiso", text: "Nos esforzamos por ofrecer experiencias seguras y memorables." },
            { title: "Sostenibilidad", text: "Promovemos el turismo responsable y el cuidado del medio ambiente." },
            { title: "Pasión", text: "Aventuras diseñadas con amor y dedicación para cada viajero." },
          ].map((value, index) => (
            <Col md={4} key={index}>
              <Card className="p-3 shadow">
                <Card.Body>
                  <h5 className="fw-bold">{value.title}</h5>
                  <p>{value.text}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Sección del Equipo */}
        <Row className="text-center">
          <h2 className="fw-bold mb-4">Nuestro Equipo</h2>
          {[
            { name: "Arturo Landerp", role: "Fundador & CEO", img: "https://i.pinimg.com/736x/15/79/6d/15796d466bf8be86af9c6a9219d87b0d.jpg", profileUrl: "https://www.instagram.com/kevinarturo22/" },
            { name: "Jesus Farfan", role: "Directora de Marketing", img: "https://media.tenor.com/MMAUV6okFckAAAAM/aa.gif", profileUrl: "https://www.instagram.com/jesus_farfan_/" },
            { name: "Jose Uscanga", role: "Coordinador de Guías", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_PFR95IMHjrbDknyB-qoRfp-xSya5g7x5sw&s", profileUrl: "https://www.instagram.com/uskngx/" },
            { name: "Pablo Vazquez", role: "Fundador & CEO", img: "https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/10/07/615efe5f2c753.r_d.1100-951-5650.jpeg", profileUrl: "https://www.instagram.com/pabliito0_o/" },
          ].map((member, index) => (
            <Col md={3} key={index}>
              <Card className="shadow">
                <Card.Img variant="top" src={member.img} />
                <Card.Body>
                  <h5 className="fw-bold">{member.name}</h5>
                  <p>{member.role}</p>
                  <Link to={member.profileUrl}>
                    <Button variant="primary">Ver perfil</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;
