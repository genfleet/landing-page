# Genfleet landing page

## Forms

Every form on the site is collected by [Web3Forms](https://web3forms.com). Build a new form with `Web3Form` (`src/components/forms/Web3Form.tsx`) and it is collected too: the component adds the access key, subject, sender name and a spam honeypot, and sends the form in the background with in-page success and error messages.

The access key lives in `src/config/forms.ts`. Web3Forms keys are public by design (they ship in the browser bundle), so it is committed and no environment variable is needed.
