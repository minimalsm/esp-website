import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';
import {
  API_NEWSLETTER_SIGNUP_URL,
  API_OFFICE_HOURS,
  API_WISHLIST,
  API_RFP,
  API_DIRECT_GRANT,
  API_CSAT
} from './constants';

describe('api', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
  });

  describe('newsletter', () => {
    it('should submit newsletter data with JSON body', async () => {
      const mockData = {
        email: 'test@example.com'
      };

      await api.newsletter.submit(mockData);

      expect(global.fetch).toHaveBeenCalledWith(
        API_NEWSLETTER_SIGNUP_URL,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockData)
        })
      );
    });

    it('should return the fetch response', async () => {
      const mockResponse = { ok: true, status: 200 };
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await api.newsletter.submit({ email: 'test@example.com' });

      expect(result).toBe(mockResponse);
    });
  });

  describe('csat', () => {
    it('should submit CSAT data with JSON body', async () => {
      const mockData = {
        applicationId: 'APP-123',
        csatToken: 'TOKEN-456',
        rating: 5,
        feedback: 'Great experience'
      };

      await api.csat.submit(mockData as any);

      expect(global.fetch).toHaveBeenCalledWith(
        API_CSAT,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockData)
        })
      );
    });
  });

  describe('officeHours', () => {
    it('should submit office hours data with FormData', async () => {
      const mockData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        company: 'Test Corp'
      };

      await api.officeHours.submit(mockData as any);

      expect(global.fetch).toHaveBeenCalledWith(
        API_OFFICE_HOURS,
        expect.objectContaining({
          method: 'POST'
        })
      );

      // Verify body is FormData
      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      expect(fetchCall[1]?.body).toBeInstanceOf(FormData);
    });

    it('should use full name as company if company not provided', async () => {
      const mockData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        company: ''
      };

      await api.officeHours.submit(mockData as any);

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      const formData = fetchCall[1]?.body as FormData;
      // createFormData JSON-stringifies values
      expect(formData.get('company')).toBe('"John Doe"');
    });

    it('should keep company if provided', async () => {
      const mockData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        company: 'Acme Inc'
      };

      await api.officeHours.submit(mockData as any);

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      const formData = fetchCall[1]?.body as FormData;
      expect(formData.get('company')).toBe('"Acme Inc"');
    });
  });

  describe('wishlist', () => {
    it('should submit wishlist data with FormData', async () => {
      const mockData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        company: 'Tech Co'
      };

      await api.wishlist.submit(mockData as any);

      expect(global.fetch).toHaveBeenCalledWith(
        API_WISHLIST,
        expect.objectContaining({
          method: 'POST'
        })
      );

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      expect(fetchCall[1]?.body).toBeInstanceOf(FormData);
    });

    it('should default company to full name when empty', async () => {
      const mockData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        company: ''
      };

      await api.wishlist.submit(mockData as any);

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      const formData = fetchCall[1]?.body as FormData;
      expect(formData.get('company')).toBe('"Jane Smith"');
    });
  });

  describe('rfp', () => {
    it('should submit RFP data with FormData', async () => {
      const mockData = {
        firstName: 'Bob',
        lastName: 'Builder',
        email: 'bob@example.com',
        company: 'Construction LLC'
      };

      await api.rfp.submit(mockData as any);

      expect(global.fetch).toHaveBeenCalledWith(
        API_RFP,
        expect.objectContaining({
          method: 'POST'
        })
      );

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      expect(fetchCall[1]?.body).toBeInstanceOf(FormData);
    });

    it('should default company to full name when empty', async () => {
      const mockData = {
        firstName: 'Bob',
        lastName: 'Builder',
        email: 'bob@example.com',
        company: ''
      };

      await api.rfp.submit(mockData as any);

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      const formData = fetchCall[1]?.body as FormData;
      expect(formData.get('company')).toBe('"Bob Builder"');
    });
  });

  describe('directGrant', () => {
    it('should submit direct grant data with FormData', async () => {
      const mockData = {
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alice@example.com',
        company: 'Wonderland Inc'
      };

      await api.directGrant.submit(mockData as any);

      expect(global.fetch).toHaveBeenCalledWith(
        API_DIRECT_GRANT,
        expect.objectContaining({
          method: 'POST'
        })
      );

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      expect(fetchCall[1]?.body).toBeInstanceOf(FormData);
    });

    it('should default company to full name when empty', async () => {
      const mockData = {
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alice@example.com',
        company: ''
      };

      await api.directGrant.submit(mockData as any);

      const fetchCall = vi.mocked(global.fetch).mock.calls[0];
      const formData = fetchCall[1]?.body as FormData;
      expect(formData.get('company')).toBe('"Alice Wonder"');
    });
  });
});
