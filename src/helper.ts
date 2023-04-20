export function handleErrors(err: any) {
  console.log(err.message, err.code);
  let errors: string[] = [];

  if (err.message === "Incorrect Password") {
    errors.push("Incorrect Password");
  }

  if (err.message === "Incorrect Email") {
    errors.push("This email is not registered");
  }

  if (err.code === 11000) {
    errors.push(err.message);
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error: any) => {
      const { properties } = error;
      errors.push(properties.message);
    });
  }

  return errors;
}
