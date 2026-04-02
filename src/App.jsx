import { useEffect, useRef, useState } from 'react'
import { Check, Download, Globe, Image as ImageIcon, Upload } from 'lucide-react'
import './App.css'

function App() {
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const canvasRef = useRef(null)
  const targetWidth = 320
  const targetHeight = 132

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (loadEvent) => {
      setImage(loadEvent.target?.result ?? null)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return

      tempCanvas.width = img.width
      tempCanvas.height = img.height
      tempCtx.drawImage(img, 0, 0)

      const pixel = tempCtx.getImageData(10, 10, 1, 1).data
      const bgColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, targetWidth, targetHeight)

      const scale = targetHeight / img.height
      const drawHeight = targetHeight
      const drawWidth = img.width * scale
      const xOffset = (targetWidth - drawWidth) / 2

      ctx.drawImage(img, xOffset, 0, drawWidth, drawHeight)
      setPreviewUrl(canvas.toDataURL('image/png'))
    }

    img.src = image
  }, [image])

  const downloadImage = () => {
    if (!previewUrl) return

    const link = document.createElement('a')
    link.download = 'logo_google_workspace_320x132.png'
    link.href = previewUrl
    link.click()
  }

  return (
    <main className="app-shell">
      <section className="card">
        <header className="header">
          <h1>
            <ImageIcon size={24} />
            Adaptador de Logo
          </h1>
          <p>Formato para Google Workspace: 320 x 132 px</p>
          <p className="subtitle">
            Sube un logo, ajusta automaticamente y descarga en PNG listo para usar.
          </p>
        </header>

        {!image && (
          <label className="upload-zone">
            <Upload size={44} />
            <strong>Haz clic para subir tu logo</strong>
            <span>PNG o JPG, se ajusta automaticamente.</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        )}

        <canvas
          ref={canvasRef}
          width={targetWidth}
          height={targetHeight}
          className="hidden"
        />

        {previewUrl && (
          <div className="preview-wrap">
            <p className="label">Vista Previa Real (320x132)</p>
            <div className="checkered-bg">
              <img src={previewUrl} alt="Logo procesado" className="result-image" />
            </div>

            <div className="checks">
              <span><Check size={16} />Dimensiones: 320 x 132 px</span>
              <span><Check size={16} />Proporcion mantenida</span>
              <span><Check size={16} />Fondo extendido automaticamente</span>
              <span><Check size={16} />Salida PNG</span>
            </div>

            <div className="actions">
              <button className="btn secondary" onClick={() => setImage(null)}>
                Subir otro
              </button>
              <button className="btn primary" onClick={downloadImage}>
                <Download size={18} />
                Descargar logo
              </button>
            </div>
          </div>
        )}

        <footer className="footer-note">
          <Globe size={15} />
          Listo para web y portafolio en GitHub.
        </footer>
      </section>
    </main>
  )
}

export default App
