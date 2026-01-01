import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Favourites from "./Favourites";

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Favourites component", () => {
  it("renders favourite properties when favourites exist", () => {
    const allProperties = [
      {
        id: "p1",
        type: "House",
        price: 300000,
      },
      {
        id: "p2",
        type: "Flat",
        price: 200000,
      },
    ];

    const favourites = ["p1"];

    render(
      <Favourites
        favourites={favourites}
        allProperties={allProperties}
        onAddFavourite={() => {}}
      />
    );

    expect(
      screen.getByText(/house/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/£300,000/i)
    ).toBeInTheDocument();

    // Ensure non-favourite is not shown
    expect(
      screen.queryByText(/flat/i)
    ).not.toBeInTheDocument();
  });

  it("shows empty state when no favourites exist", () => {
    render(
      <Favourites
        favourites={[]}
        allProperties={[]}
        onAddFavourite={() => {}}
      />
    );

    expect(
      screen.getByText(/no favourite properties yet/i)
    ).toBeInTheDocument();
  });
});
