# Kinsella Dairies Backend & Database

The Kinsella Dairies Database is the central location where data is stored on user accounts, products, orders, and more. The Kinsella Dairies Backend is the software which provides an interface enabling interaction with the database, allowing data to be written, read, updated, and deleted.

Please ensure you have all the necessary software installed to use the backend. A list of the necessary software can be found in the master **README.md** file, located in the **kinsella-dairies** folder.

## Set up

To get started, follow the steps below to set up the environment to run the database and backend locally.

### **1. Initialise the Database**

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

show databases;
```

If you executed the script **0_initialiseAll.sh**, you should also be able to find the default product images now present in the following directory:

```
/kinsella-dairies/frontend/public/productImages
```

### **2. Run the Backend**

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

### **3. Testing the Backend (Optional)**

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



