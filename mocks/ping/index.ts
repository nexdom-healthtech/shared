import { http, HttpResponse, type PathParams } from "msw";

export const url = `https://fake-url.com/ping`;
export const forbiddenUrl = `https://fake-url.com/ping/nothing-here`;
export const authorization = "Q3liZXJkeW5lIFQtODAw";
export const response = { Ok: true };

const methods: Array<keyof typeof http> = ["get", "post", "put", "patch", "delete"];

const validHandlers = methods.map((method) =>
  http[method]<PathParams, object>(url, async ({ request }) => {
    if (request.headers.get("Authorization") !== authorization) {
      return new HttpResponse(null, { status: 401 });
    }

    const data = request.body ? await request.json() : {};
    return HttpResponse.json({ ...response, ...data, [method]: true });
  }),
);

const invalidHandlers = methods.map((method) =>
  http[method]<PathParams, object>(forbiddenUrl, () => {
    return new HttpResponse(null, { status: 403 });
  }),
);

const handlers = [...validHandlers, ...invalidHandlers];

export default handlers;
