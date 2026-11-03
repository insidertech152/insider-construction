import React from 'react';
import { AppShell } from '@/src/components/shell/AppShell';
import { ReferenceCompare } from '@/src/components/patterns/ReferenceCompare';
import { useNavigate } from 'react-router-dom';

export function ReferenceComparePage() {
  const navigate = useNavigate();

  return (
    <AppShell currentRoute="/reference-compare" onNavigate={(route) => navigate(route)}>
      <ReferenceCompare />
    </AppShell>
  );
}
