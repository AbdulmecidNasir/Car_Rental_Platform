export class Rental {
  /**
   * Creates a new Rental instance
   * @param {string|number} id - Unique identifier for the rental
   * @param {string|number} customerId - ID of the customer renting the car
   * @param {string|number} carId - ID of the car being rented
   * @param {string} startDate - Start date of the rental (YYYY-MM-DD format)
   * @param {number} days - Number of days the car is rented for
   */
  constructor(id, customerId, carId, startDate, days) {
    this.id = id;
    this.customerId = customerId;
    this.carId = carId;
    this.startDate = startDate;
    this.days = days;
  }

  /**
   * Gets the end date of the rental
   * @returns {Date} End date of the rental
   */
  getEndDate() {
    const endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + this.days);
    return endDate;
  }

  /**
   * Checks if this rental overlaps with another date range
   * @param {Date} startDate - Start date to check against
   * @param {Date} endDate - End date to check against
   * @returns {boolean} True if the rental period overlaps with the given date range
   */
  overlapsWithDateRange(startDate, endDate) {
    const rentalStartDate = new Date(this.startDate);
    const rentalEndDate = this.getEndDate();
    
    // Check if the date ranges overlap
    return !(endDate < rentalStartDate || startDate > rentalEndDate);
  }

  /**
   * Returns a JSON representation of the rental
   * @returns {Object} JSON object representing the rental
   */
  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      carId: this.carId,
      startDate: this.startDate,
      days: this.days
    };
  }

  /**
   * Creates a Rental instance from JSON data
   * @param {Object} json - JSON object containing rental data
   * @returns {Rental} New Rental instance
   */
  static fromJSON(json) {
    return new Rental(
      json.id,
      json.customerId,
      json.carId,
      json.startDate,
      json.days
    );
  }
}