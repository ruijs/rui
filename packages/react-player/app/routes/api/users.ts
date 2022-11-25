import {ActionFunction, json, LoaderFunction} from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  return body;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const users = [
    {
      id: 1,
      "account": "imzshh",
      "email": "imzshh@gmail.com",
      "password": "pass",
      "age": 38,
      "programingLanguages": [
          "C#",
          "JavaScript",
      ]
    },
    {
      id: 2,
      "account": "fossil",
      "email": "fossil.zhu@jimengio.com",
      "password": "pass",
      "age": 37,
      "programingLanguages": [
          "Java",
          "TypeScript",
      ]
    },
    {
      id: 3,
      "account": "eric",
      "email": "eric@gmail.com",
      "password": "pass",
      "age": 39,
      "programingLanguages": [
          "Go",
      ]
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(json(users))
    }, 1000);
  });

}