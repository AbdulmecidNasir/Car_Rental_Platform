import React from 'react';

function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Araç Kiralama Sistemi</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  className={`px-3 py-2 rounded-md ${activeTab === 'customers' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('customers')}
                >
                  Müşteriler
                </button>
              </li>
              <li>
                <button
                  className={`px-3 py-2 rounded-md ${activeTab === 'cars' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('cars')}
                >
                  Arabalar
                </button>
              </li>
              <li>
                <button
                  className={`px-3 py-2 rounded-md ${activeTab === 'rentals' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('rentals')}
                >
                  Kiralama
                </button>
              </li>
              <li>
                <button
                  className={`px-3 py-2 rounded-md ${activeTab === 'erdiagram' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('erdiagram')}
                >
                  ER Diyagramı
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;