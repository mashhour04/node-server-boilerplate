# External-use-cases

- Every file should not depend on any lib instead inject its dependency from index.js
- For Errors throw Error use throw new ApplicationError() and will handle the rest in controller who passes it to next
