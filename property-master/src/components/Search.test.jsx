import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search component", () => {
  it("calls onSearch with default filter values when search button is clicked", async () => {
    const user = userEvent.setup();
    const onSearchMock = vi.fn();

    render(<Search onSearch={onSearchMock} />);

    const searchButton = screen.getByRole("button", {
      name: /search properties/i,
    });

    await user.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledOnce();

    expect(onSearchMock).toHaveBeenCalledWith({
      price: 1500000,
      bedrooms: 5,
      type: "Any",
      postcode: "",
      dateFrom: null,
    });
  });
});
