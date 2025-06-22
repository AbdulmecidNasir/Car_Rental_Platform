import React from 'react';

function ERDiagram() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Varlık-İlişki Diyagramı (ER Diagram)</h3>
      <div className="p-4 bg-gray-50 rounded border border-gray-200">
        {/* SVG representation of the ER Diagram */}
        <svg 
          className="mx-auto"
          width="800" 
          height="500" 
          viewBox="0 0 800 500"
        >
          {/* Entity: Customer */}
          <rect x="100" y="100" width="200" height="180" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="5" />
          <text x="200" y="130" textAnchor="middle" fontWeight="bold">MÜŞTERİ</text>
          <line x1="130" y1="150" x2="270" y2="150" stroke="#2196f3" strokeWidth="1" />
          
          <text x="140" y="175" className="entity-attribute">PK id</text>
          <text x="140" y="195" className="entity-attribute">firstName (Ad)</text>
          <text x="140" y="215" className="entity-attribute">lastName (Soyad)</text>
          <text x="140" y="235" className="entity-attribute">identityNumber (TC No)</text>
          <text x="140" y="255" className="entity-attribute">address (Adres)</text>
          <text x="140" y="275" className="entity-attribute">phoneNumber (Tel)</text>
          
          {/* Entity: Car */}
          <rect x="500" y="100" width="200" height="180" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" rx="5" />
          <text x="600" y="130" textAnchor="middle" fontWeight="bold">OTOMOBİL</text>
          <line x1="530" y1="150" x2="670" y2="150" stroke="#4caf50" strokeWidth="1" />
          
          <text x="540" y="175" className="entity-attribute">PK id</text>
          <text x="540" y="195" className="entity-attribute">brand (Marka)</text>
          <text x="540" y="215" className="entity-attribute">model (Model)</text>
          <text x="540" y="235" className="entity-attribute">chassisNumber (Şasi no)</text>
          <text x="540" y="255" className="entity-attribute">color (Renk)</text>
          <text x="540" y="275" className="entity-attribute">enginePower (Motor gücü)</text>
          
          {/* Relationship: Rental */}
          <rect x="300" y="350" width="200" height="130" fill="#fff3e0" stroke="#ff9800" strokeWidth="2" rx="5" />
          <text x="400" y="380" textAnchor="middle" fontWeight="bold">KİRALAMA</text>
          <line x1="330" y1="400" x2="470" y2="400" stroke="#ff9800" strokeWidth="1" />
          
          <text x="340" y="425" className="entity-attribute">PK id</text>
          <text x="340" y="445" className="entity-attribute">FK customerId</text>
          <text x="340" y="465" className="entity-attribute">FK carId</text>
          <text x="340" y="485" className="entity-attribute">startDate (Başlangıç tarihi)</text>
          <text x="340" y="505" className="entity-attribute">days (Gün sayısı)</text>
          
          {/* Relationships */}
          <line x1="200" y1="280" x2="300" y2="350" stroke="#333" strokeWidth="1.5" strokeDasharray="5,5" />
          <text x="230" y="320" textAnchor="middle">1</text>
          
          <line x1="600" y1="280" x2="500" y2="350" stroke="#333" strokeWidth="1.5" strokeDasharray="5,5" />
          <text x="570" y="320" textAnchor="middle">1</text>
          
          <text x="290" y="340" textAnchor="end" fontStyle="italic">Kiralayabilir</text>
          <text x="510" y="340" textAnchor="start" fontStyle="italic">Kiralanabilir</text>
          
          <text x="400" y="330" textAnchor="middle" fontWeight="bold">N:M</text>
        </svg>
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-medium mb-2">İlişki Açıklamaları</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Müşteri - Kiralama:</strong> Bir müşteri birden fazla araç kiralayabilir (1:N ilişki)
          </li>
          <li>
            <strong>Araba - Kiralama:</strong> Bir araç farklı zamanlarda birden fazla kez kiralanabilir (1:N ilişki)
          </li>
          <li>
            <strong>Kiralama:</strong> Müşteri ve Araç arasındaki çoka-çok (N:M) ilişkiyi sağlayan ara tablodur
          </li>
          <li>
            <strong>Kısıt:</strong> Bir araç, aynı tarih aralığında birden fazla kişiye kiralanamaz
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ERDiagram;