function myejs(obj) {
  let str;
  with (obj) {
    str = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>;
    <h1>我的名字：<%=name%></h1>
    <h1>我的年龄：<%=age%></h1>`;
    arr.forEach((item) => {
      str += `<a href="#">123456</a>`;
    });
    str += `</body>
    </html>`;
  }
  return str;
}

const r = myejs({ arr: [1, 2, 3, 4] });
console.log(r);
