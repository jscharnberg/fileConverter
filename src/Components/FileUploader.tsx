import React, { useState, useRef } from 'react';
import './FileUploader.css';
import { faX, faUpload } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"

library.add(faX);
library.add(faUpload);

export default function FileUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [outputFormat, setOutputFormat] = useState<string>('');
    const [fileType, setFileType] = useState<string>('');
    const [isConverting, setIsConverting] = useState<boolean>(false);
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
        }
    };

    const handleConvertAndDownload = () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        setIsConverting(true);

        if (fileType === 'image') {
            convertImage();
        } else if (fileType === 'video') {
            convertVideo();
        }

        setIsConverting(false);

    };

    const convertImage = () => {
        if (outputFormat == '') {
            setOutputFormat('png');
        }

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
                            if (selectedFile) {
                                downloadFile(url, `${selectedFile.name.replace(/\.[^/.]+$/, "")}.${outputFormat}`);

                            }
                        }
                    }, `image/${outputFormat}`);
                }
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(selectedFile!);
    };

    const convertVideo = () => {
        if (outputFormat == '') {
            setOutputFormat('mp4');
        }
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

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            setFileType(file.type.split('/')[0]); // 'image' or 'video'
        }
    };

    const closeCard = () => {
        setSelectedFile(null);
        setOutputFormat('');
        setFileType('');
        setIsConverting(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="file-uploader">
            {!selectedFile && (
                <>
                    <Card className='card' onClick={handleButtonClick} onDragOver={handleDragOver} onDrop={handleDrop}>
                        <CardHeader>
                        </CardHeader>
                        <CardContent>
                            <FontAwesomeIcon icon="upload" size='5x' className='upload-icon' />
                            <p className='upload-text'>Click, or drop a file here</p>

                            <input
                                type="file"
                                accept="image/*,video/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                </>
            )}
            {selectedFile && (
                <>
                    {/* <button onClick={handleConvertAndDownload}>Convert and Download</button> */}
                    {/* {downloadUrl && (
                        <a href={downloadUrl} download={`converted-file.${outputFormat}`}>
                            Download {outputFormat.toUpperCase()}
                        </a>
                    )} */}
                    <Card className='card'>
                        <CardHeader>
                            <CardTitle>Convert File</CardTitle>
                        </CardHeader>
                        <CardContent id='container'>
                            <div className='file-name'>
                                {selectedFile.name}
                            </div>
                            <div className='convert'>
                                Convert to: &nbsp;
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
                            </div>
                            <div className='close'>
                                <Button variant="ghost" onClick={closeCard}>
                                    <FontAwesomeIcon icon="x" />
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className='flex card-footer'>
                            <Button className='flex-left footer-button close-smallScreen' onClick={closeCard}>
                                Close
                            </Button>
                            <Button className='flex-left footer-button' onClick={handleConvertAndDownload}>
                                {isConverting ? <span className="spinner"></span> : 'Convert and Download'}

                            </Button>
                        </CardFooter>
                    </Card>
                </>
            )}
        </div>
    );
}
