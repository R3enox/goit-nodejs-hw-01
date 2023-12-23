const contacts = require("./contacts");

const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      break;
    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      console.table(addContact);
      break;
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;
    case "update":
      const updateContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      console.table(updateContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
