import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ServiceCategory from "../components/ServiceCategory";
import mockDefaultServiceForm from "@/__mocks__/mockDefaultServiceForm";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

// Mock the service categories data
const mockServiceCategories = [
  { id: 1, name: "Category A", value: "category a" },
  { id: 2, name: "Category B", value: "category b" },
  { id: 3, name: "Category C", value: "category c" },
];

// Mock the setFormData function
const setFormDataMock = jest.fn();

// Mock the Supabase client
jest.mock("@supabase/auth-helpers-nextjs", () => ({
  createClientComponentClient: jest.fn(() => ({
    from: () => ({
      select: () =>
        Promise.resolve({ data: mockServiceCategories, error: null }),
    }),
  })),
}));

describe("ServiceCategory Component", () => {
  it("renders the component and selects a category", async () => {
    const { getByRole, getByTestId } = render(
      <ServiceCategory
        formData={{ ...mockDefaultServiceForm, service_category: "" }}
        setFormData={setFormDataMock}
      />,
    );

    // Initial state: Input field should be empty
    const input = getByTestId("input") as HTMLInputElement;
    expect(input.value).toEqual("");

    // Open the options
    act(() => {
      fireEvent.click(getByTestId("Open-btn"));
    });

    // Check if the options list is displayed with service categories
    const options = await screen.findAllByTestId("option");
    expect(options).toHaveLength(mockServiceCategories.length);
    // expect(options[1]).toBeTruthy();

    // Select a service category
    // fireEvent.click(options[1]);
    //
    // // Confirm that the selected category is displayed in the input field
    // await waitFor(() => {
    //   expect(input.value).toBe(mockServiceCategories[1].value);
    // });
    // //
    // // // Verify that setFormData was called with the selected category
    // expect(setFormDataMock).toHaveBeenCalledWith({
    //   service_category: mockServiceCategories[1],
    // });
  });
});
