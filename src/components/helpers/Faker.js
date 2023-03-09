import {db} from "../../firebase";
import { ref, set, push, onValue } from "firebase/database";
import { faker } from "@faker-js/faker";
import BuzzWords from "./BuzzWords";
import * as dayjs from "dayjs";
const Shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, 100);
};
const UserGenerator = (num) => {
  for (let i = 0; i < num; i++) {
    push(ref(db, `/data/users`), {
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
const CompanyGenerator = (num) => {
  for (let i = 0; i < num; i++) {
    push(ref(db, `/data/companies`), {
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
const JobGenerator = (num) => {
  const date = new Date()
  const typeArray = ["full-time", "part-time", "contract"];
  const expArray = ["junior", "intermediate", "senior"];
  for (let i = 0; i < num; i++) {
    let salary = faker.finance.amount(20000, 250000, 0);
    push(ref(db, `/data/jobs`), {
      title: faker.name.jobTitle(),
      description: faker.lorem.paragraphs(3),
      overview: faker.lorem.paragraphs(1),
      responsibilities: [
        faker.lorem.sentences(2),
        faker.lorem.sentences(2),
        faker.lorem.sentences(2),
        faker.lorem.sentences(2),
      ],
      required: [
        faker.lorem.sentences(1),
        faker.lorem.sentences(1),
        faker.lorem.sentences(1),
      ],
      benefits: [
        faker.lorem.sentences(1),
        faker.lorem.sentences(1),
        faker.lorem.sentences(1),
        faker.lorem.sentences(1),
        faker.lorem.sentences(1),
      ],
      category: faker.name.jobType(),
      type: typeArray[Math.floor(Math.random() * typeArray.length)],
      salary: salary,
      salaryMin: Number(salary) - 5000,
      salaryMax: Number(salary) + 10000,
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      experience: expArray[Math.floor(Math.random() * expArray.length)],
      skills: Shuffle(BuzzWords),
      logo: faker.image.abstract(100, 100, true),
      createdOn: dayjs().format("dddd/MM/YYYY"),
      dateMs: date.getTime(),
    });
  }
};

export { UserGenerator, CompanyGenerator, ParagraphGenerator, JobGenerator };
