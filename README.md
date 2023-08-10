# Kinsella Dairies Online Platform

The Kinsella Dairies online platform is a full stack application delivering an online shopping experience with an associated user accounts system, as well as administrative tools enabling the platform to be dynamic and responsive.

There are three pieces of software that interact to provide the functionality of this application:

**The Kinsella Dairies Database**

A MariaDB database that stores user account information, order information, payment information, and product information.

**The Kinsella Dairies Backend**

A Java Spring Boot REST API that facilitates interaction with the Kinsella Dairies Database. This software allows data to be added to, read from, updated, and deleted from the database.

**The Kinsella Dairies Frontend**

A React JS frontend that acts as the visual user interface users will interact with when they access the Kinsella Dairies Website.

## 1. Required Software

In order to run the Kinsella Dairies Web Platform locally, you will have to install several pieces of software.

### 1.1. Database & Backend Software

To start off, you must install all the necessary software so that you can use the Kinsella Dairies Database and Backend. You will require MariaDB database software, Java (version 17 onwards), and an appropriate means of running the backend. An IDE is recommended if you plan to run the backend locally.

To install MariaDB, follow the information on this page:
> https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb

To install Java, follow the information on this page:
> https://www.java.com/en/download/help/download_options.html

A recommended IDE to install to run the backend locally is IntelliJ IDEA Community Edition. It can be downloaded from the following page:
> https://www.jetbrains.com/idea/download/other.html

if you are using a Windows operating system, you may need extra software to run the bash scripts used in the setup process. Follow the guide bellow to find out more:
> https://www.lifewire.com/how-to-run-the-bash-command-line-in-windows-10-4072207

### 1.2. Frontend Software

Next, you will need to install all the necessary software so that you can use the Kinsella Dairies Frontend. You will require Node.Js and the Node Package Manager (npm), and an appropriate means of running the frontend. An IDE and a browser are recommended if you plan to run the frontend locally.

To install Node.Js and npm, follow the information on this page:
> https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

A recommended IDE to install to run the frontend locally is Visual Studio Code. It can be downloaded from the following page:
> https://code.visualstudio.com/

A recommended browser to install to view the frontend locally is Google Chrome. It can be downloaded from the following page:
> https://www.google.com/chrome/

Once you have installed all the necessary software, you can proceed to setting up the local environment.

## 2. Database & Backend Setup

Follow the steps below to set up the environment to run the database and backend locally.

### **2.1. Initialise the Database**

Your first step in setup should be to initialise the database. This is done using the provided initialisation scripts contained within the backend located in the resources directory.

```
kinsella-dairies/backend/src/main/resources
```

There are two variations of the initialisation script:

* **0_initialiseAll.sh**: Script to initialise the database with initial data
* **0_initialiseEmpty.sh**: Script to initialise the database without data

For general purposes, it is recommended that you use the script **0_initialiseAll.sh** as it will automatically prepare the database so that all functionality of the system can work without any manual effort.

Only in the case of debugging the system is it recommended that you use the script **0_initialiseEmpty.sh** to initialise the database.

To initialise the database, **execute the initialisation script** of your choice.

After doing so, you should now be able to view the database in the command line or with the use of database management tools.

You can enter the following commands to view the database in the command line:

```bash
mysql --user=kinsella_dairies_admin --password=password kinsella_dairies
```

```SQL
show databases;
```

If you executed the script **0_initialiseAll.sh**, you should also be able to find the default product images now present in the following directory:

```
/kinsella-dairies/frontend/public/productImages
```

### **2.2. Run the Backend**

Now that the database has been initialised, you can run the backend.

To run the backend locally, open the backend Java project in the IDE of your choice, and run the **BackendApplication.java** file located at the following directory:

```
kinsella-dairies/backend/src/main/java/com/kinselladairies/backend/BackendApplication.java
```

> Note: Depending on your IDE, com/kinselladairies/backend may be displayed as **com.kinselladairies.backend**

Upon running the application, you will see some logs output as it initialises. Once new logs stop appearing, you should be able to access the backend application from the following URL:

```
http://localhost:5000/
```

### **2.3. Testing the Backend (Optional)**

With the database and backend up and running, you can if you wish test that the backend is working as intended. 

This can be done in multiple ways:
* Testing using a browser (easy)
* Testing using an API development tool (hard)

The browser can be used to easily make GET requests to the backend that retrieve and display data from the database in a JSON format.

For example, to view all the products in the database, you can enter the following URL:

```
http://localhost:5000/products
```

Or to view a specific product, add its productID to the URL:

```
http://localhost:5000/products/1
```

An API development tool can be used to make more complex requests of various types, allowing you to read, write, update, and delete data from the database.

A recommended API development tool to use is Postman. For more information on installation and setup, visit this website:
> https://www.postman.com/

## 3. Frontend Setup

Follow the steps below to set up the environment to run the frontend locally.

### **3.1. Install the necessary packages**

To start off, you must install all the necessary packages using the node package manager (npm). These packages are listed in the **package.json** file. To install them, do the following:

1. Open the terminal within the **frontend** directory
1. Enter and run the command below 
```bash
npm install
```

This will start the process of the packages being installed. You should be connected to the internet while this process takes place.

### **3.2. Run the Frontend**

Once all packages have been installed successfuly, you can run the frontend interface. To do so, follow the following steps:

1. Open the terminal within the **frontend** directory
1. Enter and run the command below
```bash
npm start
```

This will start the frontend application. It may take a minute or two to load but upon successfully running, it will let you know everything has succeeded.

### **3.3. Open the Web App**

Now that the application is running, you can view it through your browser. It is recommended to use a modern browser like Google Chrome or Firefox.

Once you open the browser enter the following url:
```
http://localhost:3000/
```

The page should load and you should be able to use the Kinsella Dairies Frontend.

The environment is now set up and you can now use the Kinsella Dairies Web Platform.

### **3.4. Accessing the Admin Dashboard (Optional)**

If you used the script **0_initialiseAll.sh** to initialise the database, then you will be able to access the admin dashboard right away.

If you used the script **0_initialiseEmpty.sh** to initialise the database, re-initialise the database using the script **0_initialiseAll.sh** to create the database with the pre-existing administrator profile.

You can log into the administrator profile through the log in page. The credentials for this profile are as follows:

> Phone Number: **01234567890**\
> Password: **kinsellaDairies**

Once you are logged in using these credentials, you will be able to access the Admin Dashboard from the **Admin** navigation bar option.

From here you can modify the products listed on the storefront.


