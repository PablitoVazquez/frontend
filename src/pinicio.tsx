import React from "react";
import "./pinicio.css";


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Adventure Tours</h1>
      <ul className="nav-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Destinos</a></li>
        <li><a href="#">Reservaciones</a></li>
        <li><a href="#">Sobre Nosotros</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
      <button className="login-button" onClick={() => window.location.href = "inicio.tsx"}>
        Iniciar Sesión
      </button>
    </nav>
  );
};

const SearchBar: React.FC = () => {
  return (
    <section className="search-bar">
      <h2>Encuentra tu próxima aventura</h2>
      <div className="search-fields">
        <input type="text" placeholder="Origen" />
        <input type="text" placeholder="Destino" />
        <input type="date" />
        <input type="date" />
      </div>
      <button className="search-button">Buscar</button>
    </section>
  );
};

const Categories: React.FC = () => {
  const categories = ["Playa", "Montaña", "Cultura", "Aventura", "Relax", "Gastronomía"];
  return (
    <section className="categories">
      {categories.map((category, index) => (
        <button key={index} className="category-button">{category}</button>
      ))}
    </section>
  );
};

const Excursion: React.FC<{ imgSrc: string; title: string; rating: string; link: string }> = ({ imgSrc, title, rating, link }) => {
  return (
    <div className="excursion">
      <img src={imgSrc} alt={title} className="excursion-img" />
      <h3>{title}</h3>
      <p>⭐ {rating}</p>
      <button className="reserve-button" onClick={() => window.location.href = link}>
        Ver más
      </button>
    </div>
  );
};

const Excursions: React.FC = () => {
  const excursionList = [
    { imgSrc: "img/xcaret.jpg", title: "Xcaret", rating: "4.5", link: "destino_xcaret.html" },
    { imgSrc: "img/chichen.jpg", title: "Chichen Itzá", rating: "4.7", link: "destino_chichen.html" },
    { imgSrc: "img/islamujeres.jpg", title: "Isla Mujeres", rating: "4.8", link: "destino_islamujeres.html" }
  ];
  return (
    <section className="excursions">
      <h2 className="section-title">Destinos Populares</h2>
      <div className="excursions-container">
        {excursionList.map((excursion, index) => (
          <Excursion key={index} {...excursion} />
        ))}
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Adventure Tours - Todos los derechos reservados.</p>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Categories />
      <Excursions />
      <Footer />
    </div>
  );
};

export default App;
