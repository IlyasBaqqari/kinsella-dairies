# Script to initialise the database without data
# WARNING - Running this script will delete all data in the database.

# Run scripts in sequence
mysql --user=root --password=password < 1_createSchema.sql &&
mysql --user=kinsella_dairies_admin --password=password kinsella_dairies < 2_createTables.sql &&

# Initialise product images folder
rm ../../../../../frontend/public/productImages/* 2>/dev/null