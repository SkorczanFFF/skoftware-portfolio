import React from 'react';
import '@testing-library/jest-dom';

jest.mock('next/router', () => require('next-router-mock'));

// Vercel client components ship ESM Jest cannot parse.
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => React.createElement(React.Fragment),
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => React.createElement(React.Fragment),
}));
