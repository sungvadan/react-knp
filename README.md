#To boot the project

1. ```composer install```
2. ```./bin/console doctrine:database:create```
3. ```./bin/console doctrine:schema:create```
4. ```./bin/console doctrine:fixtures:load```
5. ```yarn install```
6. ```yarn run encore dev --watch```
7. ```./bin/console server:run```