export function generateApiUri() {
  return process.env.REACT_APP_API_URL &&
    !process.env.REACT_APP_API_URL.includes("localhost")
    ? `https://${process.env.REACT_APP_API_URL}`
    : "http://localhost:8000";
}

export function generateAppUri() {
  return process.env.REACT_APP_URL &&
    !process.env.REACT_APP_URL.includes("localhost")
    ? `https://${process.env.REACT_APP_URL}`
    : "http://localhost:3000";
}
