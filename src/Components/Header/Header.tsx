import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

library.add(faCircleInfo);


export default function Header() {
    return (
        <header className='header'>
            <a href="/" className="logo">Jan's file</a>
            <Dialog>
                <DialogTrigger asChild>
                    <button className='header-right'>
                        <FontAwesomeIcon icon={faCircleInfo} size='2x' />
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Information</DialogTitle>
                    </DialogHeader>
                    <div>
                        With Jan's file converter you can convert many files to other formats, completely free and open source.  The conversion is done on your device, without any communication to servers and therefore no user data is processed. Supported File Formats can be found below.
                        <br /><br />
                        <div>
                            Any Image Formats to: PNG, JPEG, WEBP, BMP, GIF <br />
                            Any Video Formats to: MP4, WEBM, OGV
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </header>
    );
}
