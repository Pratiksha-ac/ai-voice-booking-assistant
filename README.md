# AI Voice Booking Assistant

An AI-powered voice appointment booking system that allows customers to schedule, check, manage, and receive confirmation for appointments through natural voice conversations.

The system uses **Twilio** for phone communication, **Vapi** for voice-agent orchestration, **OpenAI** for conversational intelligence, **Next.js** for backend APIs, **Google Calendar** for availability and appointment management, **Supabase PostgreSQL** for persistent booking data, and **n8n** for workflow automation.

## 🚀 Features

- 📞 Phone-based appointment booking through Twilio
- 🎙️ AI voice assistant powered by Vapi
- 🤖 OpenAI-powered conversational intelligence
- 🗣️ Natural-language appointment conversations
- 📅 Google Calendar integration
- 🔎 Real-time appointment availability checking
- 📋 Appointment booking and management
- ❌ Appointment cancellation
- 🔄 Appointment rescheduling
- 👤 Customer name and phone number collection
- 🕐 Appointment date and time collection
- 🏷️ Appointment type support
- 🗄️ Supabase PostgreSQL database
- 🔗 Vapi webhook integration
- ⚡ Next.js API routes
- 🔄 n8n workflow integration
- 🛡️ Input validation and error handling
- ❤️ Health-check API
- 📊 Booking status and management UI
- 🌐 Production deployment support with Vercel
- 🔐 Environment-variable-based configuration

---

# 🏗️ System Architecture

```text
                         CUSTOMER
                            │
                         📞 Call
                            │
                            ▼
                         Twilio
                            │
                            ▼
                           Vapi
                            │
                            ▼
                         OpenAI
                            │
                    Natural Conversation
                            │
                    "Book 3 PM tomorrow"
                            │
                            ▼
                ┌────────────────────────┐
                │     NEXT.JS BACKEND    │
                │                        │
                │       API Routes       │
                │            │           │
                │   ┌────────┼────────┐  │
                │   │        │        │  │
                │   ▼        ▼        ▼  │
                │ Calendar Supabase  Vapi│
                │                    │   │
                │                    ▼   │
                │                   n8n  │
                └──────────┬─────────────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
          Google Calendar        Supabase
                 │                   │
          Availability +          Booking
             Booking               Data
                 │                   │
                 └─────────┬─────────┘
                           │
                           ▼
                    Booking Result
                           │
                           ▼
                       Vapi Voice
                           │
                           ▼
                  📞 Customer Confirmation
```

---

# 🔄 Complete Booking Flow

### 1. Customer Calls

The customer calls the configured business phone number using Twilio.

### 2. Voice Assistant

The call is connected to the Vapi voice assistant.

### 3. Natural Conversation

Vapi uses OpenAI to understand the customer's request.

For example:

```text
Customer:
"I want to book an appointment tomorrow at 3 PM."

AI Assistant:
"Sure. May I have your name and phone number?"
```

### 4. Information Collection

The assistant collects the required booking information:

```text
Customer Name
Customer Phone
Appointment Date
Appointment Time
Appointment Type
```

### 5. Vapi Tool Call

Once the required information is collected and confirmed, Vapi sends the structured request to the Next.js backend.

```text
Vapi
  │
  ▼
POST /api/vapi
```

### 6. Backend Processing

The Next.js backend validates the request and determines the required operation.

```text
Vapi Webhook
      │
      ▼
Validation
      │
      ▼
Availability Check
      │
      ▼
Google Calendar
      │
      ▼
Supabase
```

### 7. Availability Check

The system checks Google Calendar to determine whether the requested appointment slot is available.

### 8. Appointment Creation

If the requested time is available, the system creates an event in Google Calendar.

### 9. Database Persistence

The appointment information is stored in Supabase PostgreSQL.

### 10. Automation

n8n can process the resulting booking workflow for additional automation and integrations.

### 11. Voice Confirmation

The result is returned to Vapi, which communicates the final booking status to the customer.

