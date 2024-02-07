Bug 1: One bug in the app.js with a duplication of the line `module.exports = app;`

Bug 2: Missing 'throw' in the `if (!user) { new ExpressError('No such user', 404);}` in the User class static get(username) function.

Bug 3: The GET route stipulated that it should only return basic info instead of all info. Updated the User class static getAll() function to only include username, first_name, last_name

Bug 4: While not a bug per se, there was a missing Express Error for the User class static delete() function.

Bug 5: PATCH route lacks validation to prevent unauthorized updates to fields other than first_name, last_name, phone, and email. The route should only accept first_name, last_name, phone, and email, but it doesn't enforce this.

Bug 6: Missing admin check for the User class static delete() function.
