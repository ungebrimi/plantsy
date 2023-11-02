import { DocumentIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

// Create a component to handle downloading files
const FileDownloader = ({ urls }: { urls: string[] }) => {
  const [downloadUrls, setDownloadUrls] = useState<string[]>([]);

  useEffect(() => {
    setDownloadUrls(urls);
  }, [urls]);

  const handleDownloadClick = () => {
    downloadUrls.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank"; // Open the link in a new tab
      link.rel = "noopener noreferrer";
      link.click();
    });
  };

  return (
    <div className="relative text-sm mt-2 bg-green-100 py-2 px-2 shadow rounded-xl">
      <a type="button" className="max-w-sm mt-2" onClick={handleDownloadClick}>
        <DocumentIcon className="w-12 text-gray-500 mx-auto" />
        {/* Your download icon and text */}
        <span className="text-gray-500 text-xs">
          Download {downloadUrls.length} files.
        </span>
      </a>
    </div>
  );
};

export default FileDownloader;
