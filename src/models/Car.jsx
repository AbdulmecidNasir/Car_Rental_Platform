export class Car {
  /**
   * Creates a new Car instance
   * @param {string|number} id - Unique identifier for the car
   * @param {string} brand - Brand/make of the car
   * @param {string} model - Model of the car
   * @param {string} chassisNumber - Unique chassis/VIN number
   * @param {string} color - Color of the car
   * @param {number} enginePower - Engine power in HP
   * @param {string} transmission - Transmission type (automatic/manual)
   */
  constructor(id, brand, model, chassisNumber, color, enginePower, transmission = 'automatic') {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.chassisNumber = chassisNumber;
    this.color = color;
    this.enginePower = enginePower;
    this.transmission = transmission;
    this.rentals = []; // Array to hold IDs of rentals associated with this car
  }

  /**
   * Gets the full name of the car (brand + model)
   * @returns {string} Full name of the car
   */
  get fullName() {
    return `${this.brand} ${this.model}`;
  }

  /**
   * Gets the specification details of the car
   * @returns {string} Car specifications
   */
  get specs() {
    return `${this.enginePower} HP, ${this.transmission === 'automatic' ? 'Otomatik' : 'Manuel'}, ${this.color}`;
  }

  /**
   * Add a rental to this car's rental history
   * @param {string|number} rentalId - ID of the rental to add
   */
  addRental(rentalId) {
    if (!this.rentals.includes(rentalId)) {
      this.rentals.push(rentalId);
    }
  }

  /**
   * Remove a rental from this car's rental history
   * @param {string|number} rentalId - ID of the rental to remove
   */
  removeRental(rentalId) {
    this.rentals = this.rentals.filter(id => id !== rentalId);
  }

  /**
   * Check if car is available for a specific date range
   * @param {Date} startDate - Start date of rental period
   * @param {Date} endDate - End date of rental period
   * @param {Array} allRentals - Array of all rentals in the system
   * @returns {boolean} True if car is available during the specified period
   */
  isAvailable(startDate, endDate, allRentals) {
    return !allRentals.some(rental => {
      if (rental.carId !== this.id) return false;
      
      const rentalStartDate = new Date(rental.startDate);
      const rentalEndDate = new Date(rental.startDate);
      rentalEndDate.setDate(rentalEndDate.getDate() + rental.days);
      
      // Check if the date ranges overlap
      return !(endDate < rentalStartDate || startDate > rentalEndDate);
    });
  }

  /**
   * Returns a JSON representation of the car
   * @returns {Object} JSON object representing the car
   */
  toJSON() {
    return {
      id: this.id,
      brand: this.brand,
      model: this.model,
      chassisNumber: this.chassisNumber,
      color: this.color,
      enginePower: this.enginePower,
      transmission: this.transmission,
      rentals: [...this.rentals]
    };
  }

  /**
   * Creates a Car instance from JSON data
   * @param {Object} json - JSON object containing car data
   * @returns {Car} New Car instance
   */
  static fromJSON(json) {
    const car = new Car(
      json.id,
      json.brand,
      json.model,
      json.chassisNumber,
      json.color,
      json.enginePower,
      json.transmission
    );
    
    if (Array.isArray(json.rentals)) {
      car.rentals = [...json.rentals];
    }
    
    return car;
  }
}