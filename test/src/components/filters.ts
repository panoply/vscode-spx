
async function subscribe (email: string, list: string) {

  const body = new URLSearchParams();
  const url = 'https://manage.kmail-lists.com/ajax/subscriptions/subscribe';
  const headers = {
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };

  body.append('g', list);
  body.append('email', email);
  body.append('foo', 'lorem');
  body.append('bar', 'ipsum');
  body.append('$fields', 'email,foo,bar');

  try {

    const response = await fetch(url, {
      body,
      headers,
      method: 'POST'
    });

    const { data, errors } = await response.json();

    if (data.is_subscribed === false && typeof data.email === 'string') {
      // user subscribed
    } else if (data.is_subscribed === true) {
      // user already subscribed
    } else if (errors.length > 0) {
      // klaviyo returned errors
    }
  } catch (e) {
    console.error(e);
  }
}

subscribe();
