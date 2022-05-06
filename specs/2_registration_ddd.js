describe("Example of mocha tests", () => {
  const validData = [
    { username: "Hiq", password: "123abcA!", message: "Successfully registered! Please, click Back to return on login page" },
    { username: "HiqoUserHiqoUserHiqoUserHiqoUserHiqoUser", password: "123abcA123abcA123abc", message: "Successfully registered! Please, click Back to return on login page" },
  ];
  const invalidData = [
    { username: "", password: "", message: "Please, provide valid data" },
    { username: "", password: "123abcA!", message: "Username is required" },
    { username: "Hiqo", password: "", message: "Password is required" },
    { username: "Hi", password: "123abcA!", message: "Username should contain at least 3 characters" },
    { username: " Hiqo", password: "123abcA!", message: "Prefix and postfix spaces are not allowed is username" },
    { username: "Hiqo ", password: "123abcA!", message: "Prefix and postfix spaces are not allowed is username" },
    { username: "Hiqo", password: "123abcA", message: "Password should contain at least 8 characters" },
    { username: "Hiqo", password: "123abcaa", message: "Password should contain at least one character in upper case" },
    { username: "Hiqo", password: "123ABCAA", message: "Password should contain at least one character in lower case" },
    { username: "Hiq", password: "123abcA!", message: "Username is in use" },
  ];

  before("Should open project", async function () {
    await browser.url(`https://anatoly-karpovich.github.io/HiqoMeetup/`);
    await expect(browser).toHaveTitle("Example for testing");
    await $("#registerOnLogin").click();
    await $("#backOnRegister").waitForDisplayed({ timeout: 3000 });
    let registrationTitle = await $("#registerForm").getText();
    await expect(registrationTitle).toEqual("Registration");
  });

  for (const check of validData) {
    it(`Should allow to create user with "${check.username}" username and "${check.password}" password`, async function () {
      await $("#userNameOnRegister").setValue(check.username);
      await $("#passwordOnRegister").setValue(check.password);
      await $("#register").click();
      let errorMessage = await $("#errorMessageOnRegister");
      await errorMessage.waitForDisplayed({ timeout: 3000 });
      await expect(await errorMessage.getText()).toEqual(check.message);
    });
  }
  for (const check of invalidData) {
    it(`Should not allow to create user with "${check.username}" username and "${check.password}" password`, async function () {
      await $("#userNameOnRegister").setValue(check.username);
      await $("#passwordOnRegister").setValue(check.password);
      await $("#register").click();
      let errorMessage = await $("#errorMessageOnRegister");
      await errorMessage.waitForDisplayed({ timeout: 3000 });
      await expect(await errorMessage.getText()).toEqual(check.message);
    });
  }
});
