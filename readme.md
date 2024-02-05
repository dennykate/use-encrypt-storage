![Logo](https://i.postimg.cc/x1S24SwB/Logo.png)


# use-encrypt-storage

use-crypt-storage is a simple and secure react hook for managing browser localStorage with encryption. It provides a React hook that seamlessly integrates with the brower's localStorage and leverages the robust encryption capabilities of crypto-js. This package ensures that sensitive information stored in localStorage is crypt, adding an extra layer of protection to your application's data.


## Roadmap

- [Installation](#installation)

- [Examples](#examples)

- [Environment Variables](#environment-variables)

- [Tech Stack](#tech-stack)

- [Features](#features)

- [Feedback](#feedback)

- [Authors](#authors)



## Documentation

[Documentation](https://github.com/dennykate/use-encrypt-storage)


## Installation

Install with npm

```bash
  npm install use-encrypt-storage
```
    
or :

Install with yarn

```bash
  yarn add use-encrypt-storage
```
## Examples


Use with Vite ( in main.js )

```javascript
import App from './App';
import { EncryptProvider } from "use-encrypt-storage";
...

function App() {
  return (
    <EncryptProvider secretKey={import.env.meta.VITE_SECRET_KEY}>
      <App />
    </EncryptProvider>
  );
}
```

Use with CRA ( in index.js )

```javascript
import App from './App';
import { EncryptProvider } from "use-encrypt-storage";
...

function App() {
  return (
    <EncryptProvider secretKey={process.env.REACT_APP_SECRET_KEY}>
      <App />
    </EncryptProvider>
  );
}
```

Use with both

### Set Data

```javascript
import { useCallback } from "react";
import { useEncryptStorage } from "use-encrypt-storage";
...

function App() {
  const { set } = useEncryptStorage();

  // set( key: string , value: string , expireTime?: number | undefinded )
  // expireTime is in minutes

  const onSetHandler = useCallback(() => {
    set("name", "Aung Myo Chit");
  }, []);


  return (
      <button onClick={onSetHandler}>
        Set Name
      </button>
  );
}
```

### Get Data

```javascript
import { useCallback } from "react";
import { useEncryptStorage } from "use-encrypt-storage";
...

function App() {
  const { get } = useEncryptStorage();

  // get( key: string )

  const onGetHandler = useCallback(() => {
    const name = get("name");

    console.log(name); // Aung Myo Chit
  }, []);


  return (
      <button onClick={onGetHandler}>
        Get Name
      </button>
  );
}
```

### Remove Data

```javascript
import { useCallback } from "react";
import { useEncryptStorage } from "use-encrypt-storage";
...

function App() {
  const { remove } = useEncryptStorage();

  // remove( key: string )

  const onRemoveHandler = useCallback(() => {
    remove("name");
  }, []);


  return (
      <button onClick={onRemoveHandler}>
        Remove Name
      </button>
  );
}
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
# For Vite
VITE_SECRET_KEY="mamakochittel" 

# For CRA
REACT_APP_SECRET_KEY="mamakochittel"
```


## Tech Stack

**Client:** React, [crypto-js](#https://www.npmjs.com/package/crypto-js)




## Features

- __set__ data in browser's localStorage with encrypted value
- __get__ data from browser's localStorage
- __remove__ data from browser's localStorage

## Feedback

If you have any feedback, please reach out to me at dennykate22@gmail.com


## Authors

- [Aung Myo Chit](https://www.github.com/dennykate)


## License

[MIT](https://choosealicense.com/licenses/mit/)
