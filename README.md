## Welcome to Picsart Miniapps!

We're excited to have you here! 🎉 To get started with developing your Miniapps, we've compiled all the necessary information and resources you'll need.

### Quick Links

- **Miniapps Documentation:** Dive into our [Miniapps documentation](https://extensions-documentation.pages.dev/docs/getting-started/introduction) to understand the basics and advanced features of Miniapps development.

- **Cascade Design System:** Familiarize yourself with our [Cascade design system](https://storybook.picsart.tools/core/main/) to ensure your Miniapps follow our design guidelines and principles.

### Getting Started

**Start the Development Server:**

To begin development, start your server with the following command:

```bash
npm start
```

**Build Your Miniapp:**

- For staging environment:

```bash
npm run build
```

- For pre-production environment:

```bash
npm run build:preproduction
```

- For production environment:

```bash
npm run build:production
```

**CI/CD Pipeline:**

In order to make the CI/CD work you need to add variables to your `.gitlab-ci.yml`. Use you miniapp id from deploy portal as a value for those variables

- for the production environment:
```bash
variables:
  ....
  MINIAPP_ID_PROD: '43s64903-f4fs-33d5-32d3-3r2f704o4fej' # Add your miniapp production id
  ....
```

- for the other environments:
```bash
variables:
  ....
  MINIAPP_ID_STAGE: '67jjy54h-6bg2-55d3-23k4-3d2g435d3sbk' # Add your miniapp stage id
  ....
```

- For production environment:

```bash
npm run build:production
```

### Project Structure

Our project structure is based on [Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces), allowing you to easily add more Miniapps to the project. To add a new Miniapp, simply create a folder containing a `package.json` and `extension-manifest.json` files, and include it in the `workspaces` section of the root `package.json`.

To execute commands for a specific Miniapp, use the `-w <miniapp>` option, where `<miniapp>` is the name of the folder corresponding to the Miniapp. For example, to install a dependency specifically for a Miniapp:

```bash
npm i @picsart/new-package -w miniapp
```

This command syntax ensures that your actions are scoped to the desired Miniapp, helping maintain a clean and organized project structure.

### Need Help?

If you have any questions or run into any issues, don't hesitate to reach out to our development team at the **#miniapps-dev-support** channel . We're here to help you make your Miniapps a success!
