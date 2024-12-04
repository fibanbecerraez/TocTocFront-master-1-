import React from 'react';
import 'intl-pluralrules';
import '../config/i18n';
import { NetworkProvider } from '../utils/NetworkContext';
import AppContent from './appContent';

export default function App() {
  return (
    <NetworkProvider>
      <AppContent />
    </NetworkProvider>
  );
}
