# Kinsella Dairies Frontend

The Kinsella Dairies Frontend is the visual user interface users will interact with when they access the Kinsella Dairies Website. The following instructions will help you to get set up and run the website locally.

Please ensure you have all the necessary software installed to use the frontend. A list of the necessary software can be found in the master **README.md** file, located in the **kinsella-dairies** folder.

> The **Kinsella Dairies Backend** should be running before you run the frontend.

## Set up

To get started, follow the steps below to set up the environment to run the frontend locally.

### **1. Install the necessary packages**

To start off, you must install all the necessary packages using the node package manager (npm). These packages are listed in the **package.json** file. To install them, do the following:

1. Open the terminal within the **frontend** directory
1. Enter and run the command below 
```bash
npm install
```

This will start the process of the packages being installed. You should be connected to the internet while this process takes place.

### **2. Run the Frontend**

Once all packages have been installed successfuly, you can run the frontend interface. To do so, follow the following steps:

1. Open the terminal within the **frontend** directory
1. Enter and run the command below
```bash
npm start
```

This will start the frontend application. It may take a minute or two to load but upon successfully running, it will let you know everything has succeeded.

### **3. Open the Web App**

Now that the application is running, you can view it through your browser. It is recommended to use a modern browser like Google Chrome or Firefox.

Once you open the browser enter the following url:
```
http://localhost:3000/
```

The page should load. 

Now you are able to use the Kinsella Dairies Frontend.

### **4. Accessing the Admin Dashboard (Optional)**

If you used the script **0_initialiseAll.sh** to initialise the database, then you will be able to access the admin dashboard right away.

If you used the script **0_initialiseEmpty.sh** to initialise the database, re-initialise the database using the script **0_initialiseAll.sh** to create the database with the pre-existing administrator profile.

You can log into the administrator profile through the login page. The credentials for this profile are as follows

> Phone Number: **01234567890**\
> Password: **kinsellaDairies**

Once you are logged in using these credentials, you will be able to access the Admin Dashboard from the **Admin** navigation bar option.

From here you can modify the products listed on the storefront.