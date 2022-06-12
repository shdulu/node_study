## npm 的使用

> 模块分为三种 - 文件模块、内置模块、第三方模块

### npm node package manager node 模块包管理器

> node 包管理器，可以管理我们的第三方模块（全局模块，局部模块）

### 全局模块

C:\Users\Administrator\AppData\Roaming\npm\my-pack -> C:\Users\Administrator\AppData\Roaming\npm\node_modules\my-pack\bin\www.js

C:\Users\Administrator\AppData\Roaming\npm\node_modul es\my-pack -> D:\myProject\node\node_study\my-pack

只能在命令行中使用，不能在项目中使用

```
npm install nrm -g
```

> 怎么才能编写一个全局模块，去使用。因为所有额可执行命令都被配置到了环境变量里

```
npm init -y
// 生成 package.json

```

```
bin 命令 指定要执行的文件
```

```
npm link 将包映射到 会生成地址软连
```

### 局部模块

只能在代码中使用，也有一部分可以在命令中使用，安装时不加 -g 直接被安装到当前目录

一般安装 webpack gulp 这些工具是放在全局还是 局部？
基本上项目中的依赖都放到项目中，安装到本地保证版本号每个人都一致

### 版本号 (semver 分别由三部分组成 major.minor.patch)

^1.0.0 版本只能是开头的 其他的可以高于这个版本 1.2.0,
~前两位固定 2.1.x
vue@1.1.1-beta.1.1 beta 公测版本
rc 版本 正式发布

### npm run 执行命令

> 会将当前的执行路径 node_modules/bin 放到我们的环境变量中 只是临时的，可以留存到 package.json
> npx 也可以执行 node_modules/bin 也是放到环境变量中 （命令执行完毕就删除）
