import { LoaderFunction, json, ActionFunction } from "@remix-run/node"

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id;
  const user = {
    id,
    "account": "imzshh",
    "email": "imzshh@gmail.com",
    "password": "pass",
    "age": 37,
    "programingLanguages": [
        "Java",
        "C#",
        "JavaScript",
        "TypeScript"
    ]
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(json(user))
    }, 1000);
  });

}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  return body;
};