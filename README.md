#### DONE

- CRUD endpoints( at least the endpoint declaration)
- Migration file with a possible explanation of the data model ./src/migration
- Error handling for public API
- Data Handling - Handle various configurations for opening hours and support multiple currencies for fuel pricing.
  - Base on the declaration of the entities ./src/entities it would be possible to have different configurations of opening hours and multiple fuel currencies and pricing

#### NOT DONE

API

- pagination
  - to implement with following props
    - limit - how many items you are requesting
    - offset - the current offset in the list
    - total - the total number of items
    - The offset and the total would be different depending on the filter being done on that same request

Database

- wire-up postgres database with a pool connection implement transactions when doing mutation
- add TypeORM to manage operations with database
- setup the poi-repository file to fetch data from database

Tests

- did not have time to make tests

#### IMPROVEMENTS

- Add a layer of authentication and autorization
- Refactor code to be more DRY
- Add a permission layer based on user role
- The POI entity itself should latitude and longitude for a possible spatial search
  - What's the near pump station that is open right now
- The GET all endpoint should be capable into receiving filter parameters
  - lat, long
  - Type of fuel
  - open status
  - price
  - address
- Better data validation on the endpoints based on the created entities (src/entities)
- Data parser for request body to domain entities
- Data parser from db entities to domain entities
- More tests testing unhappy paths
