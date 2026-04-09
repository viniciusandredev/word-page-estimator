import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Selecionar arquivo
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Enviar arquivo
  const handleUpload = async () => {
    if (!file) {
      alert("Selecione um arquivo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar arquivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>📄 Estimador de Páginas</h1>

      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
      />

      <button onClick={handleUpload} style={styles.button}>
        Enviar arquivo
      </button>

      {loading && <p>Processando arquivo...</p>}

      {result && (
        <div style={styles.result}>
          <h2>Resultado</h2>

          <p>
            <strong>Arquivo:</strong> {result.fileName}
          </p>

          <p>
            <strong>Palavras:</strong> {result.wordCount}
          </p>

          <h3>Estimativa de páginas:</h3>

          <ul>
            {result.estimates.map((item, index) => (
              <li key={index}>
                {item.format}: {item.pages} páginas
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    marginTop: "50px",
  },

  button: {
    marginLeft: "10px",
    padding: "8px 15px",
    cursor: "pointer",
  },

  result: {
    marginTop: "30px",
  },
};

export default App;