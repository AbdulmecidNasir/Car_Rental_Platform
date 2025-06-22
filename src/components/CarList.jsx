import React from 'react';

function CarList({ cars, onSelectCar }) {
  if (cars.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">Henüz araç bulunmamaktadır. Lütfen araç ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h3 className="text-xl font-semibold p-4 border-b">Araç Listesi</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marka</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şasi No</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renk</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motor Gücü</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vites</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map(car => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{car.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.model}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.chassisNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.color}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.enginePower} HP</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.transmission}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onSelectCar(car)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Kirala
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarList;