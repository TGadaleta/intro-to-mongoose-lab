const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
const prompt = require("prompt-sync")();
const Customer = require("./models/customer");

const connect = async () => {
  await mongoose.connect(process.env.LOCAL_MONGODB_URI);
  process.stdout.write('\x1Bc') //ChatGPT
  console.log("Welcome to the MCR CRM!\n");
  chooseMethod()
};

const chooseMethod = async () => {
  console.log("What would you like to do?\n");
  console.log("  1. Create a customer");
  console.log("  2. View all customers");
  console.log("  3. Update a customer");
  console.log("  4. Delete a customer");
  console.log("  5. Quit\n");
  let methodNum = prompt("Number of action to run: ");
  console.log(methodNum);
};

const createCustomer = async () => {
    const customerName = prompt("Enter the new customers name: ");
    const customerAge = prompt("Enter the customer's age: ");

    const customerRecord = {
        name: customerName,
        age: customerAge
    }

    const customer = await Customer.create(customerRecord)
    console.log("New Customer: ", customer)
}


//connect();
connect();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);
