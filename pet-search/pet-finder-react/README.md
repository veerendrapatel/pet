# Pet Finder

This project is built using React and Pet Finder API. It lists down all the pets along with their breed. Upon clicking on a particular pet you will be redirected to the more detailed page.

The Location is set to **Seattle,WA** because of some API restrictions.

I have used all the major React Concepts while building this project.

- React Hooks
- React Context API
- React Portal
- Error Boundary

### Development & Build

First install all the dependencies using `npm i` or `npm install` command. Run `npm run dev` for development.

Parcel will automatically generate a build when you start the project.

There are other scripts as well to **lint** and **format** the code.

- To check for static errors run `npm run lint`. It will run eslint and check for known bugs and typos. Modify `.eslintrc.json` file for different EsLint rules.
- To format the code run `npm run format`. It will run prettier and format the code according the configuration you have provided in `.prettierrc` file. Which is located at the root of the project.

To Run the server with mock data, run `npm run dev:mock`. It will serve static data.

To Deploy the build you need to configure aws-cli in your local environment and provide credential details for s3. Then run `npm run deploy` and it will directly upload build to your s3 bucket. You do need to configure your s3 bucket for hosting purposes.
