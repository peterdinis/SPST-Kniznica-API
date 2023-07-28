import supertest from 'supertest';
import { app } from '../server'
import db from '../db';

// Create a test for the 'getAllBooking' endpoint
describe('GET /api/bookings', () => {
  it('should get all bookings', async () => {
    // Send a GET request to the endpoint using supertest
    const response = await supertest(app).get('/api/bookings');

    // Assert that the response status code is 200 (OK)
    expect(response.status).toBe(200);

    // Assert that the response body is an array (assuming the endpoint returns an array of bookings)
    expect(Array.isArray(response.body)).toBe(true);

    // You can add more specific assertions to validate the data returned if needed
    // For example, check if certain properties exist in the response or compare it to a known fixture.
  });

  it('should handle errors', async () => {
    // Mock the db.booking.findMany function to throw an error (for error handling testing)
    jest.spyOn(db.booking, 'findMany').mockRejectedValueOnce(new Error('Database error'));

    // Send a GET request to the endpoint using supertest
    const response = await supertest(app).get('/api/bookings');

    // Assert that the response status code is 500 (Internal Server Error)
    expect(response.status).toBe(500);

    // Assert that the response body contains the error message (assuming you have a standardized error response format)
    expect(response.body).toEqual({ error: 'Database error' });
  });
});