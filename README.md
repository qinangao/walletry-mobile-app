# Expense Tracker App

A simple and intuitive expense tracking mobile application built with React Native and Expo. Track your income and expenses while monitoring your real-time balance with secure authentication powered by Clerk.

## Features

- **Transaction Management**: Add and delete income/expense entries
- **Real-time Balance**: Live calculation of current balance based on all transactions
- **Secure Authentication**: Complete user authentication flow with Clerk
  - User signup and login
  - Secure logout functionality
  - Email verification with 6-digit code
- **User-friendly Interface**: Clean and intuitive design for easy expense tracking

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **Clerk** - Authentication and user management
- **Expo Go** - For development and testing

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd expense-tracker-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Clerk configuration:

   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

4. **Configure Clerk**
   - Sign up at [clerk.com](https://clerk.com)
   - Create a new application
   - Enable email authentication
   - Configure email verification settings
   - Copy your publishable key to the `.env` file

## Running the App

1. **Start the development server**

   ```bash
   npx expo start
   ```

2. **Run on your device**
   - Open the Expo Go app on your mobile device
   - Scan the QR code displayed in your terminal or browser
   - The app will load on your device

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:

- Check the troubleshooting section above
- Review [Expo documentation](https://docs.expo.dev/)
- Check [Clerk documentation](https://clerk.com/docs)
- Create an issue in this repository

---

**Happy expense tracking! 💰📱**
