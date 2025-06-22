import { useState, useEffect } from 'react';
import Header from './components/Header';
import CustomerForm from './components/CustomerForm';
import CarForm from './components/CarForm';
import CarList from './components/CarList';
import RentalForm from './components/RentalForm';
import RentalList from './components/RentalList';
import ERDiagram from './components/ERDiagram';
import { getAllCustomers, saveCustomer } from './services/DataService';
import { getAllCars, saveCar } from './services/DataService';
import { getAllRentals, saveRental } from './services/DataService';

function App() {
  const [activeTab, setActiveTab] = useState('customers');
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customersData, carsData, rentalsData] = await Promise.all([
          getAllCustomers(),
          getAllCars(),
          getAllRentals()
        ]);
        setCustomers(customersData);
        setCars(carsData);
        setRentals(rentalsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddCustomer = async (customer) => {
    try {
      setLoading(true);
      const savedCustomer = await saveCustomer(customer);
      setCustomers(prev => [...prev, savedCustomer]);
      setError(null);
    } catch (err) {
      console.error('Error adding customer:', err);
      setError('Müşteri eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = async (car) => {
    try {
      setLoading(true);
      const savedCar = await saveCar(car);
      setCars(prev => [...prev, savedCar]);
      setError(null);
    } catch (err) {
      console.error('Error adding car:', err);
      setError('Araç eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRental = async (rental) => {
    try {
      setLoading(true);
      const savedRental = await saveRental(rental);
      setRentals(prev => [...prev, savedRental]);
      // Refresh customers list
      const updatedCustomers = await getAllCustomers();
      setCustomers(updatedCustomers);
      setError(null);
    } catch (err) {
      console.error('Error adding rental:', err);
      setError('Kiralama eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setActiveTab('rentals');
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setActiveTab('rentals');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Müşteriler</h2>
            <CustomerForm onAddCustomer={handleAddCustomer} />
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Müşteri Listesi</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adı</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soyadı</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TC Kimlik No</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.firstName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.identityNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phoneNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleCustomerSelect(customer)} 
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Araba Kirala
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cars' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Arabalar</h2>
            <CarForm onAddCar={handleAddCar} />
            <CarList cars={cars} onSelectCar={handleCarSelect} />
          </div>
        )}

        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Kiralama İşlemleri</h2>
            <RentalForm 
              customers={customers}
              cars={cars}
              onAddRental={handleAddRental}
              selectedCustomer={selectedCustomer}
              selectedCar={selectedCar}
              rentals={rentals}
            />
            <RentalList 
              rentals={rentals} 
              customers={customers}
              cars={cars}
            />
          </div>
        )}

        {activeTab === 'erdiagram' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">ER Diyagramı ve Sistem Açıklaması</h2>
            <ERDiagram />
            <div className="bg-white p-6 rounded-lg shadow mt-6">
              <h3 className="text-xl font-semibold mb-4">Sistem Açıklaması</h3>
              <p className="text-gray-700 mb-4">
                Bu araç kiralama sistemi, müşterilerin araç kiralamasını ve kiralanmış araçların takibini sağlar. 
                Sistem üç ana varlığa sahiptir: Müşteri, Otomobil ve Kiralama.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Bir müşteri istediği kadar aracı kiralayabilir (1:N ilişki)</li>
                <li>Bir araç aynı tarih aralığında birden fazla kişiye kiralanamaz</li>
                <li>Müşteriler, kişisel bilgileri (ad, soyad, TC kimlik no, vb.) ile sisteme kaydedilir</li>
                <li>Otomobiller, teknik özellikleri (marka, model, şasi no, vb.) ile sisteme kaydedilir</li>
                <li>Kiralama işlemi, müşteri ve otomobil arasında tarih bazlı olarak gerçekleştirilir</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;