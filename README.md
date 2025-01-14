# Kainos Job Frontend

The frontend for the Kainos Job Roles Application

---

## Building

This project uses NodeJs 20. It is recommended that you use the LTS release of NodeJs 20.

### Install Dependencies

To install the required dependencies, please execute: 
```bash
npm i
```

### Environment File

To run the application, please create a `.env` file in the root of the project based on the `.env.template` file.

### SASS

This project makes use of SASS for its styling. To use SASS, please execute the following in a seperate terminal:
```bash
npm run sass
```

This will watch for changes made to the SASS stylesheets and automatically compile them to CSS

### Running

To run the application in live mode, please execute:
```
npm run dev
```

To run the application in production mode, please execute:
```
npm start
```

## Testing

The application uses Mocha and Chai for its testing suite.

### Running

To execute the test suite, execute:
```bash
npm test
```