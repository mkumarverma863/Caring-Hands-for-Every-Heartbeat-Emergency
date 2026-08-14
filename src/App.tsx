/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DeviceProvider } from './context/DeviceContext';
import { AlertProvider } from './context/AlertContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HealthPage from './pages/HealthPage';
import FallDetectionPage from './pages/FallDetectionPage';
import SOSPage from './pages/SOSPage';
import LocationPage from './pages/LocationPage';
import DevicePage from './pages/DevicePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DeviceProvider>
            <AlertProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Application Routes */}
                <Route
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/health" element={<HealthPage />} />
                  <Route path="/falls" element={<FallDetectionPage />} />
                  <Route path="/sos" element={<SOSPage />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/device" element={<DevicePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AlertProvider>
          </DeviceProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
