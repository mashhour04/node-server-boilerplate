# Use-cases

- Every file should not depend on any lib instead inject its dependency from index.js
- For any need for external-use-case from any other component require it in index.js
- For Errors throw Error use throw new ApplicationError() and will handle the rest in controller who passes it to next
- Please don't write any mongo specific code in use-cases (you can write mongo specific code in model)
