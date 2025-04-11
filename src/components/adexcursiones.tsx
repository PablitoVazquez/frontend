import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './adNavbar';
import { genericRequest } from "../utils/genericRequest";
import { Excursion } from '../interfaces/Excursion';

interface ModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  formData: Excursion;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onSave, formData, onChange }) => (
  <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {[
            ['nombre', 'Nombre'],
            ['descripcion', 'Descripción'],
            ['destino', 'Destino'],
            ['precio_adulto', 'Precio Adulto'],
            ['precio_nino', 'Precio Niño'],
            ['capacidad_maxima', 'Capacidad Máxima'],
            ['cupos_disponibles', 'Cupos Disponibles'],
            ['fecha_salida', 'Fecha Salida'],
            ['fecha_regreso', 'Fecha Regreso'],
            ['imagen_url', 'Imagen (URL)']
          ].map(([key, label]) => (
            <div className="mb-3" key={key}>
              <label className="form-label">{label}</label>
              <input
                type={key.includes('fecha') ? 'date' : key.includes('precio') || key.includes('capacidad') || key.includes('cupos') ? 'number' : 'text'}
                className="form-control"
                name={key}
                value={(formData as any)[key]}
                onChange={onChange}
              />
            </div>
          ))}
          {formData.imagen_url && (
            <div className="mb-3 text-center">
              <img src={formData.imagen_url} alt="Vista previa" className="img-fluid rounded" style={{ maxHeight: '200px' }} />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          <button type="button" className="btn btn-primary" onClick={onSave}>Guardar</button>
        </div>
      </div>
    </div>
  </div>
);

const Excursiones: React.FC = () => {
  const [excursiones, setExcursiones] = useState<Excursion[]>([]);
  const [allExcursiones, setAllExcursiones] = useState<Excursion[]>([]);
  const [searchId, setSearchId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<Excursion | null>(null);
  const [formData, setFormData] = useState<Excursion>({
    id_excursion: 0,
    nombre: '',
    descripcion: '',
    destino: '',
    precio_adulto: 0,
    precio_nino: 0,
    capacidad_maxima: 0,
    cupos_disponibles: 0,
    fecha_salida: '',
    fecha_regreso: '',
    imagen_url: ''
  });

  const fetchExcursiones = async () => {
    try {
      const data = await genericRequest('/api/excursiones', 'GET');
      setExcursiones(data);
      setAllExcursiones(data); // copia para búsqueda
    } catch {
      console.error('Error al cargar las excursiones');
    }
  };

  useEffect(() => {
    fetchExcursiones();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await genericRequest(`/api/excursiones/${id}`, 'DELETE', undefined, true);
      setExcursiones(prev => prev.filter(e => e.id_excursion !== id));
      setAllExcursiones(prev => prev.filter(e => e.id_excursion !== id));
    } catch {
      alert('Error al eliminar la excursión');
    }
  };

  const handlePut = async (id: number, data: Excursion) => {
    try {
      await genericRequest(`/api/excursiones/${id}`, 'PUT', data, true);
      fetchExcursiones();
      setModalData(null);
    } catch {
      console.error('Error al actualizar');
    }
  };

  const handleAdd = async () => {
    try {
      const newExc = await genericRequest('/api/excursiones/agregar', 'POST', formData, true);
      setExcursiones(prev => [...prev, newExc]);
      setAllExcursiones(prev => [...prev, newExc]);
      setModalData(null);
    } catch {
      alert('Error al agregar');
    }
  };

  const handleSearch = () => {
    if (searchId) {
      const result = allExcursiones.filter(e => e.id_excursion === searchId);
      setExcursiones(result.length ? result : []);
    } else {
      setExcursiones(allExcursiones);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('precio') || name.includes('capacidad') || name.includes('cupos') ? Number(value) : value
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-primary text-center mb-4">Excursiones</h1>

        <div className="mb-4 d-flex justify-content-center gap-2">
          <input
            type="number"
            className="form-control w-25"
            value={searchId || ''}
            onChange={(e) => setSearchId(Number(e.target.value))}
            placeholder="Buscar por ID"
          />
          <button className="btn btn-outline-primary" onClick={handleSearch}>Buscar</button>
          <button className="btn btn-success" onClick={() => {
            const empty = {
              id_excursion: 0,
              nombre: '',
              descripcion: '',
              destino: '',
              precio_adulto: 0,
              precio_nino: 0,
              capacidad_maxima: 0,
              cupos_disponibles: 0,
              fecha_salida: '',
              fecha_regreso: '',
              imagen_url: ''
            };
            console.log(empty);
            setFormData(empty);
            setModalData(empty);
          }}>+ Nueva Excursión</button>
        </div>

        <div className="row">
          {excursiones.map((e) => (
            <div className="col-md-6 col-lg-4 mb-4" key={e.id_excursion}>
              <div className="card shadow-sm h-100">
                {e.imagen_url && <img src={e.imagen_url} className="card-img-top" alt={e.nombre} />}
                <div className="card-body">
                  <h5 className="card-title text-primary">{e.nombre}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{e.destino}</h6>
                  <p className="card-text">{e.descripcion}</p>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">Precio Adulto: ${e.precio_adulto}</li>
                    <li className="list-group-item">Precio Niño: ${e.precio_nino}</li>
                    <li className="list-group-item">Capacidad: {e.capacidad_maxima}</li>
                    <li className="list-group-item">Cupos disponibles: {e.cupos_disponibles}</li>
                    <li className="list-group-item">Salida: {e.fecha_salida}</li>
                    <li className="list-group-item">Regreso: {e.fecha_regreso}</li>
                    <li className="list-group-item">URL: {e.imagen_url}</li>
                  </ul>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-warning" onClick={() => {
                      setFormData(e);
                      setModalData(e);
                    }}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(e.id_excursion)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalData && (
          <Modal
            title={modalData.id_excursion === 0 ? 'Agregar Excursión' : 'Editar Excursión'}
            onClose={() => setModalData(null)}
            onSave={modalData.id_excursion === 0 ? handleAdd : () => handlePut(modalData.id_excursion, formData)}
            formData={formData}
            onChange={handleFormChange}
          />
        )}
      </div>
    </div>
  );
};

export default Excursiones;
