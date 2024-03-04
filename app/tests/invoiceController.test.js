const request = require('supertest');
const app = require('../server.js');
const { getConnection } = require('../database.js');

const jest = require('jest');
const { describe, afterEach, it, expect } = jest;

jest.mock('../database', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(),
  })),
}));

describe('Invoice API endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/invoices should create a new invoice', async () => {
    const newInvoice = {
      description: 'Test invoice',
      customerId: 1,
      invoiceTotal: 500,
      items: [
        { item_id: 1, item_totals: 100 },
        { item_id: 2, item_totals: 200 }
      ]
    };
    const mockResult = { invoice_id: 1, ...newInvoice };
    getConnection().query.mockResolvedValueOnce([mockResult]);

    const response = await request(app)
      .post('/api/invoices')
      .send(newInvoice);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Invoice created successfully', invoice: [mockResult] });
  });

  it('GET /api/invoices/:invoiceId should return the invoice by ID', async () => {
    const invoiceId = 1;
    const mockInvoice = {
      invoice_id: invoiceId,
      description: 'Test invoice',
      customer_id: 1,
      invoice_total: 500,
      items: [
        { item_id: 1, item_totals: 100 },
        { item_id: 2, item_totals: 200 }
      ]
    };
    getConnection().query.mockResolvedValueOnce([mockInvoice]);

    const response = await request(app)
      .get(`/api/invoices/${invoiceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockInvoice);
  });
});