```text
"Your appointment has been successfully booked for tomorrow at 3 PM."
```

---

# 📅 Appointment Management

The system supports the complete appointment lifecycle.

```text
                    APPOINTMENT SYSTEM
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
          BOOK          CHECK           MANAGE
        APPOINTMENT   AVAILABILITY     APPOINTMENT
            │              │              │
            │              │       ┌──────┴──────┐
            │              │       │             │
            ▼              ▼       ▼             ▼
        Google         Calendar   Cancel       Reschedule
        Calendar         Check      │             │
            │              │        │             │
            └──────────────┴────────┴─────────────┘
                           │
                           ▼
                        Supabase
                           │
                           ▼
                    Booking Records
```

Supported operations include:

- Create appointment
- Check availability
- Cancel appointment
- Reschedule appointment
- Store appointment information
- Retrieve booking information
- Update booking status

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- CSS

## Backend

- Next.js API Routes
- REST APIs
- Webhooks
- Server-side business logic

## AI / Voice

- Vapi
- OpenAI
- Conversational AI
- Voice AI
- Tool Calling

## Telephony

- Twilio

## Database

- Supabase
- PostgreSQL

## Calendar

- Google Calendar API

## Automation

- n8n

## Deployment

- Vercel

## Development

- Git
- GitHub
- Postman
- cURL

---

# 📂 Project Structure

```text
ai-voice-booking-assistant/
│
├── app/
│   ├── api/
│   │   │
│   │   ├── bookings/
│   │   │   └── route.ts
│   │   │
│   │   ├── availability/
│   │   │   └── route.ts
│   │   │
│   │   ├── health/
│   │   │   └── route.ts
│   │   │
│   │   ├── vapi/
│   │   │   └── route.ts
│   │   │
│   │   └── n8n/
│   │       └── route.ts
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── BookingForm.tsx
│   ├── BookingList.tsx
│   ├── Availability.tsx
│   ├── Navbar.tsx
│   └── StatusCard.tsx
│
├── lib/
│   ├── supabase.ts
│   ├── calendar.ts
│   ├── validation.ts
│   └── utils.ts
│
├── types/
│   └── booking.ts
│
├── supabase/
│   └── schema.sql
│
├── .env.local
├── .env.example
├── package.json
├── README.md
└── ...
```

---

# 🔌 API Routes

## Booking API

```http
POST /api/bookings
```

Handles appointment creation and booking-related operations.

---

## Availability API

```http
GET /api/availability
```

Checks appointment availability using the configured calendar.

---

## Vapi Webhook

```http
POST /api/vapi
```

Receives requests and tool calls from the Vapi voice assistant.

---

## n8n Webhook

```http
POST /api/n8n
```

Provides integration between the application and n8n automation workflows.

---

## Health Check

```http
GET /api/health
```

Used to verify that the backend service is running correctly.

---

# 🗄️ Database

The application uses **Supabase PostgreSQL** to persist appointment information.

Typical booking information includes:

```text
Booking
│
├── Customer Name
├── Customer Phone
├── Appointment Date
├── Appointment Time
├── Appointment Type
├── Calendar Event ID
├── Booking Status
└── Timestamps
```

The database schema is maintained in:

```text
supabase/schema.sql
```

---

# 📅 Google Calendar Integration

Google Calendar is used for appointment scheduling and availability management.

The integration supports:

- Calendar availability checking
- Appointment creation
- Event identification
- Appointment cancellation
- Appointment rescheduling
- Calendar synchronization with booking records

The calendar event ID can be stored with the corresponding Supabase booking record to maintain a relationship between the application and Google Calendar.

---

# 🤖 Vapi + OpenAI Integration

Vapi manages the voice conversation and tool execution.

OpenAI provides the conversational intelligence used to understand customer requests and generate natural responses.

```text
Customer Voice
      │
      ▼
    Twilio
      │
      ▼
     Vapi
      │
      ▼
    OpenAI
      │
      ▼
Intent + Information
      │
      ▼
  Tool Calling
      │
      ▼
 Next.js APIs
```

