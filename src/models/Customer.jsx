export class Customer {
  /**
   * Creates a new Customer instance
   * @param {string|number} id - Unique identifier for the customer
   * @param {string} firstName - First name of the customer
   * @param {string} lastName - Last name of the customer
   * @param {string} identityNumber - TC Identity number (11 digits)
   * @param {string} address - Address of the customer
   * @param {string} phoneNumber - Phone number of the customer
   * @param {number} income - Monthly income of the customer in TL
   */
  constructor(id, firstName, lastName, identityNumber, address, phoneNumber, income = 0) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.identityNumber = identityNumber;
    this.address = address || '';
    this.phoneNumber = phoneNumber;
    this.income = income;
    this.rentals = []; // Array to hold IDs of rentals associated with this customer
  }

  /**
   * Gets the full name of the customer
   * @returns {string} Full name (First name and last name combined)
   */
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Add a rental to this customer's rental history
   * @param {string|number} rentalId - ID of the rental to add
   */
  addRental(rentalId) {
    if (!this.rentals.includes(rentalId)) {
      this.rentals.push(rentalId);
    }
  }

  /**
   * Remove a rental from this customer's rental history
   * @param {string|number} rentalId - ID of the rental to remove
   */
  removeRental(rentalId) {
    this.rentals = this.rentals.filter(id => id !== rentalId);
  }

  /**
   * Check if customer has any active rentals
   * @param {Array} rentals - Array of all rentals in the system
   * @returns {boolean} True if customer has active rentals
   */
  hasActiveRental(rentals) {
    const now = new Date();
    return rentals.some(rental => {
      if (rental.customerId !== this.id) return false;
      
      const startDate = new Date(rental.startDate);
      const endDate = new Date(rental.startDate);
      endDate.setDate(endDate.getDate() + rental.days);
      
      return now >= startDate && now <= endDate;
    });
  }

  /**
   * Returns a JSON representation of the customer
   * @returns {Object} JSON object representing the customer
   */
  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      identityNumber: this.identityNumber,
      address: this.address,
      phoneNumber: this.phoneNumber,
      income: this.income,
      rentals: [...this.rentals]
    };
  }

  /**
   * Creates a Customer instance from JSON data
   * @param {Object} json - JSON object containing customer data
   * @returns {Customer} New Customer instance
   */
  static fromJSON(json) {
    const customer = new Customer(
      json.id,
      json.firstName,
      json.lastName,
      json.identityNumber,
      json.address,
      json.phoneNumber,
      json.income
    );
    
    if (Array.isArray(json.rentals)) {
      customer.rentals = [...json.rentals];
    }
    
    return customer;
  }
}