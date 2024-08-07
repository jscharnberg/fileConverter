import './App.css'
import FileUploader from './Components/FileUploader'
import { ThemeProvider } from "@/Components/theme-provider"
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <h1 className='heading'>Jan's file converter</h1>
        <p>Introducing Jan's file converter – your go-to open source online tool for unlimited and free multimedia conversion, all processed locally on your device for enhanced privacy and security. Easily convert images, audio, and videos without any restrictions. Start converting now and streamline your content effortlessly with FileFlex!</p>
        <FileUploader />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
