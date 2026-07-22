import { http, HttpResponse, type PathParams } from "msw";

export const uri = `https://fake-url.com/ping`;
export const response = { Ok: true };

const handlers = [
  http.get(uri, () => {
    return HttpResponse.json({ ...response });
  }),

  http.post<PathParams, object>(uri, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({ ...response, ...data, post: true });
  }),

  http.put<PathParams, object>(uri, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({ ...response, ...data, put: true });
  }),
];

export default handlers;
