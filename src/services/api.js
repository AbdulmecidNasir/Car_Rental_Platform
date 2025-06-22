// src/services/api.js
const API_BASE_URL = 'http://localhost:3001/api';

// Customer API calls
export async function addCustomer(customer) {
    try {
        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
}

export async function getAllCustomers() {
    try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}

// Car API calls
export async function addCar(car) {
    try {
        const response = await fetch(`${API_BASE_URL}/cars`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding car:', error);
        throw error;
    }
}

export async function getAllCars() {
    try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
}

// Rental API calls
export async function addRental(rental) {
    try {
        const response = await fetch(`${API_BASE_URL}/rentals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rental),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding rental:', error);
        throw error;
    }
}

export async function getAllRentals() {
    try {
        const response = await fetch(`${API_BASE_URL}/rentals`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching rentals:', error);
        throw error;
    }
}

// Test database connection
export async function testDatabaseConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/test-db`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error testing database connection:', error);
        throw error;
    }
}