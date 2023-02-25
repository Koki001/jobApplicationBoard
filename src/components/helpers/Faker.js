import db from "../../firebase";
import { ref, set, push, onValue } from "firebase/database";
import { faker } from "@faker-js/faker";

const UserGenerator = () => {
  for (let i = 0; i < 10; i++) {
    push(ref(db, `/data/fakeUsers/`), {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      occupation: faker.name.jobType(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      zip: faker.address.zipCode(),
      bio: faker.lorem.paragraph(),
      phone: faker.phone.number(),
    });
  }
};
const CompanyGenerator = () => {
  for (let i = 0; i < 10; i++) {
    push(ref(db, `/data/fakeCompanies/`), {
      name: faker.company.name(),
      slogan: faker.company.catchPhrase(),
      expertise: faker.company.bs(),
      location: faker.address.city() + `, ` + faker.address.country(),
      logo: faker.image.business(250, 150),
      employeeCount: faker.random.numeric(3, { allowLeadingZeros: false }),
      description: faker.lorem.paragraph(3),
    });
  }
};
const ParagraphGenerator = (num) => {
  return faker.lorem.paragraphs(num);
};

export { UserGenerator, CompanyGenerator, ParagraphGenerator };
