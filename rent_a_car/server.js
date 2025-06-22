import express from 'express';
import cors from 'cors';
import { sql, config, connectDB } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Veritabanı bağlantısını test et
app.get('/api/test-db', async (req, res) => {
  try {
    console.log('Attempting to connect to database with config:', {
      ...config,
      password: '****' // Güvenlik için şifreyi gizle
    });
    
    const pool = await connectDB();
    console.log('Database connection successful');
    
    const result = await pool.request().query('SELECT 1 as test');
    console.log('Test query result:', result.recordset);
    
    res.json({ 
      success: true, 
      message: 'Database connection successful',
      result: result.recordset 
    });
  } catch (err) {
    console.error('Database test failed:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message,
      details: err.stack 
    });
  }
});

// Müşteri işlemleri
app.get('/api/customers', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Customers');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  const { firstName, lastName, identityNumber, address, phoneNumber, income } = req.body;
  console.log('Received customer data:', req.body);
  
  try {
    console.log('Connecting to database...');
    const pool = await connectDB();
    console.log('Database connection successful');
    
    const query = `
      INSERT INTO Customers (firstName, lastName, identityNumber, address, phoneNumber, income) 
      VALUES (@firstName, @lastName, @identityNumber, @address, @phoneNumber, @income);
      SELECT SCOPE_IDENTITY() as id;
    `;
    
    console.log('Executing query:', query);
    console.log('With parameters:', {
      firstName, lastName, identityNumber, address, phoneNumber, income
    });
    
    const result = await pool.request()
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('identityNumber', sql.NVarChar, identityNumber)
      .input('address', sql.NVarChar, address)
      .input('phoneNumber', sql.NVarChar, phoneNumber)
      .input('income', sql.Int, income)
      .query(query);
    
    console.log('Query executed successfully');
    const newCustomer = {
      id: result.recordset[0].id,
      firstName,
      lastName,
      identityNumber,
      address,
      phoneNumber,
      income
    };
    
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error('Error adding customer:', err);
    res.status(500).json({ 
      success: false,
      error: err.message,
      details: err.stack 
    });
  }
});

// Araç işlemleri
app.get('/api/cars', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Cars');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cars', async (req, res) => {
  const { brand, model, chassisNumber, color, enginePower, transmission } = req.body;
  console.log('Received car data:', req.body);
  
  try {
    const pool = await connectDB();
    const query = `
      INSERT INTO Cars (brand, model, chassisNumber, color, enginePower, transmission) 
      VALUES (@brand, @model, @chassisNumber, @color, @enginePower, @transmission);
      SELECT SCOPE_IDENTITY() as id;
    `;
    
    const result = await pool.request()
      .input('brand', sql.NVarChar, brand)
      .input('model', sql.NVarChar, model)
      .input('chassisNumber', sql.NVarChar, chassisNumber)
      .input('color', sql.NVarChar, color)
      .input('enginePower', sql.Int, enginePower)
      .input('transmission', sql.NVarChar, transmission)
      .query(query);
    
    const newCar = {
      id: result.recordset[0].id,
      brand,
      model,
      chassisNumber,
      color,
      enginePower,
      transmission
    };
    
    res.status(201).json(newCar);
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ error: err.message });
  }
});

// Kiralama işlemleri
app.get('/api/rentals', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Rentals');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching rentals:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rentals', async (req, res) => {
  const { customerId, carId, startDate, days } = req.body;
  console.log('Received rental data:', req.body);
  
  try {
    const pool = await connectDB();
    const query = `
      INSERT INTO Rentals (customerId, carId, startDate, days) 
      VALUES (@customerId, @carId, @startDate, @days);
      SELECT SCOPE_IDENTITY() as id;
    `;
    
    const result = await pool.request()
      .input('customerId', sql.Int, customerId)
      .input('carId', sql.Int, carId)
      .input('startDate', sql.Date, startDate)
      .input('days', sql.Int, days)
      .query(query);
    
    const newRental = {
      id: result.recordset[0].id,
      customerId,
      carId,
      startDate,
      days
    };
    
    res.status(201).json(newRental);
  } catch (err) {
    console.error('Error adding rental:', err);
    res.status(500).json({ error: err.message });
  }
});

// Server başlatma
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log('Database configuration:', {
    ...config,
    password: '****' // Güvenlik için şifreyi gizle
  });
});