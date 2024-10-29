# Frontend Development Guide: Management Hotel System

## Overview // some edits

The document is a guide for the frontend team to develop the Management Hotel System interface. The Management Hotel System will provide an admin panel for hotel staff, including roles such as **Admin**, **Management**, and **Receptionist**. This guide outlines the necessary steps, technologies, and best practices to ensure a smooth and efficient development process.

---

## Technologies Used

- **React**: For building the user interface.
- **React Query**: For manage the fetch request,caching,loading,error.
- **Tailwind CSS**: For styling and ensuring responsive design.
- **TypeScript**: For type safety and improved code quality.
- **React Hook Form + Yup**: For form handling and validation.
- **Ant Design/Material-UI**: For UI components and consistency.

---

## Key Components

### 1. Admin Panel

- **User Management Dashboard**:

  - Interface to manage all user accounts.
  - Includes features for creating, updating, and deleting users, as well as toggling login permissions.

- **Role-Specific Dashboards**:
  - **Management Dashboard**: Access to bookings, customer management, and reporting tools.
  - **Receptionist Dashboard**: Focuses on front desk operations like booking handling and check-ins/check-outs.

### 2. Booking Management

- **Bookings Table**:

  - Displays a list of all bookings with options to search, filter, edit, and delete.
  - Uses Ant Design's table component for easy data handling.

- **Booking Details**:
  - Detailed view for managing individual bookings.
  - Integrated with form validation for updates and cancellations.

---


## Visual Schema

### Management Hotel Interface Overview

```plaintext
+------------------+
|     Admin Panel  |
|------------------|
| + User Mgmt      |
|   + Role-Specific|
|     Dashboards   |
+------------------+
         |
         v
+-------------------+           +----------------------+
|   Management      |           |     Receptionist     |
|-------------------|           |----------------------|
| + Bookings Table  |           | + Booking Management |
| + Customer Mgmt   |           | + Check-ins/out      |
| + Reporting       |           |                      |
+-------------------+           +----------------------+
         |
         v
+------------------+
| Booking Details  |
|------------------|
| + Edit/Cancel    |
| + Form Validation|
+------------------+
```

