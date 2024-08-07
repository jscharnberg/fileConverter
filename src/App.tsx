import './App.css'
import FileUploader from './Components/FileUploader/FileUploader'
import { ThemeProvider } from "@/Components/theme-provider"
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Impressum from './Components/Pages/Impressum/Impressum'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Router>
          <Header />
          <div className='content'>

            <Routes>
              <Route path='/' element={
                <>
                  <h1 className='heading'>Jan's file converter</h1>
                  <p>Introducing Jan's file converter – your go-to open source online tool for unlimited and free multimedia conversion, all processed locally on your device for enhanced privacy and security. Easily convert images, audio, and videos without any restrictions. Start converting now and streamline your content effortlessly with FileFlex!</p>
                  <FileUploader />
                </>
              } />
              <Route path="/impressum" element={<Impressum />} />
            </Routes>


          </div>


          <Footer />
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
