"use client";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import FileModal from "./FileModal";
import useFileUpload from "@/hooks/useFileUpload";
import { FileType } from "@/dbtypes";

interface FileUploadProps {
  setFiles: React.Dispatch<SetStateAction<FileType[]>>;
  session: any;
}

const FileUpload = ({ setFiles, session }: FileUploadProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, files, error, handleFileUpload } = useFileUpload();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, `${session.user.id}/files`);
  };

  React.useEffect(() => {
    const handleFormDataUpdate = () => {
      if (error) console.error(error);
      if (files && !error) {
        setFiles(files);
      }
    };
    handleFormDataUpdate();
  }, [files, error, setFiles]);

  return (
    <div className="flow-root">
      {files.length > 0 ? (
        <div
          onClick={() => setOpenModal(!openModal)}
          className="-m-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-red-400 hover:text-gray-500"
        >
          <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Attach a file</span>
        </div>
      ) : (
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="-m-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
            <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Attach a file</span>
          </div>
          <input
            type="file"
            id="fileInput"
            className="sr-only"
            onChange={handleChange}
            multiple
            accept=".pdf, .docx, .xls, .xlsx, .txt, .md, .odt, .ods, .odp, .odg"
          />
        </label>
      )}
      {openModal && (
        <FileModal
          open={openModal}
          setOpen={setOpenModal}
          files={files}
          setFiles={setFiles}
        />
      )}
    </div>
  );
};

export default FileUpload;
