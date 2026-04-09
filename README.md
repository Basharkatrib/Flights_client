# Flights Booking Platform - Basharkatrib ✈️

A professional and sophisticated front-end application for a complete flight booking platform, built with modern web technologies to ensure a seamless user experience and high performance.

## ✨ Key Features

* **🔍 Advanced Flight Search:** A flexible search system that allows users to find the best flights with ease.
* **🗺️ Interactive Maps:** Integration of Leaflet maps to visually display destinations and flight paths.
* **💳 Secure Payments:** Full integration with the PayPal payment gateway for secure electronic transactions.
* **🌍 Internationalization (i18n):** Multi-language support (English & Arabic) with automatic language detection.
* **📱 Responsive Design:** Fully optimized experience across all devices (Mobile, Tablet, and Desktop).
* **👤 Profile Management:** A user dashboard to track booked trips and update personal information.
* **🎭 Motion & Animations:** Utilizing AOS and Motion (Framer Motion) for a lively and professional UI.

## 🛠️ Tech Stack

The project is built on a robust architecture using:

- **Core:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/) for extremely fast development and performance.
- **State Management:** 
  - [Redux Toolkit](https://redux-toolkit.js.org/) for centralized state management.
  - [Redux Persist](https://github.com/rt2zz/redux-persist) to maintain data state across page refreshes.
- **Styling & UI:**
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first responsive styling.
  - [Material UI (MUI)](https://mui.com/) for professional pre-built components and icons.
  - [TW Elements](https://tw-elements.com/) for additional interactive components.
- **Data & Forms:**
  - [Axios](https://axios-http.com/) for handling API requests.
  - [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for robust form management and validation.
- **User Experience:**
  - [React Router](https://reactrouter.com/) for seamless client-side navigation.
  - [React Hot Toast](https://react-hot-toast.com/) for elegant real-time notifications.
  - [i18next](https://www.i18next.com/) for internationalization and translation support.

## 🚀 Getting Started

Follow these steps to run the project locally:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd Flights_client
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Configuration:**
   Create a `.env` file in the root directory and add the necessary environment variables (e.g., API Base URL, PayPal Client ID).

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. **Build for Production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/Components`: Reusable UI components (Navbar, Footer, FlightCard, etc.).
- `src/Pages`: Main application views (Home, Profile, Checkout, etc.).
- `src/store`: Redux store configuration and slices.
- `src/assets`: Images, icons, and media files.
- `src/i18n.js`: Internationalization and language settings.

---

Developed with ❤️ by **Basharkatrib**
