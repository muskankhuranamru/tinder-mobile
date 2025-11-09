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

https://drive.google.com/file/d/1zT6Moq2Aax0d24YLs3bk-6qO_NdjfWBK/view?usp=sharing

_Full app walkthrough showing splash, swiping, liked people, and profile screens_

### Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/51ca1e09-3867-4bea-a778-66a8b7488469" width="200" alt="ss-1" />
  <img src="https://github.com/user-attachments/assets/2238e01b-4342-4af4-ac14-064d53706565" width="200" alt="ss-2" />
  <img src="https://github.com/user-attachments/assets/7f30438f-5f4c-4ff2-a4a4-d319456b77bf" width="200" alt="ss-3" />
  <img src="https://github.com/user-attachments/assets/96ebbfa3-a05a-46e2-8a8a-bec4bc2d9dae" width="200" alt="ss-4" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/086a7e9e-0ac7-4177-a2d6-96a036a9108f" width="200" alt="ss-5" />
  <img src="https://github.com/user-attachments/assets/1986c177-324e-47f3-b808-b55e8fe2a8d2" width="200" alt="ss-6" />
  <img src="https://github.com/user-attachments/assets/f3e637e2-7f4d-4dab-9bfd-1c05ad2f885d" width="200" alt="ss-7" />
  <img src="https://github.com/user-attachments/assets/47345da9-170c-4a3a-91ae-abcabf92e077" width="200" alt="ss-8" />
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
