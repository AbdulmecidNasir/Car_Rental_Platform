import { Customer } from '../models/Customer.jsx';
import { Car } from '../models/Car.jsx';
import { Rental } from '../models/Rental.jsx';
import { 
  addCustomer, 
  getAllCustomers as fetchAllCustomers,
  addCar,
  getAllCars as fetchAllCars,
  addRental,
  getAllRentals as fetchAllRentals,
  testDatabaseConnection
} from './api.js';

// Local Storage Keys
const CUSTOMERS_KEY = 'car_rental_customers';
const CARS_KEY = 'car_rental_cars';
const RENTALS_KEY = 'car_rental_rentals';
const COUNTER_KEY = 'car_rental_id_counter';

/**
 * Gets a new unique ID for entities
 * @returns {number} Unique numeric ID
 */
function getNextId() {
  let counter = parseInt(localStorage.getItem(COUNTER_KEY) || '1', 10);
  localStorage.setItem(COUNTER_KEY, (counter + 1).toString());
  return counter;
}

/**
 * Initialize the local storage with sample data if empty
 */
function initializeDataIfNeeded() {
  // Check if data already exists
  if (!localStorage.getItem(CUSTOMERS_KEY) && 
      !localStorage.getItem(CARS_KEY) && 
      !localStorage.getItem(RENTALS_KEY)) {
    
    // Sample customers
    const sampleCustomers = [
      new Customer(
        getNextId(),
        'Ahmet',
        'Yılmaz',
        '12345678901',
        'Ankara, Çankaya',
        '05551234567',
        5000
      ),
      new Customer(
        getNextId(),
        'Ayşe',
        'Kaya',
        '98765432101',
        'İstanbul, Kadıköy',
        '05559876543',
        4500
      )
    ];
    
    // Sample cars
    const sampleCars = [
      new Car(
        getNextId(),
        'Toyota',
        'Corolla',
        'TYT1234567890123',
        'Beyaz',
        116,
        'automatic'
      ),
      new Car(
        getNextId(),
        'Renault',
        'Clio',
        'RNT9876543210123',
        'Mavi',
        90,
        'manual'
      ),
      new Car(
        getNextId(),
        'Honda',
        'Civic',
        'HND5678901234567',
        'Siyah',
        130,
        'automatic'
      )
    ];
    
    saveCustomers(sampleCustomers);
    saveCars(sampleCars);
    saveRentals([]);
  }
}

// Initialize on import
initializeDataIfNeeded();

// Customer CRUD Operations

/**
 * Get all customers from the API
 * @returns {Promise<Array<Customer>>} Array of Customer objects
 */
export async function getAllCustomers() {
  try {
    const data = await fetchAllCustomers();
    return data.map(customerData => Customer.fromJSON(customerData));
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

/**
 * Save customers to local storage
 * @param {Array<Customer>} customers - Array of Customer objects to save
 * @returns {Array<Customer>} The saved customers
 */
function saveCustomers(customers) {
  const customersData = customers.map(customer => customer.toJSON());
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customersData));
  return customers;
}

/**
 * Get a customer by ID
 * @param {string|number} id - ID of the customer to retrieve
 * @returns {Promise<Customer|null>} The customer object or null if not found
 */
export async function getCustomerById(id) {
  const customers = await getAllCustomers();
  return customers.find(customer => customer.id == id) || null;
}

/**
 * Add or update a customer
 * @param {Customer} customer - Customer object to save
 * @returns {Promise<Customer>} The saved customer
 */
export async function saveCustomer(customer) {
  try {
    const data = await addCustomer(customer.toJSON());
    return Customer.fromJSON(data);
  } catch (error) {
    console.error('Error saving customer:', error);
    throw error;
  }
}

/**
 * Delete a customer by ID
 * @param {string|number} id - ID of the customer to delete
 * @returns {Array<Customer>} Updated array of all customers
 */
export function deleteCustomer(id) {
  let customers = getAllCustomers();
  customers = customers.filter(customer => customer.id != id);
  return saveCustomers(customers);
}

// Car CRUD Operations

/**
 * Get all cars from the API
 * @returns {Promise<Array<Car>>} Array of Car objects
 */
