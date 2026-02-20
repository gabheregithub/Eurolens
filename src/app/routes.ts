import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { InterestRates } from "./components/InterestRates";
import { Inflation } from "./components/Inflation";
import { CountryComparison } from "./components/CountryComparison";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "interest-rates", Component: InterestRates },
      { path: "inflation", Component: Inflation },
      { path: "comparison", Component: CountryComparison },
      { path: "*", Component: NotFound },
    ],
  },
]);
