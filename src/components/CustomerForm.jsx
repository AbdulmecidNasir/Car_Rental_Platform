import { useState } from 'react';
import { Customer } from '../models/Customer.jsx';

function CustomerForm({ onAddCustomer }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    identityNumber: '',
    address: '',
    phoneNumber: '',
    income: ''
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad alanı zorunludur';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad alanı zorunludur';
    }
    
    if (!formData.identityNumber.trim()) {
      newErrors.identityNumber = 'TC kimlik numarası zorunludur';
    } else if (!/^\d{11}$/.test(formData.identityNumber)) {
      newErrors.identityNumber = 'TC kimlik numarası 11 haneli olmalıdır';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Telefon numarası zorunludur';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const customer = new Customer(
      null, // id will be assigned in the DataService
      formData.firstName,
      formData.lastName,
      formData.identityNumber,
      formData.address,
      formData.phoneNumber,
      parseFloat(formData.income) || 0
    );
    
    onAddCustomer(customer);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      identityNumber: '',
      address: '',
      phoneNumber: '',
      income: ''
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Yeni Müşteri Ekle</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Soyad
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              TC Kimlik No
              <input
                type="text"
                name="identityNumber"
                value={formData.identityNumber}
                onChange={handleChange}
                maxLength="11"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.identityNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.identityNumber && <p className="mt-1 text-sm text-red-600">{errors.identityNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefon No
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
            </label>
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Adres
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aylık Gelir (₺)
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Müşteri Ekle
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;