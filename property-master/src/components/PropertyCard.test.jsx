import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropertyCard from "./PropertyCard";

// ✅ Mock react-router-dom
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("PropertyCard", () => {
  const mockProperty = {
    id: "p1",
    type: "House",
    location: "London",
    bedrooms: 3,
    tenure: "Freehold",
    price: 350000,
    picture: "house1.jpg",
  };

  it("renders property details correctly", () => {
    render(
      <PropertyCard
        property={mockProperty}
        isFavourite={false}
        onToggleFavourite={() => {}}
      />
    );

    expect(screen.getByText(/house/i)).toBeInTheDocument();
    expect(screen.getByText(/london/i)).toBeInTheDocument();
    expect(screen.getByText(/3 beds/i)).toBeInTheDocument();
    expect(screen.getByText(/freehold/i)).toBeInTheDocument();
    expect(screen.getByText(/£350,000/i)).toBeInTheDocument();
  });

  it("calls onToggleFavourite when favourite button is clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    render(
      <PropertyCard
        property={mockProperty}
        isFavourite={false}
        onToggleFavourite={mockToggle}
      />
    );

    const favButton = screen.getByRole("button");

    await user.click(favButton);

    expect(mockToggle).toHaveBeenCalledOnce();
    expect(mockToggle).toHaveBeenCalledWith("p1");
  });
});
