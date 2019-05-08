export const getEventsDetails = (eventDate) => {
    //let username = name.toLowerCase().trim();
    // const URL = `https://api.github.com/users/${username}`;
    const URL = 'http://199.180.133.121:6000/eventsDetails?eventDate=29Jan2019'
    return fetch(URL)
            .then((res) => res.json());
}


// Instead of returning resp.json() just return resp.text() like this

// fetch(url).then((resp)=>{ return resp.text() }).then((text)=>{ console.log(text) })
// This will give you the response body in plain text.