// Factorial of a number till n


const http = require('http');
const querystring = require('querystring');
function factorial(n) {
 if (n === 0) {
 return 1;
 } else {
 return n * factorial(n - 1);
 }
}
const server = http.createServer((req, res) => {
 if (req.url === '/') {
 res.setHeader('Content-Type', 'text/html');
 res.write('<html>');
 res.write('<head><title>Factorial Calculator</title></head>');
 res.write('<body>');
 res.write('<form method="post" action="/calculate">');
 res.write('<label for="number">Enter a number:</label>');
 res.write('<input type="text" name="number" id="number">');
 res.write('<button type="submit">Calculate Factorial</button>');
 res.write('</form>');
 res.write('<p id="result"></p>');
 res.write('<script>');
 res.write('const form = document.querySelector("form");');
 res.write('const numberInput = document.getElementById("number");');
 res.write('const resultParagraph = document.getElementById("result");');
 res.write('form.addEventListener("submit", event => {');
 res.write('event.preventDefault();');
 res.write('const number = numberInput.value;');
 res.write('const request = new XMLHttpRequest();');
 res.write('request.onreadystatechange = () => {');
 res.write('if (request.readyState === 4 && request.status === 200) {');
 res.write('resultParagraph.textContent = request.responseText;');
 res.write('}');
 res.write('};');
 res.write('request.open("POST", "/calculate");');
 res.write('request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");');
 res.write('request.send(`number=${number}`);');
 res.write('});');
 res.write('</script>');
 res.write('</body>');
 res.write('</html>');
 return res.end();
} else if (req.url === '/calculate' && req.method === 'POST') {
 let requestBody = '';
 req.on('data', chunk => {
 requestBody += chunk.toString();
 });
 req.on('end', () => {
 const { number } = querystring.parse(requestBody);
 const factorialNumbers = [];
 for (let i = 0; i <= number; i++) {
 factorialNumbers.push(factorial(i));
 }
 res.setHeader('Content-Type', 'text/plain');
 res.end(factorialNumbers.toString());
 });
 } else {
 res.statusCode = 404;
 res.setHeader('Content-Type', 'text/html');
 res.write('<html>');
 res.write('<head><title>404 Not Found</title></head>');
 res.write('<body><h1>404 Not Found</h1></body>');
 res.write('</html>');
 return res.end();
 }
});
const PORT = 3000;
server.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});