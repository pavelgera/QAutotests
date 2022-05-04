describe("Example of mocha tests", () => {
  const validData = { username: "Hiqo", password: "123abcA!", message: `Hello, Hiqo!` };

  const invalidData = [
    { username: "", password: "", message: "Credentials are required" },
    { username: "", password: "123abcA!", message: "Username is required" },
    { username: "Hiqo", password: "", message: "Password is required" },
    { username: "Hiq", password: "123abcA!asd", message: "Invalid credentials" },
  ];

  before("Should open project", async function () {
    await browser.url(`https://anatoly-karpovich.github.io/HiqoMeetup/`);
    await expect(browser).toHaveTitle("Example for testing");
    await $("#registerOnLogin").click();
    await $("#backOnRegister").waitForDisplayed({ timeout: 3000 });
    let registrationTitle = await $("#registerForm").getText();
    await expect(registrationTitle).toEqual("Registration");
    await $("#userNameOnRegister").setValue("Hiqo");
    await $("#passwordOnRegister").setValue("123abcA!");
    await $("#register").click();
    let errorMessage = await $("#errorMessageOnRegister");
    await errorMessage.waitForDisplayed({ timeout: 3000 });
    await expect(await errorMessage.getText()).toEqual("Successfully registered! Please, click Back to return on login page");
    await $("#backOnRegister").click();
    let loginTitle = await $("#loginForm").getText();
    await expect(loginTitle).toEqual("Login");
  });

  for (const check of invalidData) {
    it(`Should not allow to create user with "${check.username}" username and "${check.password}" password`, async function () {
      await $("#userName").setValue(check.username);
      await $("#password").setValue(check.password);
      await $("#submit").click();
      let errorMessage = await $("#errorMessage");
      await errorMessage.waitForDisplayed({ timeout: 3000 });
      await expect(await errorMessage.getText()).toEqual(check.message);
    });
  }
  it(`Should not allow to log in with valid credentials`, async function () {
    await $("#userName").setValue(validData.username);
    await $("#password").setValue(validData.password);
    await $("#submit").click();
    let success = await $("#successMessage");
    await success.waitForDisplayed({ timeout: 3000 });
    await expect(await success.getText()).toEqual(validData.message);
  });
  it('Should open login page', async function() {
      await $('#backButton').click()
      let loginTitle = await $("#loginForm").getText();
      await expect(loginTitle).toEqual("Login");      
  })
});
