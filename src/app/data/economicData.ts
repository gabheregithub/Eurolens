// Mock data for economic indicators
export const euCountries = [
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "AT", name: "Austria" },
  { code: "IE", name: "Ireland" },
  { code: "PT", name: "Portugal" },
  { code: "FI", name: "Finland" },
  { code: "GR", name: "Greece" },
  { code: "PL", name: "Poland" },
  { code: "SE", name: "Sweden" },
  { code: "DK", name: "Denmark" },
  { code: "CZ", name: "Czech Republic" },
];

// ECB Interest Rates historical data
export const ecbInterestRatesData = [
  { date: "2020-01", mainRate: 0.00, depositRate: -0.50, lendingRate: 0.25 },
  { date: "2020-06", mainRate: 0.00, depositRate: -0.50, lendingRate: 0.25 },
  { date: "2021-01", mainRate: 0.00, depositRate: -0.50, lendingRate: 0.25 },
  { date: "2021-06", mainRate: 0.00, depositRate: -0.50, lendingRate: 0.25 },
  { date: "2022-01", mainRate: 0.00, depositRate: -0.50, lendingRate: 0.25 },
  { date: "2022-06", mainRate: 0.50, depositRate: 0.00, lendingRate: 0.75 },
  { date: "2022-09", mainRate: 1.25, depositRate: 0.75, lendingRate: 1.50 },
  { date: "2022-12", mainRate: 2.50, depositRate: 2.00, lendingRate: 2.75 },
  { date: "2023-03", mainRate: 3.50, depositRate: 3.00, lendingRate: 3.75 },
  { date: "2023-06", mainRate: 4.00, depositRate: 3.50, lendingRate: 4.25 },
  { date: "2023-09", mainRate: 4.50, depositRate: 4.00, lendingRate: 4.75 },
  { date: "2023-12", mainRate: 4.50, depositRate: 4.00, lendingRate: 4.75 },
  { date: "2024-01", mainRate: 4.50, depositRate: 4.00, lendingRate: 4.75 },
  { date: "2024-06", mainRate: 4.25, depositRate: 3.75, lendingRate: 4.50 },
  { date: "2024-12", mainRate: 3.15, depositRate: 3.00, lendingRate: 3.40 },
  { date: "2025-06", mainRate: 2.90, depositRate: 2.75, lendingRate: 3.15 },
  { date: "2026-02", mainRate: 2.65, depositRate: 2.50, lendingRate: 2.90 },
];

// Inflation data by country (annual rate %)
export const inflationByCountry = [
  { country: "Germany", "2020": 0.5, "2021": 3.2, "2022": 8.7, "2023": 5.9, "2024": 2.2, "2025": 2.1 },
  { country: "France", "2020": 0.5, "2021": 2.1, "2022": 5.9, "2023": 4.9, "2024": 1.8, "2025": 1.6 },
  { country: "Italy", "2020": -0.1, "2021": 1.9, "2022": 8.7, "2023": 5.9, "2024": 1.7, "2025": 1.5 },
  { country: "Spain", "2020": -0.3, "2021": 3.0, "2022": 8.4, "2023": 3.4, "2024": 2.4, "2025": 2.2 },
  { country: "Netherlands", "2020": 1.1, "2021": 2.8, "2022": 11.6, "2023": 3.8, "2024": 2.7, "2025": 2.3 },
  { country: "Belgium", "2020": 0.4, "2021": 3.2, "2022": 10.3, "2023": 2.3, "2024": 3.3, "2025": 2.8 },
  { country: "Austria", "2020": 1.4, "2021": 2.8, "2022": 8.6, "2023": 7.7, "2024": 3.4, "2025": 2.9 },
  { country: "Ireland", "2020": -0.3, "2021": 2.4, "2022": 7.8, "2023": 5.2, "2024": 2.0, "2025": 1.8 },
  { country: "Portugal", "2020": -0.1, "2021": 1.3, "2022": 8.1, "2023": 5.3, "2024": 2.3, "2025": 2.0 },
  { country: "Finland", "2020": 0.4, "2021": 2.2, "2022": 7.2, "2023": 4.3, "2024": 1.2, "2025": 1.1 },
  { country: "Greece", "2020": -1.3, "2021": 0.6, "2022": 9.3, "2023": 4.2, "2024": 2.4, "2025": 2.1 },
  { country: "Poland", "2020": 3.7, "2021": 5.2, "2022": 13.8, "2023": 10.9, "2024": 4.6, "2025": 3.9 },
];

