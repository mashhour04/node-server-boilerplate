# Component

- Use-cases / External-use-cases uses only Entity
- Use-cases / External-use-cases have the business for the use-case and expose entity verbs
- Use-cases => if we need any external use case from any-other component require it in use-cases `index.js` file and inject it to the specific use-case
- External-use-cases expose use-cases used by other components use-cases
- Entity
  - Act as data-mapper between use-case and model
  - Expose verbs available for the entity.
  - Uses model for db interactions
- Model => Extends `GenericModel` and add more methods if needed

## Notes

- If anyone need the bluebird promise/lodash/logger you need to require it (removed from global)
