import React, { SetStateAction } from "react";
import { render, fireEvent } from "@testing-library/react";
import TextInput from "../components/inputs/TextInput";
import { Tables } from "@/database";
import mockDefaultServiceForm from "@/__mocks__/mockDefaultServiceForm";
import { act } from "react-dom/test-utils";

describe("TextInput", () => {
  let formData: Tables<"services">;
  let setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
  let label: string;
  let name: string;
  let placeholder: string;
  let value: string;

  beforeEach(() => {
    formData = { ...mockDefaultServiceForm };
    setFormData = (state: any) => {
      formData = { ...formData, ...state };
    };
    label = "City";
    name = "city";
    placeholder = "City";
    value = "city";
  });

  it("renders the component with label and placeholder", () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <TextInput
        label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    // Check if the label and input element are rendered
    const labelText = getByLabelText("City");
    expect(labelText).toBeTruthy();
    const placeholderText = getByPlaceholderText("City");
    expect(placeholderText).toBeTruthy();
  });

  it("triggers the setFormData function on input change", () => {
    const { getByPlaceholderText } = render(
      <TextInput
        label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    // Act: Simulate a change event on the input
    act(() => {
      const inputElement = getByPlaceholderText(placeholder);
      fireEvent.change(inputElement, { target: { value: "New Orleans" } });
      expect(formData.city).toBe("New Orleans");
    });
  });
});
