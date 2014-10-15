@ECHO OFF

echo.
echo [dist/HTMLImports.*]
cd src/HTMLImports
CALL gulp
cd ../..

echo.
echo [dist/ShadowDOM.*]
cd src/ShadowDOM
CALL gulp
cd ../..

echo.
echo [dist/webcomponents.*]
CALL gulp

echo.
PAUSE