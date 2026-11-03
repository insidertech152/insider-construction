import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './i18n/context';
import { RoleProvider } from './context/RoleContext';
import { ToastProvider } from './components/ui/toast';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { ShellDemoPage } from './pages/ShellDemoPage';
import { PatternsDemoPage } from './pages/PatternsDemoPage';
import { ReferenceComparePage } from './pages/ReferenceComparePage';
import { FontSpecimenPage } from './pages/FontSpecimenPage';

export default function App() {
  return (
    <I18nProvider>
      <RoleProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/reference-compare" element={<ReferenceComparePage />} />
              <Route path="/font-specimen" element={<FontSpecimenPage />} />
              <Route path="/patterns-demo" element={<PatternsDemoPage />} />
              <Route path="/shell-demo" element={<ShellDemoPage />} />
              <Route path="/design-system" element={<DesignSystemPage />} />
              <Route path="*" element={<Navigate to="/reference-compare" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </RoleProvider>
    </I18nProvider>
  );
}

