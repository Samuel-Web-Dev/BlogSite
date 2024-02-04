import path from "path";
import fs from "fs";

export function buildDataPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractedData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function filteredComment(data, eventId) {
  const filteredArray = data.filter((comment) => comment.eventId === eventId);
  return filteredArray;
 }

function handler(req, res) {
  const eventId = req.query.eventId;
  
  if (req.method === "POST") {
    const { email, text, name } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      !name.trim() ||
      !text ||
      !text.trim()
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
      id: new Date().toISOString(),
    };


    const filePath = buildDataPath();
    const data = extractedData(filePath);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    const filteredArray = filteredComment(data, eventId)

    res.status(201).json({ message: "Added Comment", comments: filteredArray });
  } else {
    const filePath = buildDataPath(); 
    const data = extractedData(filePath);
    const filteredArray = filteredComment(data, eventId)

    res.status(200).json({message: 'fetch comment', comments: filteredArray})
  }
}

export default handler;
