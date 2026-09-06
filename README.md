# AI Voice Booking Assistant

An AI-powered voice booking assistant that enables users to schedule appointments through natural voice conversations. The system collects and validates booking details, checks appointment availability, creates Google Calendar events, stores appointment information in Supabase, and handles booking, cancellation, and rescheduling workflows through an automated voice interface.

## 🚀 Features

- 🎙️ AI-powered voice conversations using Vapi
- 📅 Google Calendar integration for appointment management
- 🔎 Real-time appointment availability checking
- 👤 Customer name and phone number collection
- 🕐 Appointment date and time collection
- 📋 Multiple appointment types
- 📅 Appointment booking, cancellation, and rescheduling
- 🔗 Webhook-based backend integration
- 🗄️ Supabase PostgreSQL database for appointment persistence
- ⚡ Next.js API routes for backend processing
- 🔄 n8n-compatible automation workflows
- 📩 Automated appointment notifications and reminders
- 🧾 Conversation and booking history
- 🔐 Input validation and booking error handling
- 👤 Authentication and user account support
- 📊 Booking analytics and monitoring
- 🌐 Production deployment using Vercel
- 🛡️ Secure environment-variable-based configuration
- 🔍 Structured logging and workflow monitoring

## 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │      User       │
                         │ Voice Conversation│
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Vapi Voice      │
                         │ Assistant       │
                         └────────┬────────┘
                                  │
                         Collects booking data
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
             Customer Details            Appointment Details
             • Name                      • Date
             • Phone                     • Time
                                         • Type
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Vapi Tool Call  │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Next.js Webhook │
                         │    /api/vapi    │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Booking API     │
                         │ /api/bookings   │
                         └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              Availability    Google        Supabase
                Check         Calendar      PostgreSQL
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Booking Result  │
                         └────────┬────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
             Database Update             Notification
                                          / Reminder
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Voice Response  │
                         │ Confirmation /  │
                         │ Error Handling  │
                         └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript

### Backend

- Next.js API Routes
- REST APIs
- Webhooks
- Server-side business logic

### AI / Voice

- Vapi
- Conversational AI
- Tool Calling
- Voice-based workflow automation

### Database

- Supabase
- PostgreSQL

### Integrations

- Google Calendar API
- n8n
- Vercel

### Development & Testing

- Git
- GitHub
- Postman
- cURL

## 📂 Project Structure

```text
ai-voice-booking-assistant/
│
├── app/
│   ├── api/
│   │   ├── bookings/
│   │   │   └── route.ts
│   │   │
│   │   └── vapi/
│   │       └── route.ts
│   │
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   └── ...
│
├── lib/
│   └── ...
│
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🔄 Booking Workflow

### 1. Voice Interaction

The user starts a conversation with the Vapi voice assistant and requests an appointment.

### 2. Information Collection

The assistant collects:

- Customer name
- Phone number
- Appointment date
- Appointment time
- Appointment type

### 3. Confirmation

The assistant confirms the collected information with the user before proceeding.

### 4. Availability Validation

The system checks the requested date and time against the configured appointment schedule and Google Calendar availability.

### 5. Tool Execution

Vapi invokes the booking tool and sends the structured appointment request to the Next.js backend.

### 6. Backend Validation

The booking API validates the request and ensures all required fields and appointment information are valid.

### 7. Calendar Management

The system creates the appointment in Google Calendar.

### 8. Database Persistence

The appointment details are stored in Supabase PostgreSQL.

### 9. Notifications

The configured notification workflow handles appointment confirmations, reminders, and related communication.

### 10. Voice Response

The booking result is returned to Vapi, and the assistant communicates the result naturally to the user.

## 🔁 Appointment Management

The assistant supports multiple appointment operations:

```text
User Request
     │
     ▼
Voice Assistant
     │
     ├── Book Appointment
     │
     ├── Check Availability
     │
     ├── Cancel Appointment
     │
     └── Reschedule Appointment
             │
             ▼
        Booking API
             │
       ┌─────┴─────┐
       ▼           ▼
 Google Calendar  Supabase
       │           │
       └─────┬─────┘
             ▼
       Operation Result
             │
             ▼
      Voice Confirmation
```

## 🔗 API Endpoints

### Booking API

```http
POST /api/bookings
```

Creates and stores a new appointment.

### Vapi Webhook

```http
POST /api/vapi
```

Receives tool calls and booking requests from the Vapi voice assistant.

### Availability

The booking workflow validates appointment availability before creating an event.

### Appointment Management

The backend supports appointment lifecycle operations including:

- Create
- Retrieve
- Update
- Cancel
- Reschedule

## 🔐 Environment Variables

Create a `.env.local` file:

```env
GOOGLE_CALENDAR_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_APP_URL=
```

Never commit `.env.local`, API keys, OAuth credentials, or other secrets to GitHub.

## 🧪 Testing

The booking endpoint can be tested independently using:

```bash
curl -X POST http://localhost:3000/api/bookings \
-H "Content-Type: application/json" \
-d '{
  "customer_name": "Test User",
  "customer_phone": "9999999999",
  "appointment_date": "2026-09-03",
  "appointment_time": "10:00",
  "appointment_type": "General"
}'
```

The system can be tested across the complete booking lifecycle:

- Voice conversation
- Required-field collection
- Input validation
- Availability checking
- Vapi tool calling
- Webhook execution
- Google Calendar integration
- Supabase persistence
- Booking confirmation
- Cancellation
- Rescheduling
- Notification workflows
- Error handling

## 📊 Evaluation & Observability

The system includes monitoring and evaluation capabilities for critical booking workflows.

### Evaluation Areas

- Required-field collection accuracy
- Voice-to-tool workflow reliability
- Booking validation
- Availability checking
- Calendar event creation
- Database persistence
- Cancellation and rescheduling reliability
- Booking success/failure handling
- API response latency

### Observability

Structured logging and workflow monitoring can be used to track:

- API requests
- Webhook execution
- Booking failures
- Calendar API errors
- Database errors
- Voice-tool execution
- Response latency
- Workflow status

This makes it easier to identify failures and debug production booking workflows.

## 🌐 Deployment

The application is designed for production deployment using Vercel.

```text
User
 │
 ▼
Vapi
 │
 ▼
Vercel
 │
 ├── Next.js Application
 ├── API Routes
 └── Webhooks
      │
      ├── Google Calendar
      │
      ├── Supabase
      │
      └── n8n
```

Environment variables are configured through the deployment platform rather than being stored directly in the source code.

## 🔒 Security

The application follows secure configuration practices including:

- Environment variables for secrets
- Server-side API credentials
- Input validation
- Webhook validation
- Controlled API access
- Database-level persistence
- Separation of client and server configuration
- No credentials committed to source control

## 📈 Project Highlights

- Built an end-to-end **AI voice booking system**
- Integrated **Vapi conversational AI** with backend tool calling
- Developed **Next.js REST APIs and webhooks**
- Integrated **Google Calendar** for real-time appointment management
- Implemented **Supabase PostgreSQL** persistence
- Added **availability checking, booking, cancellation, and rescheduling**
- Automated notifications and workflow processing using **n8n**
- Implemented validation and error-handling workflows
- Deployed the application using **Vercel**
- Added monitoring, logging, and workflow observability

## 👩‍💻 Author

**Pratiksha Chandanshiv**

AI/ML Engineer | Generative AI | Agentic AI | Machine Learning
