import Mock from "mockjs";
const Random = Mock.Random;

// Mock.mock("/user/list", "post", {
//   code: 0,
//   data: {
//     "data|3": [
//       {
//         id: "@id", //随机id
//         name: "@name", //随机名称
//         nickName: "@last", //随机昵称
//         phone: /^1[34578]\d{9}$/, //随机电话号码
//         "age|11-99": 1, //年龄
//         address: "@county(true)", //随机地址
//         email: "@email", //随机邮箱
//         isMale: "@boolean", //随机性别
//         createTime: "@datetime", //创建时间
//         avatar() {
//           //用户头像
//           return Random.image(
//             "100×100",
//             Random.color(),
//             "#757575",
//             "png",
//             this.nickName
//           );
//         },
//       },
//     ],
//   },
// });

// 函数写法，借助Random, 函数形式可以拿到params请求参数
Mock.mock("/user/list", "post", (requestParams) => {
  console.log("requestParams ", requestParams);
  const data = Mock.mock({
    "data|3": [
      {
        id: "@id", //随机id
        name: Random.name(), //随机名称
        "cname|1": Random.csentence(3, 5), //随机名称
        nickName: Random.last(), //随机昵称
        phone: Mock.mock({
          regexp: /[a-z][A-Z][0-9]/,
        }).regexp, //随机电话号码
        age: Random.integer(60, 100), //年龄
        address: Random.county(true), //随机地址
        email: Random.email(), //随机邮箱
        isMale: Random.boolean(), //随机性别
        createTime: Random.datetime(), //创建时间
        //用户头像
        "avatar|1-5": [
          Random.image("100×100", Random.color(), "#757575", "png"),
        ],
      },
    ],
  });
  return {
    code: 0,
    data: data,
  };
});