This allows customers to interact with the booking system using natural language rather than traditional forms.

---

# 🔄 n8n Integration

n8n is integrated into the system for workflow automation.

```text
Next.js
   │
   ▼
n8n Webhook
   │
   ├── Notifications
   ├── Automation
   ├── External Integrations
   └── Workflow Processing
```

This allows additional business workflows to be triggered after booking-related events.

---

# 🔐 Environment Variables

Create a `.env.local` file containing the required credentials and configuration.

```env
GOOGLE_CALENDAR_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_APP_URL=

VAPI_API_KEY=
VAPI_ASSISTANT_ID=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

OPENAI_API_KEY=
```

> **Security:** Never commit `.env.local`, API keys, OAuth credentials, or other secrets to GitHub.

The `.env.example` file can be used as a template without exposing actual credentials.

---

# 🧪 Testing

The booking API can be tested independently using cURL, Postman, or other API clients.

Example:

```bash
curl -X POST http://localhost:3000/api/bookings \
-H "Content-Type: application/json" \
-d '{
  "customer_name": "Test User",
  "customer_phone": "9999999999",
  "appointment_date": "2026-09-03",
  "appointment_time": "15:00",
  "appointment_type": "General"
}'
```

## Testing Areas

The application can be tested across the complete workflow:

- API health check
- Booking API
- Availability API
- Vapi webhook
- n8n integration
- Input validation
- Google Calendar availability
- Calendar event creation
- Supabase persistence
- Booking cancellation
- Booking rescheduling
- Voice interaction
- Error handling
- End-to-end booking workflow

---

# 🛡️ Validation & Error Handling

The system validates booking requests before processing them.

Validation includes:

- Required customer information
- Valid phone number
- Valid appointment date
- Valid appointment time
- Valid appointment type
- Availability verification
- Calendar operation status
- Database operation status

The system returns appropriate booking results when an operation succeeds or fails.

Example:

```text
Available
    │
    ▼
Create Calendar Event
    │
    ▼
Save Booking
    │
    ▼
Success
```

or:

```text
Unavailable
    │
    ▼
Suggest Another Time
    │
    ▼
Customer Chooses New Slot
```

---

# 📊 Observability

The system can monitor important application and booking operations through structured logging and status tracking.

Key areas include:

- API requests
- Vapi webhook requests
- Calendar operations
- Database operations
- n8n workflow execution
- Booking failures
- Validation errors
- Availability failures
- Response latency
- Health status

This helps identify failures across the complete voice-to-booking pipeline.

---

# 🌐 Deployment

The Next.js application is deployed using Vercel.

Production architecture:

```text
                    PRODUCTION
                        │
                     Customer
                        │
                        ▼
                     Twilio
                        │
                        ▼
                      Vapi
                        │
                        ▼
                     OpenAI
                        │
                        ▼
                    Vercel
                        │
              ┌─────────┼─────────┐
              │         │         │
              ▼         ▼         ▼
         Google      Supabase    n8n
         Calendar    PostgreSQL  Automation
```

Environment variables are configured securely through the deployment environment.

---

# 📈 Project Highlights

- Built an end-to-end **AI voice appointment booking platform**
- Integrated **Twilio** for phone-based communication
- Integrated **Vapi** for voice-agent orchestration
- Integrated **OpenAI** for conversational intelligence
- Developed backend APIs using **Next.js and TypeScript**
- Implemented **Google Calendar availability and booking**
- Implemented **Supabase PostgreSQL persistence**
- Built **Vapi and n8n webhook integrations**
- Implemented appointment **booking, cancellation, and rescheduling**
- Added input validation and error handling
- Added backend health monitoring
- Built a booking management interface
- Deployed the application using **Vercel**
- Designed the system for automated, production-oriented appointment workflows

---

# 👩‍💻 Author

**Pratiksha Chandanshiv**

AI/ML Engineer | Generative AI | Agentic AI | Machine Learning
