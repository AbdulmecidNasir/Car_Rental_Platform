import { useState, useEffect } from 'react';
import { Rental } from '../models/Rental.jsx';
import { isDateRangeOverlapping } from '../utils/dateUtils';

function RentalForm({ customers, cars, rentals, onAddRental, selectedCustomer, selectedCar }) {
  const [formData, setFormData] = useState({
    customerId: selectedCustomer ? selectedCustomer.id : '',
    carId: selectedCar ? selectedCar.id : '',
    startDate: '',
    days: '',
  });
  
  const [errors, setErrors] = useState({});

  // Update form when selectedCustomer or selectedCar changes
  useEffect(() => {
    if (selectedCustomer) {
      setFormData(prev => ({ ...prev, customerId: selectedCustomer.id }));
    }
    if (selectedCar) {
      setFormData(prev => ({ ...prev, carId: selectedCar.id }));
    }
  }, [selectedCustomer, selectedCar]);

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
    
    if (!formData.customerId) {
      newErrors.customerId = 'Müşteri seçimi zorunludur';
    }
    
    if (!formData.carId) {
      newErrors.carId = 'Araç seçimi zorunludur';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Başlangıç tarihi zorunludur';
    }
    
    if (!formData.days || parseInt(formData.days, 10) <= 0) {
      newErrors.days = 'Geçerli bir kiralama gün sayısı giriniz';
    }

    // Check if car is available for the selected date range
    if (formData.carId && formData.startDate && formData.days) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.startDate);
      endDate.setDate(endDate.getDate() + parseInt(formData.days, 10));
      
      const isCarAvailable = !rentals.some(rental => {
        // Skip checking the current rental against itself (for edit mode if implemented)
        const rentalStartDate = new Date(rental.startDate);
        const rentalEndDate = new Date(rental.startDate);
        rentalEndDate.setDate(rentalEndDate.getDate() + rental.days);
        
        return rental.carId === formData.carId && 
               isDateRangeOverlapping(startDate, endDate, rentalStartDate, rentalEndDate);
      });
      
      if (!isCarAvailable) {
        newErrors.dateRange = 'Bu araç seçilen tarih aralığında başka bir müşteri tarafından kiralanmıştır';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const rental = new Rental(
      null, // id will be assigned in the DataService
      formData.customerId,
      formData.carId,
      formData.startDate,
      parseInt(formData.days, 10)
    );
    
    onAddRental(rental);
    
    // Reset form
    setFormData({
      customerId: '',
      carId: '',
      startDate: '',
      days: '',
    });
  };

  // Format date for input type="date" (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    const d = new Date();
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Calculate minimum date (today) for the date picker
  const today = formatDateForInput(new Date());

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Yeni Kiralama</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Müşteri
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.customerId ? 'border-red-500' : ''}`}
              >
                <option value="">Müşteri Seçin</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName} ({customer.identityNumber})
                  </option>
                ))}
              </select>
            </label>
            {errors.customerId && <p className="mt-1 text-sm text-red-600">{errors.customerId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Araç
              <select
                name="carId"
                value={formData.carId}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.carId ? 'border-red-500' : ''}`}
              >
                <option value="">Araç Seçin</option>
                {cars.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.brand} {car.model} ({car.chassisNumber})
                  </option>
                ))}
              </select>
            </label>
            {errors.carId && <p className="mt-1 text-sm text-red-600">{errors.carId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Başlangıç Tarihi
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={today}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
              />
            </label>
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kiralama Gün Sayısı
              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                min="1"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.days ? 'border-red-500' : ''}`}
              />
            </label>
            {errors.days && <p className="mt-1 text-sm text-red-600">{errors.days}</p>}
          </div>
        </div>

        {errors.dateRange && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.dateRange}</p>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Kiralamayı Tamamla
          </button>
        </div>
      </form>
    </div>
  );
}

export default RentalForm;