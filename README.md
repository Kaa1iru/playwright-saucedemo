# SauceDemo Test Automation Script (Playwright)
This is an E2E testing project that I made for [SauceDemo](https://www.saucedemo.com/) using Playwright and JavaScript while adopting the Page Object Modeling (POM) pattern.

**This is my first test automation project to learn and practice writing automated test scripts.**

## Technologies Used
- **Playwright**: For automating browser workflows and assertions.
- **JavaScript**: For test scripting.
- **npm**: Package manager for JavaScript.

## Test Coverage
The tests in this project aims to simulate how a user would navigate and interact with the website from start (logging in) to finish (checkout). 

### Login
- Logging in with valid credentials
- Raises error for incorrect credentials
- Raises error for missing/empty credentials
- Attempts logins for each accepted username

### Inventory
- Sorts inventory by name (A to Z)
- Sorts inventory by name (Z to A)
- Sorts inventory by price (ascending)
- Sorts inventory by price (descending)

### Cart
- Checks if corresponding items added appear in the cart
- Checks cart if added item is removed (both inventory and cart pages)
- Checks if cart badge icon reflects item quantity

### Checkout
- Completes checkout process
- Raises error for missing/empty information
- Checks if price total calculations are correct

## Project Structure
```text
pages/                  # Page objects containing the locators and actions
tests/                  # Test scenarios
playwright.config.js    # Playwright Configuration
package.json            # Dependencies
package-lock.json       # Version Lock
```
## How to Clone
1. Prerequisites:
      - [git](https://git-scm.com/install/)
      - [Node.js + npm](https://nodejs.org/en/download/current)
2. Clone the repo: `git clone https://github.com/Kaa1iru/playwright-saucedemo/`
3. Open a terminal to the repo: `cd SauceDemo`
4. Install dependencies: `npm install`
5. Run the tests: `npx playwright test`
