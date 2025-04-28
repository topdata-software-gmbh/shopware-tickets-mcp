import { beforeEach, describe, expect, it, vi } from 'vitest';
import supportTicketMock from '../mocks/supportTicket.mock.js';
import { getSupportTicket } from './shopwareAccount.client.js';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('getSupportTicket', () => {
  const mockLoginResponse = {
    token: 'test-token',
    userId: 'test-user',
  };

  const mockProducerResponse = [
    {
      id: 'test-producer',
    },
  ];

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should return ticket data for a valid ticket ID', async () => {
    mockFetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLoginResponse),
        } as Response)
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducerResponse),
        } as Response)
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(supportTicketMock),
        } as Response)
      );

    const result = await getSupportTicket('12345');
    expect(result).toEqual(supportTicketMock);
  });

  it('should throw an error for a non-existent ticket', async () => {
    mockFetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLoginResponse),
        } as Response)
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducerResponse),
        } as Response)
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        } as Response)
      );

    await expect(getSupportTicket('99999')).rejects.toThrow(
      'Failed to fetch support ticket: 404 Not Found'
    );
  });

  it('should handle network errors', async () => {
    mockFetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLoginResponse),
        } as Response)
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducerResponse),
        } as Response)
      )
      .mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    await expect(getSupportTicket('12345')).rejects.toThrow('Network error');
  });

  it('should handle invalid JSON responses', async () => {
    mockFetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLoginResponse),
        } as Response)
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducerResponse),
        } as Response)
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.reject(new Error('Invalid JSON')),
        } as Response)
      );

    await expect(getSupportTicket('12345')).rejects.toThrow('Invalid JSON');
  });
});
