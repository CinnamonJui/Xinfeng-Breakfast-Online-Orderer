# About this branch

This branch also belongs to Luo Jie, which contains files builded by webpack in branch *[LuoJie](https://github.com/a129123659/Xinfeng-Breakfast-Online-Orderer/tree/LuoJie)*.

**.html** & **.js** are the only files you need, since src files like **.scss**, **.vue**, etc., are all packed into **.js** magically by *webpack*

You can modify my source code (in branch *[LuoJie](https://github.com/a129123659/Xinfeng-Breakfast-Online-Orderer/tree/LuoJie)*) & rebuild it by

```batch
REM first, install all dependencies
npm install
REM then rebuild!
webpack
REM or rebuild whenever source code changed
webpack --watch
```
