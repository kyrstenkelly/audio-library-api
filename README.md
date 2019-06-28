# Audio Library API

For more details on the endpoints, view the [API Docs](./docs/api.md).

## Development

To run the service locally:

1. Install dependencies  
    ```
    npm install
    ```

2. Ensure you have a mongoDB running locally.  
    [See the install instructions](https://docs.mongodb.com/manual/installation/) if you haven't done this before.

3. Create a `.env` file:
    ```
    AUTOSEED=true
    DB_NAME=audioLibrary
    DB_URL=mongodb://localhost:27017
    SERVICE_PORT=8080
    ```
    The `AUTOSEED` variable is for local develoment, and if `true`, will auto-seed your database with a few audio tracks.
   
4. Run the service!
    ```
    npm start
    ```
    Then you should be able to query `http://localhost:8080/tracks` to get a list of tracks. To find out what else you can do, read the [API Docs](./docs/api.md).
  
----

Available commands:

```bash
# Compiles the code and runs the server
npm start

# Just compiles the code
npm build

# Serves the compiled code
npm serve

# Runs unit tests
npm test
```

## Development Plans

* Add more unit tests!
* Auto-generate API documentation
* Potentially switch to a more robust library like [mongoose](https://www.npmjs.com/package/mongoose), especially if we want to add some of the below features
* Build out remaining endpoints

## Potential Features

* Playlists
* Users and User Activity
