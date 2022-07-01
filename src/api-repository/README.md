# API Repository #

This repository is to manage all consumable endpoints. This patern is used to add organization and a source of truth for all endpoints. To learn more about the api we consume [Click Here](https://api-dev.junipermarket.com/swagger/index.html)




## How to use it

### vuex 

To use this plugin in the store we must import it since we are using a modified version of vuex

`import { $api } from '~/plugins/api-repository';`


`$api.fooStuff.getAll(fooId);`

**fooStuff** represents the module and **getAll** is a function within the module.


### components

No need for the import here. Just simply call it as we do any injected plugin.

`this.$api.fooStuff.getAll(fooId);`


### types

The interfaces for the api are located at `~/types/api-repository.ts`

Each module interface is prefixed with an I for interface and defines each function within.
Then we export the Api interface that contains the module interfaces.




## How to write it

Create a new module inside of `api-repository/` such as `foo-stuff.ts`

Use the snippet below as our recommended pattern. 

```
export default (DOMAIN: string, $apiRequest: any) => ({
  getFoo: (fooId: number) => {
    return $apiRequest({
      fooId,
      url: `${DOMAIN}/All`
    });
  }
}
```

NOTE: When naming module functions here we can keep them short and sweet. Since when we use them the module
will describe the type of data we want. So the function just needs to describe what in the module we want.

I like to use all CAPS for true constant variables or props. Personally reads better and let's other devs know this is not to be messed with.
Also most IDE's will color code these different so it will be even more aparent. Again +1 readability.

Inside of the **~/api-repository/index.ts** all we need to do is import/export the module we just created.
Each module should take two arguments: DOMAIN (start with forward slash) and $apiRequest.

` fooStuff: fooStuff('/foostuff', $apiRequest)`




## When implmenting

Having this system gives us a true source of truth from an api prespective. This will allow us to not be so dependent on
vuex and make everything global. Also keep in mind when we implement we need to clean up the areas where we are calling 
these endpoints through out the app. Removing the extra arguments such as the method and url. (since we are handling that in the module).

Each module function should only have a payload containing three types of arguments.

* Url data, such as an item id.
* Header data, such as manufacturerId.
* Request body data

All other pieces of information such as Domain url, method, api version, etc. should be handled within the api module's function.




## Plugin 

Inside of `~/plugins/api-repository.ts` resides the initialization of our api repository. It does look a bit strange
but from all my research this is how we had to export it in order for both components and vuex to work without
TypeScript yelling at us.
