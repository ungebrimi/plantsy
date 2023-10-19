import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceForm from "../components/ServiceForm";
import mockProfessional from "@/__mocks__/mockProfessional";
import mockDefaultServiceForm from "@/__mocks__/mockDefaultServiceForm";

// Mock the dependencies of the component as needed
jest.mock("@supabase/auth-helpers-nextjs", () => {
  return {
    createClientComponentClient: jest.fn(),
  };
});

// Mock the useRouter function
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
    }),
  };
});

// Mock the child components like Thumbnail, City, Images, etc.
jest.mock("../components/Thumbnail", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="thumbnail" />;
    },
  };
});

jest.mock("../components/ServiceCategory", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="ServiceCategory" />;
    },
  };
});

// jest.mock("../components/City", () => {
//   return {
//     __esModule: true,
//     default: () => {
//       return <div data-testid="city" />;
//     },
//   };
// });

jest.mock("../components/Images", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="images" />;
    },
  };
});

// Mock the Keywords component if needed

describe("ServiceForm Component", () => {
  it("renders the form with initial values", () => {
    // Mock the professional and service data
    render(
      <ServiceForm
        professional={mockProfessional}
        service={{ ...mockDefaultServiceForm, title: "Title" }}
        edit={false}
      />,
    );

    // Add assertions to check if the form is initially filled with the provided service data
    expect(screen.getByLabelText("Title")).toBe("Title");
    // Check other input fields as needed
  });

  it.skip("updates the form when input values change", async () => {
    render(
      <ServiceForm
        professional={mockProfessional}
        service={mockDefaultServiceForm}
        edit={false}
      />,
    );

    const titleInput = screen.getByLabelText("Title");
    userEvent.clear(titleInput);
    userEvent.type(titleInput, "New Service Title");

    // Add assertions to check if the input value is updated
    // expect(titleInput).toHaveValue('New Service Title');
    // Repeat this for other input fields
  });

  it.skip("submits the form with new data", async () => {
    // Mock createClientComponentClient and useRouter functions as needed

    render(
      <ServiceForm
        professional={mockProfessional}
        service={mockDefaultServiceForm}
        edit={false}
      />,
    );

    const titleInput = screen.getByLabelText("Title");
    userEvent.clear(titleInput);
    userEvent.type(titleInput, "New Service Title");

    // You can use fireEvent or userEvent to submit the form
    fireEvent.submit(screen.getByRole("button", { name: "Save" }));
    // OR
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    // Add assertions to check if the form is submitted, and check the submission logic
    // You might want to mock the API calls and check if the API is called correctly
  });

  // You can add more test cases to cover various scenarios
});
