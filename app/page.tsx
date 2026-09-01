"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-semibold">
              AI Voice Booking Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage AI-powered customer calls and appointments
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="text-sm text-slate-300">Online</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto flex max-w-7xl gap-2 px-6">
          {["Dashboard", "Appointments", "Calls", "Customers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-4 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-blue-500 text-white"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">{activeTab}</h2>

          <p className="mt-2 text-slate-400">
            Monitor your AI booking assistant.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 md:grid-cols-3">
          <StatCard
            title="Today's Bookings"
            value="12"
            description="Appointments confirmed"
          />

          <StatCard
            title="AI Calls"
            value="24"
            description="Calls handled today"
          />

          <StatCard
            title="Pending"
            value="3"
            description="Appointments awaiting confirmation"
          />
        </div>

        {/* Appointments */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Today's Appointments
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Upcoming customer appointments
              </p>
            </div>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-sm text-slate-400">
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Appointment</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <Appointment
                  time="09:00 AM"
                  customer="Rahul Sharma"
                  type="Consultation"
                  status="Confirmed"
                />

                <Appointment
                  time="11:00 AM"
                  customer="Priya Patel"
                  type="Follow-up"
                  status="Confirmed"
                />

                <Appointment
                  time="02:00 PM"
                  customer="Arjun Kumar"
                  type="Consultation"
                  status="Pending"
                />

                <Appointment
                  time="04:30 PM"
                  customer="Sneha Rao"
                  type="Consultation"
                  status="Confirmed"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Calls */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Recent AI Calls</h3>

            <p className="mt-1 text-sm text-slate-400">
              Latest conversations handled by the voice assistant
            </p>
          </div>

          <div className="space-y-4">
            <CallItem
              customer="Rahul Sharma"
              description="Booked a consultation for today at 9:00 AM"
              time="5 minutes ago"
            />

            <CallItem
              customer="Priya Patel"
              description="Rescheduled appointment to tomorrow"
              time="18 minutes ago"
            />

            <CallItem
              customer="Arjun Kumar"
              description="Requested a new appointment"
              time="32 minutes ago"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* Statistics card */

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-3 text-4xl font-semibold">{value}</p>

      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

/* Appointment row */

function Appointment({
  time,
  customer,
  type,
  status,
}: {
  time: string;
  customer: string;
  type: string;
  status: string;
}) {
  return (
    <tr className="border-b border-slate-800 last:border-0">
      <td className="py-4 text-sm text-slate-300">{time}</td>

      <td className="py-4 text-sm font-medium">{customer}</td>

      <td className="py-4 text-sm text-slate-400">{type}</td>

      <td className="py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === "Confirmed"
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

/* Call item */

function CallItem({
  customer,
  description,
  time,
}: {
  customer: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div>
        <p className="font-medium">{customer}</p>

        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <span className="text-xs text-slate-500">{time}</span>
    </div>
  );
}