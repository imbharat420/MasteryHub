𝐘𝐮𝐩 validator example schema validation and middleware
Here's an example of how you can use the yup library to create a form validation schema and use it with a middleware function to validate form data in a Node.js server:

```js
const express = require('express');
const yup = require('yup');

const app = express();

// Parse the request body as JSON
app.use(express.json());

// Create a validation schema using yup
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

// Create a middleware function to validate the request body
const validateRequest = (req, res, next) => {
  try {
    validationSchema.validateSync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const validationErrors = {};
    error.inner.forEach(err => {
      validationErrors[err.path] = err.message;
    });
    res.status(400).json({ errors: validationErrors });
  }
};


app.post('/users', validateRequest, (req, res) => {
  const { name, email, password } = req.body;
  // Create a new user with the validated form data
  const newUser = { name, email, password };
  res.json(newUser);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```
This example uses the yup library to create a validation schema and a middleware function to validate the request body. The middleware function uses the validateSync method of the validation schema to validate the request body. If the validation fails, it sends a response with a status code of 400 and a list of validation errors. If the validation succeeds, it calls the next function to move on to the next middleware or route handler.

You can then use this middleware function to validate any route that requires form data validation. For example, you can use it in a route handler for creating a new user:

```js
app.post('/users', validateRequest, (req, res) => {
  const { name, email, password } = req.body;
  // Create a new user with the validated form data
  const newUser = { name, email, password };
  res.json(newUser);
});
```
This route handler will only be called if the request body is valid according to the validation schema. If the request body is invalid, the middleware function will send a response with a list of validation errors and the route handler will not be called.