// Time series inflation data for Eurozone
export const inflationTimeSeriesData = [
  { date: "2020-01", rate: 1.4 },
  { date: "2020-06", rate: 0.3 },
  { date: "2021-01", rate: 0.9 },
  { date: "2021-06", rate: 1.9 },
  { date: "2021-12", rate: 5.0 },
  { date: "2022-01", rate: 5.1 },
  { date: "2022-06", rate: 8.6 },
  { date: "2022-09", rate: 9.9 },
  { date: "2022-12", rate: 9.2 },
  { date: "2023-03", rate: 6.9 },
  { date: "2023-06", rate: 5.5 },
  { date: "2023-09", rate: 4.3 },
  { date: "2023-12", rate: 2.9 },
  { date: "2024-03", rate: 2.4 },
  { date: "2024-06", rate: 2.5 },
  { date: "2024-09", rate: 1.7 },
  { date: "2024-12", rate: 2.4 },
  { date: "2025-06", rate: 2.2 },
  { date: "2026-02", rate: 2.1 },
];

// GDP Growth data by country (annual %)
export const gdpGrowthByCountry = [
  { country: "Germany", "2020": -3.7, "2021": 3.2, "2022": 1.8, "2023": -0.3, "2024": 0.2, "2025": 1.3 },
  { country: "France", "2020": -7.8, "2021": 6.8, "2022": 2.5, "2023": 0.9, "2024": 1.1, "2025": 1.2 },
  { country: "Italy", "2020": -9.0, "2021": 8.3, "2022": 3.7, "2023": 0.9, "2024": 0.7, "2025": 1.0 },
  { country: "Spain", "2020": -11.3, "2021": 6.4, "2022": 5.8, "2023": 2.5, "2024": 2.4, "2025": 2.2 },
  { country: "Netherlands", "2020": -3.9, "2021": 6.2, "2022": 4.3, "2023": 0.1, "2024": 0.9, "2025": 1.4 },
  { country: "Belgium", "2020": -5.3, "2021": 6.9, "2022": 3.0, "2023": 1.4, "2024": 1.3, "2025": 1.5 },
  { country: "Austria", "2020": -6.5, "2021": 4.6, "2022": 4.9, "2023": -0.8, "2024": 0.5, "2025": 1.6 },
  { country: "Ireland", "2020": 6.2, "2021": 15.0, "2022": 9.4, "2023": 3.2, "2024": 2.0, "2025": 3.5 },
  { country: "Portugal", "2020": -8.3, "2021": 5.7, "2022": 6.8, "2023": 2.3, "2024": 1.6, "2025": 2.0 },
  { country: "Finland", "2020": -2.3, "2021": 3.0, "2022": 1.3, "2023": -0.5, "2024": 0.2, "2025": 1.3 },
  { country: "Greece", "2020": -9.0, "2021": 8.4, "2022": 5.6, "2023": 2.0, "2024": 2.1, "2025": 2.3 },
  { country: "Poland", "2020": -2.0, "2021": 6.9, "2022": 5.3, "2023": 0.2, "2024": 2.9, "2025": 3.5 },
];

// Unemployment rates by country (%)
export const unemploymentByCountry = [
  { country: "Germany", rate: 3.2 },
  { country: "France", rate: 7.3 },
  { country: "Italy", rate: 7.6 },
  { country: "Spain", rate: 11.6 },
  { country: "Netherlands", rate: 3.6 },
  { country: "Belgium", rate: 5.9 },
  { country: "Austria", rate: 5.1 },
  { country: "Ireland", rate: 4.3 },
  { country: "Portugal", rate: 6.6 },
  { country: "Finland", rate: 7.4 },
  { country: "Greece", rate: 10.5 },
  { country: "Poland", rate: 3.1 },
];