export async function getAllCars() {
  try {
    const data = await fetchAllCars();
    return data.map(carData => Car.fromJSON(carData));
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

/**
 * Save cars to local storage
 * @param {Array<Car>} cars - Array of Car objects to save
 * @returns {Array<Car>} The saved cars
 */
function saveCars(cars) {
  const carsData = cars.map(car => car.toJSON());
  localStorage.setItem(CARS_KEY, JSON.stringify(carsData));
  return cars;
}

/**
 * Get a car by ID
 * @param {string|number} id - ID of the car to retrieve
 * @returns {Promise<Car|null>} The car object or null if not found
 */
export async function getCarById(id) {
  const cars = await getAllCars();
  return cars.find(car => car.id == id) || null;
}

/**
 * Add or update a car
 * @param {Car} car - Car object to save
 * @returns {Promise<Car>} The saved car
 */
export async function saveCar(car) {
  try {
    const data = await addCar(car.toJSON());
    return Car.fromJSON(data);
  } catch (error) {
    console.error('Error saving car:', error);
    throw error;
  }
}

/**
 * Delete a car by ID
 * @param {string|number} id - ID of the car to delete
 * @returns {Array<Car>} Updated array of all cars
 */
export function deleteCar(id) {
  let cars = getAllCars();
  cars = cars.filter(car => car.id != id);
  return saveCars(cars);
}

// Rental CRUD Operations

/**
 * Get all rentals from the API
 * @returns {Promise<Array<Rental>>} Array of Rental objects
 */
export async function getAllRentals() {
  try {
    const data = await fetchAllRentals();
    return data.map(rentalData => Rental.fromJSON(rentalData));
  } catch (error) {
    console.error('Error fetching rentals:', error);
    return [];
  }
}

/**
 * Save rentals to local storage
 * @param {Array<Rental>} rentals - Array of Rental objects to save
 * @returns {Array<Rental>} The saved rentals
 */
function saveRentals(rentals) {
  const rentalsData = rentals.map(rental => rental.toJSON());
  localStorage.setItem(RENTALS_KEY, JSON.stringify(rentalsData));
  return rentals;
}

/**
 * Get a rental by ID
 * @param {string|number} id - ID of the rental to retrieve
 * @returns {Promise<Rental|null>} The rental object or null if not found
 */
export async function getRentalById(id) {
  const rentals = await getAllRentals();
  return rentals.find(rental => rental.id == id) || null;
}

/**
 * Add or update a rental
 * @param {Rental} rental - Rental object to save
 * @returns {Promise<Rental>} The saved rental
 */
export async function saveRental(rental) {
  try {
    const data = await addRental(rental.toJSON());
    return Rental.fromJSON(data);
  } catch (error) {
    console.error('Error saving rental:', error);
    throw error;
  }
}

/**
 * Delete a rental by ID
 * @param {string|number} id - ID of the rental to delete
 * @returns {Array<Rental>} Updated array of all rentals
 */
export function deleteRental(id) {
  const rental = getRentalById(id);
  let rentals = getAllRentals();
  
  if (rental) {
    // Remove rental reference from customer and car
    const customer = getCustomerById(rental.customerId);
    const car = getCarById(rental.carId);
    
    if (customer) {
      customer.removeRental(id);
      saveCustomer(customer);
    }
    
    if (car) {
      car.removeRental(id);
      saveCar(car);
    }
    
    // Remove rental
    rentals = rentals.filter(r => r.id != id);
  }
  
  return saveRentals(rentals);
}

/**
 * Check if a car is available for rental during a specific date range
 * @param {string|number} carId - ID of the car to check
 * @param {Date} startDate - Start date of the rental period
 * @param {Date} endDate - End date of the rental period
 * @param {string|number|null} excludeRentalId - ID of a rental to exclude from the check
 * @returns {Promise<boolean>} True if the car is available, false otherwise
 */
export async function isCarAvailable(carId, startDate, endDate, excludeRentalId = null) {
  const rentals = await getAllRentals();
  return !rentals.some(rental => {
    if (rental.carId == carId && rental.id != excludeRentalId) {
      const rentalStart = new Date(rental.startDate);
      const rentalEnd = new Date(rental.endDate);
      return (
        (startDate >= rentalStart && startDate <= rentalEnd) ||
        (endDate >= rentalStart && endDate <= rentalEnd) ||
        (startDate <= rentalStart && endDate >= rentalEnd)
      );
    }
    return false;
  });
}

/**
 * Get all rentals for a specific customer
 * @param {string|number} customerId - ID of the customer
 * @returns {Promise<Array<Rental>>} Array of Rental objects
 */
export async function getRentalsByCustomerId(customerId) {
  const rentals = await getAllRentals();
  return rentals.filter(rental => rental.customerId == customerId);
}

/**
 * Get all rentals for a specific car
 * @param {string|number} carId - ID of the car
 * @returns {Promise<Array<Rental>>} Array of Rental objects
 */
export async function getRentalsByCarId(carId) {
  const rentals = await getAllRentals();
  return rentals.filter(rental => rental.carId == carId);
}

/**
 * Test the database connection
 * @returns {Promise<Object>} The test result
 */
export async function testDBConnection() {
  return testDatabaseConnection();
}