let shops=[{id:'1',title:'添加商铺'},{id:'2',title:'订单处理'}]

 function dataReducer(state=shops,action){
  switch(action.type){
    case 'MOUNT' : return state
    default : return state
  }
}
export default dataReducer
