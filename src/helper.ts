export function handleErrors(err: any) {
  console.log(err.message, err.code);
  let errors: string[] = [];

  if (err.code === 11000) {
    errors.push("That email is already taken");
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error: any) => {
      const { properties } = error;
      errors.push(properties.message);
      // errorObject[properties.path] = properties.message;
    });
  }

  return errors;
}
