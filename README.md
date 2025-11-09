# Tinder Mobile App

A modern, feature-rich Tinder clone built with React Native and Expo. Swipe right to like, swipe left to pass, and view your likes!

---

## Features

- **Like/Dislike** - Swipe right to like, left to pass with smooth card animations
- **View Liked People** - See all the profiles you've liked in a beautiful grid
- **Profile Section** - Clean profile page with user stats and information
- **Animations** - Lottie animations and smooth gesture-based interactions

---

## App Demo

### Screen Recording

https://github.com/user-attachments/assets/app-demo.mov

_Full app walkthrough showing splash, swiping, liked people, and profile screens_

### Screenshots

<div align="center">
  <img src="assets/screenshots/ss-1.png" width="200" />
  <img src="assets/screenshots/ss-2.png" width="200" />
  <img src="assets/screenshots/ss-3.png" width="200" />
  <img src="assets/screenshots/ss-4.png" width="200" />
  <img src="assets/screenshots/ss-5.png" width="200" />
  <img src="assets/screenshots/ss-6.png" width="200" />
  <img src="assets/screenshots/ss-7.png" width="200" />
  <img src="assets/screenshots/ss-8.png" width="200" />
</div>

---

## Tech Stack

### Core Libraries

| Library                          | Purpose                               |
| -------------------------------- | ------------------------------------- |
| **React Native (Expo)**          | Mobile framework                      |
| **TypeScript**                   | Type-safe code                        |
| **React Query**                  | Server state management & API caching |
| **Recoil**                       | Global client state management        |
| **Axios**                        | HTTP client for API calls             |
| **React Native Reanimated**      | Smooth 60fps animations               |
| **React Native Gesture Handler** | Touch & swipe gestures                |
| **Lottie React Native**          | Beautiful vector animations           |

### Why These Libraries?

- **React Query**: Handles API calls, caching, and automatic refetching. Perfect for managing server data.
- **Recoil**: Manages global app state (user ID, UI state) with minimal boilerplate.
- **Axios**: Reliable HTTP client with interceptors for logging and error handling.
- **Reanimated + Gesture Handler**: Industry standard for performant animations and gestures on mobile.

---

## Setup & Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### 1. Clone & Install

```bash
cd tinder-mobile
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.31.144:8000/api/v1
EXPO_PUBLIC_USER_ID=1
```

**Important**: Replace `192.168.31.144` with your machine's IP address.

To find your IP:

```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

### 3. Start Backend

Ensure your Laravel backend is running:

```bash
cd tinder-backend
php artisan serve --host=0.0.0.0 --port=8000
```

### 4. Start Frontend

```bash
npx expo start --clear
```

### 5. Run on Device

- **Physical Device**: Scan QR code with Expo Go app
- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`

---

## Developer

**Developed with ❤️ by Muskan**

---

## 📄 License

This project is for educational purposes.

---

**Happy Swiping! 💖**
