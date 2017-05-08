# Notes

There are a few points you should be aware of whenever you are contributing to or using HBC Core Components. They have been laid out below:

### Node 6

HBC Core Components was built with love on Node 6 and npm 3. Don't forget to switch to Node 6 whenever you contribute to this repository.

### Storybook

We use a great tool called [React Storybook](https://github.com/kadirahq/react-storybook) as a sandbox for developing and designing our components.

> [React Storybook] allows you to develop UI components rapidly without worrying about the app. It will improve your team’s collaboration and feedback loop.
> – @kadirahq

Since we have issues with Artifactory and scoped packages, you will need to switch between `npmrc` configurations to install `@kadira/storybook`. For example:

1. `npmrc default` (switch to npm)
2. `npm install @kadira/storybook`
3. `npmrc work` (switch back to Artifactory)
