import getters from './getters';
export default {
  namespaced: true,
  state() {
    return {
      products: [
        {
          id: 'p1',
          image:
            'https://img0.baidu.com/it/u=941593804,3144848867&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
          title: '书架',
          description:
            'A collection of must-read books. All-time classics included!',
          price: 99.99,
        },
        {
          id: 'p2',
          image:
            'https://img1.baidu.com/it/u=2377111024,2274272294&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
          title: '帐篷',
          description: 'A tent for the ambitious outdoor tourist.',
          price: 129.99,
        },
        {
          id: 'p3',
          image:
            'https://img1.baidu.com/it/u=1370620492,1443072282&fm=253&fmt=auto&app=138&f=JPEG?w=620&h=331',
          title: '餐盒',
          description:
            'May be partially expired when it arrives but at least it is cheap!',
          price: 6.99,
        },
      ],
    };
  },
  getters: getters,
};
