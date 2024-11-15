const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
const prompt = require("prompt-sync")();
const Customer = require("./models/customer");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  process.stdout.write('\x1Bc') //ChatGPT
  console.log("Welcome to the MCR CRM!");
  chooseMethod();
};

const chooseMethod = async () => {
  console.log("\nWhat would you like to do?\n");
  console.log("  1. Create a customer");
  console.log("  2. View all customers");
  console.log("  3. Update a customer");
  console.log("  4. Delete a customer");
  console.log("  5. Quit\n");
  let methodNum = prompt("Number of action to run: ");
  
  switch (methodNum) {
    case '1':
        createCustomer();
        break;
    case '2':
        viewAllCustomers();
        break
    case '5':
        await mongoose.disconnect();
        console.log('\nTo the end...');
        process.exit();
    default:
        process.stdout.write('\x1Bc')
        console.log("\nI'm afraid I can't do that. Choose again.")
        chooseMethod();
        break;
  }
};

const createCustomer = async () => {
    process.stdout.write('\x1Bc')
    const customerName = prompt("Enter the new customers name: ");
    const customerAge = prompt("Enter the customer's age: ");

    const customerRecord = {
        name: customerName,
        age: customerAge
    }

    const customer = await Customer.create(customerRecord)
    console.log("\nNew Customer:", customer.name, customer.age)
    chooseMethod();
}

const viewAllCustomers = async () => {
    const allCustomers = await Customer.find({});
    process.stdout.write('\x1Bc')
    console.log('Here are all the customers in your database:\n')
    allCustomers.forEach(customer => {
        console.log(`id: ${customer._id.toString()}`, `--`, `Name: ${customer.name}, Age: ${customer.age}`)
    })
    prompt("\nPress enter to continue.")
    chooseMethod();
}

const updateCustomer = async () => {

}

//connect();
connect();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);
