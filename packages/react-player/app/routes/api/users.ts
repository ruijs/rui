import {ActionFunction} from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  return body;
};