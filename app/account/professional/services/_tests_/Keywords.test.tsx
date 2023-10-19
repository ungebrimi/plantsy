import { render, fireEvent } from "@testing-library/react";
import Keywords from "../components/Keywords";
import mockDefaultServiceForm from "@/__mocks__/mockDefaultServiceForm";
import { Tables } from "@/database";
import { act } from "react-dom/test-utils";
import { SetStateAction } from "react";

describe("Keywords Component", () => {
  let formData: Tables<"services">;
  let setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;

  beforeEach(() => {
    formData = { ...mockDefaultServiceForm };
    setFormData = (state) => {
      formData = { ...formData, ...state };
    };
  });

  test("should render the component", () => {
    const { getByText } = render(
      <Keywords formData={formData} setFormData={setFormData} />,
    );

    const element = getByText("Keywords (5 maximum)");
    expect(element).toBeTruthy();
  });

  it("should add a keyword", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Keywords
        formData={{ ...formData, keywords: [] }}
        setFormData={setFormData}
      />,
    );

    const input = getByPlaceholderText(
      "Write your keywords here",
    ) as HTMLInputElement;
    const addButton = getByTestId("Add");

    act(() => {
      fireEvent.change(input, { target: { value: "Test Keyword" } });
      expect(input.value).toBe("Test Keyword");
      fireEvent.click(addButton);
    });
    expect(formData.keywords).toContain("Test Keyword");
    expect(input.value).toBe("");
  });

  it("should not add a keyword when keywords length is 5", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Keywords
        formData={{ ...formData, keywords: ["1", "2", "3", "4", "5"] }}
        setFormData={setFormData}
      />,
    );

    const input = getByPlaceholderText("Write your keywords here");
    const addButton = getByTestId("Add");

    fireEvent.change(input, { target: { value: "Test Keyword" } });
    fireEvent.click(addButton);

    // Add the assertion to check that the keyword was not added
    expect(formData.keywords).not.toContain("Test Keyword");
  });

  it("should not add a keyword when input is empty", () => {
    const { getByTestId } = render(
      <Keywords formData={formData} setFormData={setFormData} />,
    );

    const addButton = getByTestId("Add");
    fireEvent.click(addButton);

    // Add the assertion to check that the keyword was not added
    expect(formData.keywords).toEqual([]);
  });

  it("should remove a keyword", () => {
    const { getByTestId } = render(
      <Keywords
        formData={{ ...formData, keywords: ["test"] }}
        setFormData={setFormData}
      />,
    );

    const removeButton = getByTestId("Remove");
    act(() => {
      fireEvent.click(removeButton);
      expect(formData.keywords).toEqual([]);
    });
    // Add the assertion to check that the keyword was removed
  });
});
