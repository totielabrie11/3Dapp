import React, { useState, useEffect } from 'react';
import './ProductFilter.css';

const ProductFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    tipoBomba: '',
    tipoAplicacion: '',
    tipoIndustria: '',
    tipoBombaDosificadora: '',
    subTipoBombaDosificadora: '',
    marcaBomba: '',
    tipoAccionamiento: '',
    // presionMin: 0, // Inicializar en un valor adecuado
    // presionMax: 10, // Inicializar en un valor adecuado
    // caudalMin: 30, // Inicializar en 30
    // caudalMax: 1800, // Inicializar en 1800 o un valor máximo adecuado
  });

  // const [singlePressure, setSinglePressure] = useState(0); // Estado para la presión única de soplador
  const [tipoProductoOptions, setTipoProductoOptions] = useState([]);
  const [aplicacionOptions, setAplicacionOptions] = useState([]);
  const [allAplicacionOptions, setAllAplicacionOptions] = useState([]);
  const [tipoIndustriaOptions, setTipoIndustriaOptions] = useState([]);
  const [subTipoBombaDosificadoraOptions, setSubTipoBombaDosificadoraOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  /*
  const handleRangeChange = (e, name) => {
    const value = Number(e.target.value);
    if (filters.tipoBomba === 'soplador' && name === 'singlePressure') {
      setSinglePressure(value);
    } else {
      if (name === 'caudalMin') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          caudalMin: value,
          caudalMax: Math.max(value, prevFilters.caudalMax), // Asegurar que caudalMax no sea menor que caudalMin
        }));
      } else if (name === 'caudalMax') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          caudalMax: value,
        }));
      } else if (name === 'presionMin') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          presionMin: value,
          presionMax: Math.max(value, prevFilters.presionMax), // Asegurar que presionMax no sea menor que presionMin
        }));
      } else if (name === 'presionMax') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          presionMax: value,
        }));
      } else {
        setFilters({ ...filters, [name]: value });
      }
    }
  };
  */

  const fetchProductos = async () => {
    try {
      const response = await fetch('/api/product-descriptions');
      const data = await response.json();
      const tiposDeProducto = new Set();
      const tiposDeAplicacion = new Set();
      const tiposDeIndustria = new Set();
      data.forEach(product => {
        if (Array.isArray(product.caracteristicas)) {
          product.caracteristicas.forEach(caracteristica => {
            const tipoMatch = caracteristica.match(/Tipo de Producto: (.*)/i);
            if (tipoMatch) {
              const tipo = tipoMatch[1].trim();
              tiposDeProducto.add(tipo);
            }
            const aplicacionMatch = caracteristica.match(/Aplicación: (.*)/i);
            if (aplicacionMatch) {
              const aplicacion = aplicacionMatch[1].trim();
              tiposDeAplicacion.add(aplicacion);
            }
            const industriaMatch = caracteristica.match(/Industria: (.*)/i);
            if (industriaMatch) {
              const industria = industriaMatch[1].trim();
              tiposDeIndustria.add(industria);
            }
          });
        }
      });
      setTipoProductoOptions([...tiposDeProducto]);
      setAllAplicacionOptions([...tiposDeAplicacion]);
      setAplicacionOptions([...tiposDeAplicacion]);
      setTipoIndustriaOptions([...tiposDeIndustria]);
    } catch (error) {
      console.error('Failed to fetch product descriptions:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    const updateAplicacionOptions = () => {
      if (filters.tipoBomba === 'Bomba de vacío') {
        setAplicacionOptions(['Refrigeración', 'Vacío industrial']);
      } else if (filters.tipoBomba === 'soplador') {
        setAplicacionOptions(allAplicacionOptions.filter(option => !['Refrigeración', 'Vacío industrial'].includes(option)));
      } else if (filters.tipoBomba === 'Bomba Dosificadora') {
        setAplicacionOptions(allAplicacionOptions.filter(option => !['Refrigeración', 'Vacío industrial'].includes(option)));
      } else {
        setAplicacionOptions(allAplicacionOptions);
      }
    };

    if (allAplicacionOptions && Array.isArray(allAplicacionOptions)) {
      updateAplicacionOptions();
    }
  }, [filters.tipoBomba, allAplicacionOptions]);

  useEffect(() => {
    const updateSubTipoBombaDosificadoraOptions = () => {
      if (filters.tipoBombaDosificadora === 'Electromagnética') {
        setSubTipoBombaDosificadoraOptions(['EMD', 'EMD-PLUS', 'MI-EMD', 'EMD MAX']);
      } else if (filters.tipoBombaDosificadora === 'Diafragma') {
        setSubTipoBombaDosificadoraOptions(['DDI', 'DDI DUPLEX', 'DAN', 'DAN DUPLEX']);
      } else if (filters.tipoBombaDosificadora === 'Pistón') {
        setSubTipoBombaDosificadoraOptions(['DECI', 'DE', 'DEAP', 'DES', 'DENG', 'DEON']);
      } else {
        setSubTipoBombaDosificadoraOptions([]);
      }
    };

    updateSubTipoBombaDosificadoraOptions();
  }, [filters.tipoBombaDosificadora]);

  useEffect(() => {
    // if (filters.tipoBomba === 'soplador') {
    //   onFilter({ ...filters, singlePressure });
    // } else {
      onFilter(filters);
    // }
  }, [filters, /*singlePressure,*/ onFilter]);

  return (
    <div className="product-filter">
      <h2>Filtrar por:</h2>
      <div className="filter-section">
        <label>Tipo de Producto</label>
        <select name="tipoBomba" onChange={handleChange}>
          <option value="">Seleccionar</option>
          {tipoProductoOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label>Para Sistemas</label>
        <select name="tipoAplicacion" onChange={handleChange}>
          <option value="">Seleccionar</option>
          {aplicacionOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label>Campo de Aplicación</label>
        <select name="tipoIndustria" onChange={handleChange}>
          <option value="">Seleccionar</option>
          {tipoIndustriaOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {filters.tipoBomba === 'Dosificadora' && (
        <div className="filter-section">
          <label>Tipo de Accionamiento</label>
          <select name="tipoAccionamiento" onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Eléctrico solar">Eléctrico solar</option>
            <option value="A Palanca">A Palanca</option>
            <option value="Neumático">Neumático</option>
          </select>
        </div>
      )}
      {filters.tipoBomba === 'Dosificadora' && (
        <>
          <div className="filter-section">
            <label>Tipo de Bomba Dosificadora</label>
            <select name="tipoBombaDosificadora" onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Electromagnética">Electromagnética</option>
              <option value="Diafragma">Diafragma</option>
              <option value="Pistón">Pistón</option>
            </select>
          </div>
          {filters.tipoBombaDosificadora && (
            <div className="filter-section">
              <label>Sub Tipo de Bomba Dosificadora</label>
              <select name="subTipoBombaDosificadora" onChange={handleChange}>
                <option value="">Seleccionar</option>
                {subTipoBombaDosificadoraOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
      {/* {filters.tipoBomba === 'soplador' ? (
        <>
          <div className="filter-section">
            <label>Presión mbar, sistema</label>
            <div className="range-inputs">
              <input
                type="range"
                name="singlePressure"
                min="0"
                max="800"
                value={singlePressure}
                onChange={(e) => handleRangeChange(e, 'singlePressure')}
              />
              <input
                type="number"
                value={singlePressure}
                onChange={(e) => handleRangeChange(e, 'singlePressure')}
              />
            </div>
          </div>
          <div className="filter-section">
            <label>Caudal (m³/h) entre</label>
            <div className="range-inputs">
              <input
                type="range"
                name="caudalMin"
                min="30" // Establecer el mínimo en 30
                max="1800"
                value={filters.caudalMin}
                onChange={(e) => handleRangeChange(e, 'caudalMin')}
              />
              <input
                type="number"
                min="30" // Establecer el mínimo en 30
                value={filters.caudalMin}
                onChange={(e) => handleRangeChange(e, 'caudalMin')}
              />
              <input
                type="number"
                min={filters.caudalMin} // Establecer el mínimo del máximo en el valor de caudalMin
                value={filters.caudalMax}
                onChange={(e) => handleRangeChange(e, 'caudalMax')}
              />
              <input
                type="range"
                name="caudalMax"
                min={filters.caudalMin} // Establecer el mínimo en el valor actual de caudalMin
                max="1800"
                value={filters.caudalMax}
                onChange={(e) => handleRangeChange(e, 'caudalMax')}
              />
            </div>
          </div>
        </>
      ) : (
        filters.tipoBomba === 'Dosificadora' && (
          <>
            <div className="filter-section">
              <label>Contrapresión en sistema (kg/cm²)</label>
              <div className="range-inputs">
                <input
                  type="range"
                  name="presionMin"
                  min="0"
                  max="600"
                  value={filters.presionMin}
                  onChange={(e) => handleRangeChange(e, 'presionMin')}
                />
                <input
                  type="number"
                  min="0"
                  value={filters.presionMin}
                  onChange={(e) => handleRangeChange(e, 'presionMin')}
                />
                <input
                  type="number"
                  min={filters.presionMin} // Establecer el mínimo del máximo en el valor de presionMin
                  value={filters.presionMax}
                  onChange={(e) => handleRangeChange(e, 'presionMax')}
                />
                <input
                  type="range"
                  name="presionMax"
                  min={filters.presionMin} // Establecer el mínimo en el valor actual de presionMin
                  max="600"
                  value={filters.presionMax}
                  onChange={(e) => handleRangeChange(e, 'presionMax')}
                />
              </div>
            </div>
            <div className="filter-section">
              <label>Caudal (lts/h) entre</label>
              <div className="range-inputs">
                <input
                  type="range"
                  name="caudalMin"
                  min="0"
                  max="1800"
                  value={filters.caudalMin}
                  onChange={(e) => handleRangeChange(e, 'caudalMin')}
                />
                <input
                  type="number"
                  value={filters.caudalMin}
                  onChange={(e) => handleRangeChange(e, 'caudalMin')}
                />
                <input
                  type="number"
                  value={filters.caudalMax}
                  onChange={(e) => handleRangeChange(e, 'caudalMax')}
                />
                <input
                  type="range"
                  name="caudalMax"
                  min="0"
                  max="1800"
                  value={filters.caudalMax}
                  onChange={(e) => handleRangeChange(e, 'caudalMax')}
                />
              </div>
            </div>
          </>
        )
      )} */}
    </div>
  );
};

export default ProductFilter;
