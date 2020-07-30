# Apok-admin

### ***The VueJS plugin for REST and GraphQL web clients projects scaffolding***

When a web application is being develop there are common concepts that come across very often and coding them over and over can be a somewhat painful 
experience for some developers. During this process of writing repetitive code, human mistakes become a more relevant factor, especially for those lacking
the expertise. This is why scaffolding is an important resource in terms of efficiency; it allows the developer to focus in the implementation details of 
the app while letting the scaffolding software to generate the base code. 

And yes, scaffolding might feel like a bad practice in particular for new developers, 
however, a scaffold does not mean you wont do any coding, it means you can put the effort and creativity into really solving
a problem, implementing a new feature from scratch without the worry of messing fundamental code. 

Here is where Apok-admin excels at: generating base code for your Vue-js web application. You can create fully working Vuex and admin modules with semantically 
friendly console commands, start your developing experience ASAP just as the installation ends with all dependencies already added from the beginning, get your
api (or a mocked one, great for testing) working in minutes just by setting an endpoint, work with ready-to-develop Vue components using the most popular CSS 
frameworks available,  and many more!

There's a lot of reasons of why you should use Apok-admin, and just to name a few, here's a list of what Apok-admin allow you to:

- Develop what makes your app unique; keeping the base stuff to Apok-admin.
- Makes the developing faster; by making fully working modules a console command away.
- Fully customizable code; there's no point on generating a scaffold that you can't customize to suite your needs.
- Work with ready-to-develop components styled with the most pupular CSS frameworks; made with the intention to accomplished advanced functionality while being easy to use.
- Create language friendly apps; with i18n make sure your app is international.
- Choose which icon pack you want and make you app more descriptive; FontAwesome icons, MDI or Unicons for Vue!

Apok-admin is as great as it looks and it's easy to install too! go to the next part and keep reading to get started!

