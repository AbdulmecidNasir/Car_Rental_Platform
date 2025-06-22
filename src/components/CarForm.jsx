import { useState } from 'react';
import { Car } from '../models/Car.jsx';

function CarForm({ onAddCar }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    chassisNumber: '',
    color: '',
    enginePower: '',
    transmission: 'automatic' // Default value
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.brand.trim()) {
      newErrors.brand = 'Marka alanı zorunludur';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model alanı zorunludur';
    }
    
    if (!formData.chassisNumber.trim()) {
      newErrors.chassisNumber = 'Şasi numarası zorunludur';
    }
    
    if (!formData.color.trim()) {
      newErrors.color = 'Renk alanı zorunludur';
    }
    
    if (!formData.enginePower.trim()) {
      newErrors.enginePower = 'Motor gücü zorunludur';
    } else if (isNaN(formData.enginePower) || parseFloat(formData.enginePower) <= 0) {
      newErrors.enginePower = 'Geçerli bir motor gücü giriniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const car = new Car(
      null, // id will be assigned in the DataService
      formData.brand,
      formData.model,
      formData.chassisNumber,
      formData.color,
      parseInt(formData.enginePower, 10),
      formData.transmission
    );
    
    onAddCar(car);
    
    // Reset form
    setFormData({
      brand: '',
      model: '',
      chassisNumber: '',
      color: '',
      enginePower: '',
      transmission: 'automatic'
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Yeni Araç Ekle</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marka
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şasi Numarası
              <input
                type="text"
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.chassisNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.chassisNumber && <p className="mt-1 text-sm text-red-600">{errors.chassisNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Renk
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.color ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Motor Gücü (HP)
              <input
                type="number"
                name="enginePower"
                value={formData.enginePower}
                onChange={handleChange}
                min="1"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.enginePower ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.enginePower && <p className="mt-1 text-sm text-red-600">{errors.enginePower}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vites Tipi
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="automatic">Otomatik</option>
                <option value="manual">Manuel</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Araç Ekle
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarForm;