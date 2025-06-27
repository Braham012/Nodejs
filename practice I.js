const express = require("express");
const app = express();
const port = 8000;
app.use(express.json());

/*getSQRT route that takes a number and send the square root in response*/
app.get("/getSqrt", (req, res) => {
  const num = req.query.num;

  const sqrt = Math.sqrt(num);
  res.send(`The Square Root of the number is: ${sqrt}`);
});

/*time its send back the current time in response*/

app.get("/time", (req, res) => {
  const time = new Date();
  res.send(`The current time is: ${time}`);
});

/*add num1, num2 res a+b*/

app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  const sum = num1 + num2;
  res.send(`The sum of Numbers are : ${sum}`);
});

/*AddFruitsName its will add element in the arr in server side and send back the while array in response */

let fruits = ["Apple", "Pineapple", "Mango"];
app.post("/Fruitlist", (req, res) => {
  const Fruitname = req.body.Fruitname;
  fruits.push(Fruitname);
  res.send(fruits);
});
app.listen(port, () => {
  console.log(`Your server is running at http://localhost:${port}`);
});

/*addnotes add notes to the file that will be created on server by fs */
const fs = require("fs");
app.post("/addNotes", (req, res) => {
  const note = req.body.note;

  if (!fs.existsSync("notes.txt")) {
    fs.writeFileSync("notes.txt", note);
    res.send(`File Created Successfully! \n First Note added: ${note}`);
  } else {
    fs.appendFileSync("notes.txt", `\n${note}`);
    res.send(
      `New Note added: \n ${note} \n
      All Notes: \n ${fs.readFileSync("notes.txt", "utf8")}`
    );
  }
});