## Table of Contents
- [Installation](#installation)
- [Folder structure](#folder-structure)
- [Usage](#usage)
- [Components](#components)
- [Renderers](#renderers)
  
## Installation
As a [vue-cli plugin](https://cli.vuejs.org/guide/plugins-and-presets.html) 
you need to install [vue-cli system](https://cli.vuejs.org/guide/installation.html) using ``npm install``

- ``npm install -g @vue/cli``

then create a [new vue project](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) with ``vue create -d ``. The ``-d`` flag will
install the default vue template (ESLint + Babel). All dependencies needed are installed with Apok-admin itself.

- ``vue create -d <myProjectName>``

Now you need to install Apok-admin via ``vue add`` [vue-cli console command](https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project)

- ``vue add @apok/apok-admin``

During apok-admin's installation you'll be prompted with a few initial configuration questions in this order:

- ``CSS Framework``, a single selection option where you may choose between bootstrap or bulma as your main components CSS framework
- ``What icons do you want to use?``, a multiple selection option where you may choose the desired icon pack from those available: 
     - Font Awesome
     - Material Design Icons (materialdesignicons.com)
     - Material Design Icons (https://material.io/tools/icons)
     - Unicons
- ``Will you use a REST client? (y/n)``, a closed question for the REST plugin installation
- ``Will you use GraphQL (y/n)``, a closed question for the GraphQL plugin installation

Finally, you have to [install all dependencies](https://docs.npmjs.com/cli/install) added to your project's package.json

- ``npm install``

After everything is installed there are a few things to be configured before start developing:
- Set the REST and/or GraphQL endpoints in ``src/config/admin.js`` file:
     ```javascript
        //If you chose using a REST client
        Vue.use(NetworkRestPlugin, {
          baseURL: 'your api URL goes here',
          sessionCookie: constants.SESSION_COOKIE
        });
         
        //If you chose using GraphQL
        Vue.use(NetworkGraphQLPlugin, {
          baseURL: 'your api URL goes here',
          sessionCookie: constants.SESSION_COOKIE
        });

    ```
- Setting a new menu option object in the ``src/config/menu.js`` file default array. This way
you can start using the top-left menu of the layout to navigate to your views:
    ```javascript
      // menu.js
      export default [
        //New menu entry
        {
          title: 'Your menu entry title',
          children: [
            {
              label: 'Your menu item lebel',
              to: { name: 'Named Route' },
              icon: {icon: 'icon of choice'}
            },
          ]
        },
      ]
    ```
- Create a new admin or vuex module to start consuming your api of choice, running the ``create`` script
added in project's package.json, for a better description you can go [here](#commands)

At this point you are able to run the vue-cli dev server using ``npm run serve`` and ready to start developing!

## Folder structure
After installation has been done, your project's source folder should look like this:
```
├── src
|   ├── assets
|   ├── components
|   ├── config
|   ├── features
|   ├── i18n
|   ├── store
|   ├── tests
|   ├── utils
|   ├── views
|   ├── App.vue
|   ├── main.js
|   ├── registerServiceWorker.js
|   └── router.js
``` 
- ### Assets
    The assets folder contains the files associated with the CSS style processed by Sass and applied to the project globally.
    Check [Sass documentation](https://sass-lang.com/documentation) for more info

    | File | Description |
    |:---|:---|
    | ``_variables.scss`` | Custom styles file |
    | ``main.scss`` | main Sass file |

- ### Components
    In here should go any custom components created by you. Let's say you have a simple button component:
    ```vue
    //myButtonComponent.vue
    <template>
        <button v-on:click="doSomething"> Click Me! </button>
    </template>
    <script>
        export default {
            name: 'MyButtonComponent',
            methods: {
                doSomething: () => {
                    alert('You clicked me and I did something!')    
                }        
            }
        }
    </script>
    ```

    When you need to use it, add it as a property in the components install
    in the main.js file. Such as:
    ```javascript
    //main.js
    import BootstrapAdminComponents from "@apok/admin-components-bootstrap";
    import myButtonComponent from '@/components/myButtonComponent.vue'
    
    Vue.use(BootstrapAdminComponents, {
        'ButtonRenderer': myButtonComponent
    })
    ```
- ### Config
    Various configuration files. Feel free to modify them as you need
    
    | File | Description |
    |:---:|:---|
    | ``admin.js`` | REST and GraphQL config file |
    | ``constants.js`` | Global constants for project |
    | ``filters.js`` | Custom Vue filters |
    | ``fontawesome.js`` | Fontawesome icons configuration |
    | ``i18n.js`` | Translation file |
    | ``index.js`` | Entire config module export |
    | ``menu.js`` | Menu sample |


- #### ``admin.js``
     This file contains the installation of the REST and GraphQL instance. In here you should set
     the endpoints you are willing to use in your app. You can even use a mocked endpoint for development
     using API mocking tools like [mirage.js](https://miragejs.com/) or [MockServer](https://www.mock-server.com/)
     - **REST configuration**
     
         By default, apok-admin uses axios for http requests. This can be set by the user in case axios is not the option you want or
         you need a [custom axios implementation](https://github.com/axios/axios#creating-an-instance):
         ```javascript
           // admin.js
       
           //Custom axios implementation
           const myHttpClient = axios.create(options) //Or any http client
       
           Vue.use(NetworkRestPlugin, {
            baseURL: 'your api URL goes here',
            sessionCookie: constants.SESSION_COOKIE,
            httpClient: myHttpClient,
           });
         ```
- #### ``constants.js``
    As the name may suggest, this is where your global constants might be set. The point is to use recurrent
    values in shape of constants that are also available globally through the Vue instance. Once a value is set,
    it can be accessed to using the Vue instance object, like:
    ```javascript
      // Any file
  
      import Vue from 'vue';
      Vue.constants.YOUR_CONSTANT_NAME;
    ```  
- #### ``filters.js``
    Here you should find useful [filters](https://vuejs.org/v2/guide/filters.html) for string and date formatting purposes, and array manipulation. Also, there's
    a [custom directive](https://vuejs.org/v2/guide/custom-directive.html) for svg images inserting. You can set
    as many filters and directives as you want.
 
- #### ``fontawesome.js``
    Contains the ``font-awesome-icon`` [vue component installation](https://github.com/FortAwesome/vue-fontawesome).
    
- #### ``i18n.js``
    This is the vuex-i18n plugin installation file. You can add your own translations as explained in their [official documentation](https://github.com/dkfbasel/vuex-i18n)

- #### ``menu.js``
    This file is a simple array of objects export used in the main menu formatting of the MainLayout.vue component. Here should go 
    any item you wish to add following the syntax of the example below:
    
    ```javascript
      //menu.js
      export default [
        {
          title: 'General',                   //Menu section name
          children: [                         //Child routes
            {
              label: 'Dashboard',             //Menu item name
              to: { name: 'Dashboard' },      //Named rote
              icon: {icon: 'tachometer-alt'}  //Icon
            },
          ]
        },
      ]
    ```
    
- ### Features
    All modules created with the plugin's CLI commands goes here. Every new module
    shall have its own folder with the necessary files for it to work. Check [Console Commands](#console-commands) for more info.
    There are two types of modules: Admin and Vuex modules, the last being an option inside of the first one.

    **Important note: _"MyAdminModule"_ and _"MyVuexModule"_ are example names used for this part. Your modules _should_ always be named as you want
    and in a more descriptive way in terms of functionality. However, the same logic described in this part applies to your module's files!**

  - #### **Admin modules**
    
    This module comes with 3 template views for CRUD operations, for instance, you can get request data from your api
    and render it the List component, which also allows you to delete a registry, switch to the edit
    view to make changes or even create a new one. In case you need a more specific implementation on your CRUD views, feel
    free to modify the generated template to suit your needs. All components are named with the module's name and then suffixed 
    with List for the listing component and Edit for the editing and new registry component. For example, 
    if you module is called ***MyAdminModule***, the components will be named as follows:
    
     | Component | Description |
     |:---:|:---|
     | ``MyAdminModule.vue`` | Base layout for List and Edit components |
     | ``MyAdminModuleList.vue`` | List component. By default, it renders a table with data coming from a get request |
     | ``MyAdminModuleEdit.vue`` | Edit and New registry component. Allows to change or create data via post or put requests respectively, using fields defined on ``form.js`` file |
     
     Added to this, there are two more files corresponding a admin module: 
     
     | File | Description |
     |:---:|:---|
     | ``routes.js`` | Local routes file. This file is imported in the main router, so any route defined here will be available as a child in the main router instance |
     | ``form.js`` | This file contains an export of an array of objects. It allows to format a form for the edit and new registry components. Object structure can be found [here]() |
     
     Finally if module creation command is flagged with ``--withTests``, a ``__tests__`` directory will be created storing the following [Jest](https://jestjs.io/) test files:
     
     | File | Description |
     |:---:|:---|
     | ``MyAdminModule.actions.spec.js`` | Vuex actions test file |
     | ``MyAdminModule.mutations.spec.js`` | Vuex mutations and states test file |
     | ``MyAdminModule.components.spec.js`` | Views components test file |
     
  - #### **Vuex modules**
  
    As described in its [official docs](https://vuex.vuejs.org/), Vuex is about state management. Apok-admin's Vuex module creation is no different; by using the corresponding [command and options](#console-commands)
    you can create an state management module that suits your needs. Basically, the command will create a vuex store with two variations depending on the
    options used: if ``--actions`` is used, apok-admin will generate the specified actions and mutations in a ``actions.js`` and ``mutations.js`` respectively. if ``--crud`` is used,
    then the plugin will import the ``storeGenerator`` function from [the main store](#store) which allows the use of default CRUD implementation already in apok-admin.
    
    The module generated will be named as specified in the console command and will generate the following files:
    
    | File | Description |
    |:---:|:---|
    | ``actions.js`` | Vuex actions file. In here will be created template actions for the specified ones in ``--actions``'s params |
    | ``mutations.js`` | Vuex mutations file. Similar to the actions, in here will be created template mutations based on the actions names |
    | ``index.js`` | Vuex module export |
    | ``types.js`` | Vuex mutations constant types. This file will be generated only if ``--actions`` is used|
     
- ### i18n
    This is your translations folder. Inside should go every javascript file describing wich words i18n should translate to. For more information
    about this please refer to its [official docs](https://github.com/dkfbasel/vuex-i18n)

- ### Store
    Project's main Vuex store. This folder contains the main Vuex Store of your project's state management and works the same as specified in
    vuex's [official docs](https://vuex.vuejs.org/guide/structure.html). In Apok-admin's case there are three default modules that a web app
    might need: Authentication, Messages and UI for menu toggling. Also there's a folder named ``base`` where you can find a working CRUD store
    that you might adapt to suite your needs.
    
    - #### **``modules`` folder**
        | Module | Description |
        |:---:|:---|
        | ``auth`` | User authentication module. Build with vuex actions and mutations that allows to retrieve a user's data and use it on your components |
        | ``messages`` | Messages module. Allows messages display on forms for UX purposes |
        | ``UI`` | User interface module. Has simple menu toggling functions for your UI controls |
       
    - #### **``base`` folder**
        
        The idea is to give a simple way to implement working CRUD and listing operations for your project. When a vuex module is created with apok-admin's 
        [console commands option](#console-commands) ``--crud``, the ``storeGenerator`` function will be imported from the ``baseStore.js`` file, 
        which in turn, has ``baseActions.js`` and ``baseMutations.js`` imported. This allows an easy way to implement such functions on any vuex module you create.
        
        | File | Description |
        |:---:|:---|
        | ``baseActions.js`` | CRUD actions like getting a item list, deleting a item, saving a new item, updating an item, etc |
        | ``baseMutations.js`` | Holds the default mutations associated to corresponding CRUD and listing actions mentioned before |
        | ``baseStore.js`` | This file has a store generator function that allows to create a store with the aforementioned actions and mutat |
                        
- ### Tests
    Contains views components and main Vuex store tests. All tests are coded between Jest and Vue Test Utils, the last one being the official unit testing 
    utility library for Vue-js. In this folder should go all of your unit tests that aren't directly related to the modules in the ``features`` directory.
    There's a couple of test already coded for the main store and view components:
    
    | File | Description |
    |:---:|:---|
    | About.component.spec.js | About.vue component unit tests |
    | Dashboard.component.spec.js | Dashboard.vue component unit tests |
    | Login.component.spec.js | Login.vue component unit tests |
    | NotFoundPage.component.spec.js | NotFoundPage.vue component unit tests |
    | MainLayout.component.spec.js | MainLayout.vue component unit tests |
    | auth.store.spec.js | auth module unit tests |
    | messages.store.spec.js | messages module unit tests |
    | ui.store.spec.js | ui module unit tests |
    
    
- ### Utils
    In here goes any utility script you make. It is not required to be into this folder, but highly recommended for the sake of order
    
    | File | Description |
    |:---:|:---|
    | ``updatedPagedList.js`` | Sample paged list update |

- ### Views
    Default components for view purposes. You can add as many custom components as you wish for your app's pages. 
    It also contains some default components to start with:
    
    | File | Description |
    |:---:|:---|
    | ``About.vue`` | "About Us" page example |
    | ``Dashboard.vue`` | Dashboard component |
    | ``Login.vue`` | Functional Login component |
    | ``NotFoundPage.vue`` | Sample error 404 view |
    | ``MainLayout.vue`` | Main layout wrapper component |

## Usage
After installation, the plugin will auto run and start asking the
configuration question for the scaffold, however if you need to run the plugin
again you can use ``vue invoke`` [command](https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project) instead:

- ``vue invoke @apok/apok-admin``

### Console commands
Apok-admin comes with built in commands for admin and vuex modules 
scaffolding that allows you to add specific functions to their
projects. To use each command you must run the ``create`` script added to your
package.json after apok-admin's installation, like this: 

```
npm run create -- <command> --<option1> --<option2> --<optionN>
```

- #### ``vuex:module`` command
    This command generates a folder named as the specified module name and generates the files
    for this vuex module to work: the store, actions, mutations and an index.js
    to bundle everything up.
    
    - ### Options 
    
    | Option | Description |
    | :----- | :---------- |
    | `--name <vuexModuleName>` | New name for the vuex module. ***Required*** |
    | `--actions myAct1,myAct2...,myActN` | Generates constant named actions and mutations. Constants are stored in a Types.js file. ***Requires argument*** |
    | `--crud` | Generates constant named actions and mutations as CRUD operations. Constants are stored in a ListTypes.js file. ***Optional*** |
    | `--withTests` | Generates store test files. An .actions.spec.js for actions and a .mutations.spec.js for mutations and states. ***Optional*** |
    
- ### Vuex module folder structure
    Starting from ``myProject/src`` directory:
    ```
    ├── features
    |   ├── moduleName
    |       ├── tests           // if --withTests was used
    |           ├── moduleName.actions.spec.js  
    |           └── moduleName.mutations.spec.js  
    |       ├── store   
    |           ├── actions.js   
    |           ├── mutations.js   
    |           ├── index.js    // this vuex store exports
    |           └── types.js    // if --actions was used
    |       └── index.js        // use it to export your modules out of features wherever are needed   
    ```
    
- ### ``admin:module`` command
    This command generates a folder named as the specified module name  
    and creates default components to serve as views: main, 
    edit and list. A routes.js es also generated to handle the new 
    views and adds the possibility to generate a vuex module
    
    - ### Options
    
    | Option | Description |
    | :------ | :------------ |
    | `--name <adminModuleName>` | New name for the admin module. ***Required*** |
    | `--vuex <vuexModuleName>` | Generates an empty vuex module. ***Optional*** |
    | `--vuexVar <vuexVarName>` | Name of the variable to bind to Data in edit/details views. ***Required*** |
    | `--createVuex` | Generates constant named actions and mutations as CRUD operations. Constants are stored in a ListTypes.js file. ***Optional*** |
    | `--withTests` | Generates store test files. An .actions.spec.js for actions, a .mutations.spec.js for mutations and states, and a .components.spec.js for components. ***Optional*** |
        

- ### Admin module folder structure
    Starting from ``myProject/src`` directory:
    ```
    ├── features
    |   ├── moduleName
    |       ├── tests               // if --withTests is used
    |           ├── moduleName.actions.spec.js  
    |           ├── moduleName.mutations.spec.js  
    |           └── moduleName.components.spec.js  
    |       ├── store               // if --vuex or --createVuex is used
    |           ├── actions.js   
    |           ├── mutations.js   
    |           ├── index.js        // this vuex store exports
    |           └── types.js        // if --vuex was used, otherwise, refer to ListTypes.js in src/store
    |       ├── views           
    |           ├── moduleName.vue  
    |           ├── moduleNameEdit.vue   
    |           └── moduleNameList.vue    
    |       ├── moduleName.i18n     // Translations file      
    |       ├── forms.js     
    |       └── routes.js           // module routes
    ```
  
## Components

One of Apok-admin's features are the default components. During the installation process you'll be prompted
with various questions, including the CSS framework to use. Whichever CSS Framework you've chose,
there shall be the same components coded with that respective CSS framework, thus treating in a more
template oriented way. Of course this does not mean you can't use your own components, you can by just overwriting
the renderer option in ``main.js``. Learn more about it [here](#renderers).

- ### Input components

    | Component | Description |
    | :--------------: | :----------- |
    | ``InputFormCalendar.vue`` | Calendar form component |
    | ``InputFormCheck.vue`` | Input type check component |
    | ``InputFormFile.vue`` | File upload component |
    | ``InputFormMultiSelect.vue`` | Multiple selection component |
    | ``InputFormRadio.vue`` | Input type radio component |
    | ``InputFormSelect.vue`` | Single selection component |
    | ``InputFormText.vue`` | Text input component |
    | ``InputFormTextArea.vue`` | Text area input component |
    | ``InputFormTimePicker.vue`` | Allow choosing hr and min as an input |

- ### Layout components

    | Component | Description |
    | :--------------: | :----------- |
    | ``Layout.vue`` | Main layout component |
    | ``LayoutNavBar.vue`` | Navigation bar component |
    | ``LayoutMenu.vue`` | Sample menu component |
    | ``LayoutMenuItem.vue`` | Menu item component for layout menu |
    | ``LayoutFooter.vue`` | Layout's footer component |
    | ``Dashboard.vue`` | Dashboard component |
  
- ### Form components

    | Component | Description |
    | :--------------: | :----------- |
    | ``AdminForm.vue`` | Main form component |
    | ``AdminFormField.vue`` | Field component for main form |
    | ``IconButton.vue`` | Button component |

- ### Miscellaneous components

    | Component | Description |
    | :--------------: | :----------- |
    | ``Icon.vue`` | Icon component |
    | ``AdminTable.vue`` | Sample table component |
    | ``Pagination.vue`` | Pagination component |
    | ``Messages.vue`` | Messages and alerts component |
    
    
## Renderers

Apok-admin's components are registered into the Vue instance globally trough renderers, wich
are just a generic name for a specific type of component. Thus, in case you want to make use
of your own components, they should be assigned to a renderer in order to be part of the whole instance.
We've mentioned before an example of how this works. Here is another one with Bulma components:

```javascript
// in main.js

import BulmaAdminComponents from "@apok/admin-components-bulma";
import myCustomButton from '@/components/myCustomButton'
import myCustomTable from '@/components/myCustomTable'
import myCustomForm from '@/components/myCustomForm'

// In the admin components installation add your components as an object

Vue.use(BulmaAdminComponents, {
    'ButtonRenderer': myCustomButton,
    'TableRenderer': myCustomTable,
    'FormRenderer': myCustomForm,
})
```
Then on another component you can use the renderer as you would normally use a component, for instance:

```xhtml
<!-- Inside a Vue component template-->

<template>
    <div>
        <button-renderer/>
        <table-renderer/>
        <form-renderer/>
    </div>
</template>
```
Now you dont need to import every component you wish to use since they are already registered globally
trough renderers!

This way you can add as much components as renderers are. Now a list of the available
renderers:

| Input | Layout | Form | Miscellaneous |
| :---: | :----: | :---:| :-----------: |
| ``FormInputTextRenderer`` | ``LayoutRenderer``| `FormRenderer`| ``TableRenderer`` |
| ``FormInputPasswordRenderer`` | ``LayoutNavbarRenderer``| `FormRenderer` | ``MessagesRenderer`` |
| ``FormInputNumberRenderer`` | ``LayoutFooterRenderer``| | ``PaginationRenderer``  |
| ``FormInputEmailRenderer`` | ``MenuRenderer`` | |   |
| ``FormInputTelRenderer`` | ``MenuItemRenderer`` | |  |
| ``FormInputColorRenderer`` | ``DashboardRenderer`` | | |
| ``FormInputSearchRenderer`` |  | | |
| ``FormInputUrlRenderer`` | | |  |
| ``FormInputFileRenderer`` |  | | |
| ``FormInputTextareaRenderer`` | | |  |
| ``FormInputSelectRenderer`` |  | | |
| ``FormInputRadioRenderer`` | | |  |
| ``FormInputCheckRenderer`` |  | | |
| ``FormInputCheckboxRenderer`` | | |  |
| ``FormInputCalendarRenderer`` | | |  |
| ``FormInputTimeRenderer`` | | |  |
| ``FormInputMultiSelectRenderer`` | | |  |
