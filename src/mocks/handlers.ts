import { http, HttpResponse } from "msw";
import { ItemType, ListType } from "../types";

const lists_url = "https://todoapi-1-1.onrender.com/todolists";
const items_url = "https://todoapi-1-1.onrender.com/todoitems";

const allLists = new Map<number, ListType>();
const allItems = new Map<number, ItemType>();

export const handlers = [
    http.get(lists_url, () => {

        return HttpResponse.json(Array.from(allLists.values()));
    }),

    http.post(lists_url, async ({ request }) => {

        const newList: ListType = await request.json() as ListType;
        newList.id = allLists.size;

        allLists.set(newList.id, newList);

        return HttpResponse.json(newList, {status: 201});
    }),

    http.put(`${lists_url}/:id`, async ({ request, params }) => {

        const { id } = params;
        const newList: ListType = await request.json() as ListType;

        allLists.set(Number(id), newList); 

        return HttpResponse.json(newList);
    }),



    http.delete(`${lists_url}:id`, ({ params }) => {

        const { id } = params;

        const deletedList = allLists.get(Number(id));

        if(!deletedList) {
            return new HttpResponse(null, { status: 404});
        }

        allLists.delete(Number(id))

        return HttpResponse.json(deletedList);
    }),

    http.options(lists_url, () => {
        return new HttpResponse(null, {status: 200});
    }),





    http.get(items_url, () => {
        return HttpResponse.json(Array.from(allItems.values()));
    }),

    http.post(items_url, async ({ request }) => {

        const newItem: ItemType = await request.json() as ItemType;
        newItem.id = allItems.size;

        allItems.set(newItem.id, newItem);
        console.log(allItems);

        return HttpResponse.json(newItem, {status: 201});
    }),

    
    http.put(`${items_url}/:id`, async ({ request, params }) => {

        const { id } = params;
        console.log(id);
        const newItem: ItemType = await request.json() as ItemType;

        allItems.set(Number(id), newItem); 

        return HttpResponse.json(newItem);
    }),

    http.delete(`${items_url}/:id`, ({ params }) => {

        const { id } = params;


        const deletedItem = allItems.get(Number(id));

        if(!deletedItem) {
            return new HttpResponse(null, { status: 404});
        }

        allItems.delete(Number(id))

        return HttpResponse.json(deletedItem);
    }),

    http.options(items_url, () => {
        return new HttpResponse(null, {status: 200});
    }),

    http.options(`${items_url}/:id`, () => {
        return new HttpResponse(null, {status: 200});
    })
]