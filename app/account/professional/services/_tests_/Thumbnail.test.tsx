import React, { SetStateAction } from "react";
import { fireEvent, render } from "@testing-library/react";
import Thumbnail from "../components/Thumbnail";
import mockProfessional from "@/__mocks__/mockProfessional";
import mockThumbnail from "@/__mocks__/mockThumbnail";
import mockDefaultServiceForm from "@/__mocks__/mockDefaultServiceForm";
import { Tables } from "@/database";
import { act } from "react-dom/test-utils";

let mockLoading: boolean;
let mockImage: Tables<"files"> | null;
let mockError: any;
const mockRemoveImage = () => {
  mockImage = null;
};

// Mock the useImageUpload hook to control its behavior during testing
jest.mock("../../../../../hooks/useImageUpload.ts", () => () => {
  return {
    loading: mockLoading,
    image: mockImage,
    setImage: jest.fn(),
    error: mockError,
    handleImageUpload: jest.fn(),
    removeImage: mockRemoveImage,
  };
});

describe("Thumbnail Component", () => {
  let formData: Tables<"services">;
  let thumbnail: Tables<"files">;
  let professional: Tables<"professionals">;
  let setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;

  beforeEach(() => {
    formData = { ...mockDefaultServiceForm };
    professional = mockProfessional;
    thumbnail = mockThumbnail;
    setFormData = (state) => {
      formData = { ...formData, ...state };
    };
  });

  it("renders with no thumbnail and no image", () => {
    const { getByLabelText } = render(
      <Thumbnail
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    const labelText = getByLabelText("Upload a file");
    expect(labelText).toBeTruthy();
  });

  it("renders with a thumbnail and no image and with a image and no thumbnail", () => {
    formData = {
      ...mockDefaultServiceForm,
      thumbnail: JSON.stringify(thumbnail),
    };

    mockImage = thumbnail;

    const { getByTestId } = render(
      <Thumbnail
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    const image = getByTestId("thumbnail");
    expect(image).toBeTruthy();
  });

  it("renders an loading state", () => {
    mockLoading = true;
    mockImage = null;
    const { getByTestId } = render(
      <Thumbnail
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );
    const warning = getByTestId("loading");
    expect(warning).toBeTruthy();
  });

  it("renders a error message", () => {
    mockError = { message: "test error " };
    const { getByText } = render(
      <Thumbnail
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );
    const warning = getByText("test error");
    expect(warning).toBeTruthy();
  });

  it("renders back to input after deleting the image", async () => {
    mockImage = thumbnail;
    mockLoading = false;

    const { getByTestId, getByLabelText, rerender } = render(
      <Thumbnail
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );
    const removeButton = getByTestId("delete");
    expect(removeButton).toBeTruthy();

    await act(async () => {
      fireEvent.click(removeButton);
    });

    mockImage = null;
    formData = { ...mockDefaultServiceForm, thumbnail: null };

    rerender(
      <Thumbnail
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    const labelText = getByLabelText("Upload a file");
    expect(labelText).toBeTruthy();
  });
});
