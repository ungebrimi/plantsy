"use client";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import FileModal from "./FileModal";
import useFileUpload from "@/hooks/useFileUpload";
import { Tables } from "@/database";
import { Session } from "@supabase/supabase-js";

interface FileUploadProps {
  files: Tables<"files">[];
  setFiles: React.Dispatch<SetStateAction<Tables<"files">[]>>;
  session: Session;
}

const FileUpload = ({ files, setFiles, session }: FileUploadProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, response, error, handleFileUpload } = useFileUpload();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, `${session.user.id}/files`);
  };

  React.useEffect(() => {
    const handleFormDataUpdate = () => {
      if (error) console.error(error);
      if (response && !error) {
        setFiles(response);
      }
    };
    handleFormDataUpdate();
  }, [response, error, setFiles]);

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
        <>
          {loading ? (
            <PaperClipIcon
              className="h-6 w-6 animate-pulse text-gray-600"
              aria-hidden="true"
            />
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
        </>
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
