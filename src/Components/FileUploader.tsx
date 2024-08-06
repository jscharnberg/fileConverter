import React, { useState, useRef } from 'react';
import './FileUploader.css';

export default function FileUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [outputFormat, setOutputFormat] = useState<string>('');
    const [fileType, setFileType] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOutputFormat(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setFileType(file.type.split('/')[0]); // 'image' or 'video'
            setDownloadUrl(null);
        }
    };

    const handleConvertAndDownload = () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        if (fileType === 'image') {
            convertImage();
        } else if (fileType === 'video') {
            convertVideo();
        }

    };

    const convertImage = () => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Convert to selected format
                    // const imageUrl = canvas.toDataURL(`image/${outputFormat}`);
                    // setDownloadUrl(imageUrl);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            downloadFile(url, `converted-image.${outputFormat}`);
                        }
                    }, `image/${outputFormat}`);
                }
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(selectedFile!);
    };

    const convertVideo = () => {
        console.log("video start");

        // Note: This example assumes conversion can be done client-side, but real video conversion usually requires server-side processing.
        const reader = new FileReader();
        reader.onload = (event) => {
            const videoUrl = event.target?.result as string;
            downloadFile(videoUrl, `converted-video.${outputFormat}`);
        };
        reader.readAsDataURL(selectedFile!);
    };

    const downloadFile = (url: string, filename: string) => {

        console.log("download start");
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onload = () => {
            if (xhr.status === 200) {
                const blob = xhr.response;
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(downloadUrl);
            }
        };

        xhr.onerror = () => {
            console.error('Download failed');
        };

        xhr.send();
    };

    return (
        <div className="file-uploader">
            {!selectedFile && (
                <button onClick={handleButtonClick}>Select File</button>
            )}
            <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {selectedFile && (
                <>
                    {fileType === 'image' && (
                        <select value={outputFormat} onChange={handleFormatChange}>
                            <option value="png">PNG</option>
                            <option value="jpeg">JPEG</option>
                            <option value="webp">WEBP</option>
                            <option value="bmp">BMP</option>
                            <option value="gif">GIF</option>
                        </select>
                    )}
                    {fileType === 'video' && (
                        <select value={outputFormat} onChange={handleFormatChange}>
                            <option value="mp4">MP4</option>
                            <option value="webm">WEBM</option>
                            <option value="ogv">OGV</option>
                        </select>
                    )}
                    <button onClick={handleConvertAndDownload}>Convert and Download</button>
                    {/* <button onClick={handleConvertAndDownload}>Convert and Download</button> */}
                    {/* {downloadUrl && (
                        <a href={downloadUrl} download={`converted-file.${outputFormat}`}>
                            Download {outputFormat.toUpperCase()}
                        </a>
                    )} */}
                </>
            )}
        </div>
    );
}
