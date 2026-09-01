export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled";

export interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  status: BookingStatus;
  notes?: string | null;
  created_at: string;
}

export interface CreateBookingRequest {
  customer_name: string;
  customer_phone: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type?: string;
  notes?: string;
}
