// From Apollo docs
const fetch = require('cross-fetch');
const fs = require('fs');

// IMPORTANT!!! - When you want to trigger this update, please insert your auth token, but do not commit it!
const url = 'https://caropticom-dev.azurewebsites.net/graphql-private';
const token = '';

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const possibleTypes = {};

    result.data?.__schema?.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map(
          (subtype) => subtype.name,
        );
      }
    });

    fs.writeFile(
      './scripts/possibleTypes.json',
      JSON.stringify(possibleTypes),
      (err) => {
        if (err) {
          console.error('Error writing possibleTypes.json', err);
        } else {
          console.log('Fragment types successfully extracted!');
        }
      },
    );
  });
