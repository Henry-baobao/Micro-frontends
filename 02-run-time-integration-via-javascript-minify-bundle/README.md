## 介绍
根据[*Martin Fowler*][1]介绍的[*Micro frontends*][2]及对应的example（[*github*][3]）,通过runtime integration via JavaScript方式实现Micro frontends.

## 注意事项
实现公共packages分离，减少各micro frontend打包后公共依赖包冗余。

## 第三方包
+ [*create-react-app*][4]
+ [*styled-components*][5]
+ [*serve*][7]
+ [*styled-components/macro*][6]
+ [*react-router*][8]

## 踩过的坑
### 1.useEffect VS useLayoutEffect
>***useEffect***: the function passed to useEffect fires after layout and pain, and ensures that your effect callback does not block browser painting.

>***useLayoutEffect***: it fires synchronously after all DOM mutations, before
the browser has a chance to paint

本例中涉及DOM mutation，在执行window[unmount**]方法时，container的main元素ID应不变，浏览器不会报错。因此，functional component应使用useLayoutEffect。

### 2.useLayoutEffect vs componentWillUnmount
functional component（**MicroFrontend**）的useLayoutEffect和class component(**MicroFrontendComponent**)的componentWillUnmount均可在浏览器repaint前实现DOM mutation。
但本例中，多个micro frontend来回切换时，useLayoutEffect只在前几次执行return函数中的unmount方法，后面不执行；componentWillUnmount在micro frontend切换时均执行。

### 3.useState([*don't over use state*][9])
>It should be used to sync your state with something outside of React. Utilizing useEffect to sync two react states is rarely right.
```javascript
//derived state, no-useless-state
  const total =
    Object.keys(quantities).length === 0
      ? 0
      : menu.reduce(
          (acc, menuItem) => acc + quantities[menuItem.item] * menuItem.price,
          0
        );
```

### 4.styled componnets
本例中，micro frontend的公共库styled-components未提取，造成bundle冗余，导致styling problems.
本例中解决方案
```diff
- import styled from 'styled-components'
+ import styled from 'styled-components/macro'
```

## 启动
Starting nginx and all containers

    docker-compose up --build

Once everything is build an running you can access the assembled restaurant page via [http://127.0.0.1:3000/](http://127.0.0.1:3000/).


[1]:https://martinfowler.com/   "Marin Fowler"
[2]:https://martinfowler.com/articles/micro-frontends.html  "Micro frontends"
[3]:https://github.com/orgs/micro-frontends-demo/repositories  "github repository"
[4]:https://create-react-app.dev/
[5]:https://styled-components.com/
[6]:https://styled-components.com/docs/tooling#babel-macro
[7]:https://github.com/vercel/serve
[8]:http://react-router.docschina.org/web/guides/philosophy
[9]:https://tkdodo.eu/blog/dont-over-use-state