export default function generateUri() {
  return process.env.REACT_APP_API_URL &&
    !process.env.REACT_APP_API_URL.includes("localhost")
    ? `https://${process.env.REACT_APP_API_URL}`
    : "http://localhost:8000";
}
