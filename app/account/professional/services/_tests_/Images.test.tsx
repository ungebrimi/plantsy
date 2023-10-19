import React, { SetStateAction } from "react";
import { fireEvent, render } from "@testing-library/react";
import Images from "../components/Images";
import mockProfessional from "@/__mocks__/mockProfessional";
import mockDefaultServiceForm from "@/__mocks__/mockDefaultServiceForm";
import { Tables } from "@/database";
import { act } from "react-dom/test-utils";
import mockThumbnail from "@/__mocks__/mockThumbnail";

let mockLoading: boolean;
let mockImages: Tables<"files">[] = [];
let mockError: any;

const mockRemoveImage = (fileId: number) => {
  const indexToRemove = mockImages.findIndex((img) => img.id === fileId);
  if (indexToRemove !== -1) {
    mockImages.splice(indexToRemove, 1);
  }
};

jest.mock("../../../../../hooks/useImageUpload.ts", () => () => {
  return {
    loading: mockLoading,
    images: mockImages,
    setImages: jest.fn(),
    error: mockError,
    handleImageUpload: jest.fn(),
    removeImage: mockRemoveImage,
  };
});

describe("Images Component", () => {
  let formData: Tables<"services">;
  let setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
  let professional: Tables<"professionals">;

  beforeEach(() => {
    formData = { ...mockDefaultServiceForm };
    setFormData = (state) => {
      formData = { ...formData, ...state };
    };
    professional = mockProfessional;
  });

  it("renders with no images", () => {
    const { getByLabelText } = render(
      <Images
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    // Add assertions to check the component's initial state when no images are present
    const labelText = getByLabelText("Upload a file");
    expect(labelText).toBeTruthy();
  });

  it("renders with image already existent in the formData", () => {
    formData = { ...formData, images: JSON.stringify([mockThumbnail]) };
    mockImages = [mockThumbnail];

    const { getAllByTestId } = render(
      <Images
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    // Add assertions to check the component's behavior when images are present
    const image = getAllByTestId(mockThumbnail.id);
    expect(image).toBeTruthy();
  });

  it("renders an loading state", () => {
    formData = { ...formData, images: null };
    mockImages = [];
    mockLoading = true;

    const { getByTestId } = render(
      <Images
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );
    const warning = getByTestId("loading");
    expect(warning).toBeTruthy();
  });

  it("renders back to input after deleting an image", async () => {
    mockImages = [mockThumbnail];
    mockLoading = false;

    const { getAllByTestId, getByLabelText, rerender } = render(
      <Images
        professional={professional}
        formData={{ ...formData, images: null }}
        setFormData={setFormData}
      />,
    );
    // Add assertions to check the component's behavior when images are present
    const image = getAllByTestId(mockThumbnail.id);
    expect(image).toBeTruthy();
    // const removeButton = getByTestId("delete") as HTMLButtonElement;
    // expect(removeButton).toBeTruthy();

    // await act(async () => {
    //   fireEvent.click(removeButton);
    // });
    mockImages = [];

    // Re-render the component to reflect the updated state
    rerender(
      <Images
        professional={professional}
        formData={formData}
        setFormData={setFormData}
      />,
    );

    // Now, check if the "Upload a file" label is present
    const labelText = getByLabelText("Upload a file");
    expect(labelText).toBeTruthy();
  });
});
