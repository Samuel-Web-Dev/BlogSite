import path from 'path'
import fs from 'fs' 

 export function builDataPath() {
   return path.join(process.cwd(), "data", "email.json");
}
 
 export function extractedData(filePath) {
   const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
async function handler(req, res) {
  if (req.method === 'POST') {
    const UserEmail = req.body.email
    
    if (!UserEmail || !UserEmail.includes('@')) {
      res.status(422).json({message: 'Invalid Email Address'})
    }

    
    const filePath = builDataPath();
    const data = extractedData(filePath)
      data.push(UserEmail)
      fs.writeFileSync(filePath, JSON.stringify(data))
  }
}

export default handler;