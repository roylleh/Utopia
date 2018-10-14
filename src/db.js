export const endpoint = 'http://utopia-alb-1780440835.us-east-1.elb.amazonaws.com/traveler/';

export function getCookie(cname)
{
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1);

        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }
    return '';
}

export function parseDateTime(dateTime)
{
    const date = dateTime.slice(0, 10);
    const time = dateTime.slice(11, 16);

    return date + ' ' + time;
}

export async function login(user)
{
    const obj =
    {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const res = await fetch(endpoint + 'users/login', obj);
    const json = await res.json();
    return json;
}

export async function getCollection(collection)
{
    const userId = getCookie('userId');
    const role = getCookie('role');

    if (role === 'traveler' && collection === 'reservations')
        collection += '/users/' + userId;

    const res = await fetch(endpoint + collection, {});
    const json = await res.json();
    return json;
}

export async function postElement(collection, data)
{
    const obj =
    {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    await fetch(endpoint + collection, obj);
}

export async function deleteElement(collectionId)
{
    const obj =
    {
        method: 'DELETE',
        headers:
        {
            'Content-Type': 'application/json'
        }
    };

    await fetch(endpoint + collectionId, obj);
}