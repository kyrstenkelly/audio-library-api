# Audio Library API

For more details on the endpoints, view the [API Docs](./docs/api.md).

## Development

To run the service locally:

1. Clone the repo & install dependencies  
    ```
    git clone git@github.com:kyrstenkelly/audio-library-api.git
    cd audio-library-api
    npm install
    ```

2. Ensure you have a mongoDB running locally.  
    [See the install instructions](https://docs.mongodb.com/manual/installation/) if you haven't done this before.

3. Create a `.env` file:
    ```bash
     # Must download audio files for autoseeding, see below
    AUTOSEED=true
    MONGODB_URI=mongodb://localhost:27017/<db_name>
    SERVICE_PORT=8080
    ```
    
    a) The `AUTOSEED` variable is for local develoment, and if `true`, will auto-seed your database with a few audio tracks. You will first want to add a few audio files into the the `src/db/mock-data/` folder. 
    The files that match the `src/db/mock-data/metadata` can be found in [this public drive folder](https://drive.google.com/drive/folders/1BsGeGv8JwCw2trWIlTQ3cCCC8RW9HVOt) so you can easily download them and get started.

   
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
