# Apok-admin

The VueJS plugin for REST and GraphQL web client projects

## Table of Contents
- [Installation](#installation)
- [Folder structure](#folder-structure)
- [Usage](#usage)
- [Components](#components)
- [Renderers](#components)
  
## Installation
As a [vue-cli plugin](https://cli.vuejs.org/guide/plugins-and-presets.html) 
you need to install [vue-cli system](https://cli.vuejs.org/guide/installation.html) using ``npm install``

- ``npm install -g @vue/cli``

then create a [new vue project](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) with ``vue create``

- ``vue create <myProjectName>``

Now you need to install the plugin via ``vue add`` [vue-cli console command](https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project)

- ``vue add @apok/apok-admin``

Finally, you have to [install all dependencies](https://docs.npmjs.com/cli/install) added to your project's package.json

- ``npm install``

## Folder structure
After installation has been done, your project's ``src`` folder should look like this:
```
├── src
|   ├── assets
|   ├── componenets
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
In here should go any custom components created by you. 
When you need to use them, add them as a property in the components install,
in the main.js file. Such as:
```javascript
//main.js

Vue.use(BootstrapAdminComponents, {
    'ButtonRenderer': myButtonComponent
})
```
- ### Config
Various configuration files. Feel free to modify them as you need

| File | Description |
|:---:|:---|
| ``constants.js`` | Global constants for project |
| ``filters.js`` | Custom Vue filters |
| ``fontawesome.js`` | Fontawesome icons configuration |
| ``i18n.js`` | Translation file |
| ``index.js`` | Entire config module export |
| ``menu.js`` | Menu sample |

- ### Features
All modules created with the plugin's CLI commands goes here. Every new module
 shall have its own folder with the necessary files for it to work. Check [Console Commands](#console-comands) for more info.

- ### i18n
Contains sample translations for the project. Edit or create as you need

- ### Store
Project's main Vuex store. Also, contains sample modules for authentication, messages and UI interactions. Edit them as you need

- ### Tests
Contains views components and main Vuex store tests. You can add your own tests here for any custom component if you need to

- ### Utils
In here goes any utility script you make. It is not required to be into this folder, but highly recommended for the sake of order

| File | Description |
|:---:|:---|
| ``updatedPagedList.js`` | Sample paged list update |

- ### Views
Default components for view purposes. You can add as many custom components as you wish for your app's routing. 
It also contains some default components to start with:

| File | Description |
|:---:|:---|
| ``About.vue`` | Sample about view |
| ``Dashboard.vue`` | Sample dashboard view |
| ``Login.vue`` | Sample login view |
| ``NotFoundPage.vue`` | Sample error 404 view |

## Usage
After installation, the plugin will auto run and start asking the
configuration question for the scaffold, however if you need to run the plugin
again you can use ``vue invoke`` [command](https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project) instead:

- ``vue invoke @apok/apok-admin``

### Console commands
Apok-admin comes with built in commands for admin and vuex module 
scaffolding that allows the user to add specific functions to their
projects

- ### ``vuex:module`` command
    This command generates a folder named as the specified module name and generates the files
    for this vuex module to work: the store, actions, mutations and an index.js
    to bundle everything up.
    
    - ### Options 
    
    | Option | Description |
    | :----- | :---------- |
    | `--name <vuexModuleName>` | New name for the vuex module. ***Required*** |
    | `--actions myAct1,myAct2...,myActN` | Generates constant named actions and mutations. Constants are stored in a Types.js file. ***Requires argument, exclusive. See note below*** |
    | `--crud` | Generates constant named actions and mutations as CRUD operations. Constants are stored in a ListTypes.js file. ***Optional, exclusive. See note below*** |
    | `--withTests` | Generates store test files. An .actions.spec.js for actions and a .mutations.spec.js for mutations and states. ***Optional*** |
    
     ***important note: `--actions` and ``--crud`` are exclusive, hence cannot be used both in the same command line***

    - #### Vuex module folder structure
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
    | `--vuex <vuexModuleName>` | Generates an empty vuex module. ***Optional, exclusive. See note below*** |
    | `--vuexVar <vuexVarName>` | Name of the variable to bind to Data in edit/details views. ***Required*** |
    | `--createVuex` | Generates constant named actions and mutations as CRUD operations. Constants are stored in a ListTypes.js file. ***Optional, exclusive. See note below*** |
    | `--withTests` | Generates store test files. An .actions.spec.js for actions, a .mutations.spec.js for mutations and states, and a .components.spec.js for components. ***Optional*** |
        
    ***important note: `--vuex` and ``--createVuex``, hence cannot be used both in the same command line***

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
    | ``LayoutFooter.vue`` | Input type radio component |
  
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
We've mentioned before an example of how this works. Here is another one with Bootstrap components:

```javascript
// in main.js
// import bootstrap components and your own

import BootstrapAdminComponents from "@apok/admin-components-bootstrap";
import myCustomButton from '@/components/myCustomButton'
import myCustomTable from '@/components/myCustomTable'
import myCustomForm from '@/components/myCustomForm'

// install bootstrap components as a plugin with an options object for custom components

Vue.use(BootstrapAdminComponents, {
    'ButtonRenderer': myCustomButton,
    'TableRenderer': myCustomTable,
    'FormRenderer': myCustomForm,
})
```
Then on another component you can use the renderer as you would normally use a component, for instance:

```html
// This is a Vue component template

<template>
    <div>
        <button-renderer/>
        <table-renderer/>
        <form-renderer/>
    </div>
</template>
```
You dont need to import in each components since they are already registered globally
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
| ``FormInputColorRenderer`` |  | | |
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
