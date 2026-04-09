import { parseTxt } from "../services/fileParser.js";
import { countWords } from "../services/wordCounter.js";
import { estimatePages } from "../services/pageEstimator.js";

export function uploadFile(req, res) {

  try {

    const filePath = req.file.path;

    const text = parseTxt(filePath);

    const wordCount = countWords(text);

    const estimates = estimatePages(wordCount);

    res.json({
      fileName: req.file.originalname,
      wordCount,
      estimates
    });

  } catch (error) {

    res.status(500).json({
      error: "Erro ao processar arquivo"
    });

  }

}