# Script to initialise the database with initial data
# WARNING - Running this script will delete all data in the database.

# Run scripts in sequence
mysql --user=root --password=password < 1_createSchema.sql &&
mysql --user=kinsella_dairies_admin --password=password kinsella_dairies < 2_createTables.sql &&
mysql --user=kinsella_dairies_admin --password=password kinsella_dairies < 3_insertData.sql &&

# Initialise the product images folder
rm ../../../../../frontend/public/productImages/* 2>/dev/null
cp ../../../../../frontend/public/productImages/default/{whole_milk_pint.jpg,semi_milk_pint.jpg,skimmed_milk_pint.jpg,organic_whole_milk_pint.jpg,organic_semi_milk_pint.jpg,organic_skimmed_milk_pint.jpg,eggs_six.png,orange_juice_pint.jpg} ../../../../../frontend/public/productImages