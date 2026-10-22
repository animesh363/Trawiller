import { z } from 'zod';
import { ROLES } from '../utils/constants';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupDetailsSchema = z
  .object({
    role: z.string().min(1, 'Role is required'),
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number (min 10 digits)'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),

    // Vendor specific fields
    businessName: z.string().optional(),
    registrationNumber: z.string().optional(),
    destination: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      if (data.role !== ROLES.TOURIST) {
        return !!data.businessName && data.businessName.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Business name is required for vendors',
      path: ['businessName'],
    }
  )
  .refine(
    (data) => {
      if (data.role !== ROLES.TOURIST) {
        return !!data.registrationNumber && data.registrationNumber.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Business registration number is required',
      path: ['registrationNumber'],
    }
  )
  .refine(
    (data) => {
      if (data.role !== ROLES.TOURIST) {
        return !!data.destination && data.destination.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Destination location is required',
      path: ['destination'],
    }
  )
  .refine(
    (data) => {
      if (data.role !== ROLES.TOURIST) {
        return !!data.address && data.address.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Full address is required',
      path: ['address'],
    }
  );

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmNewPassword: z.string().min(6, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: ['confirmNewPassword'],
  });
