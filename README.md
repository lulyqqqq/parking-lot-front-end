# init:  
请你根据草图的方框，使用react和antd框架，生成对应个数的组件，  
每个组件完成对应的给你， 按照图片一共有五个component,  
大的component是PakingLot是包含parkingOperation和ParkingLotGroup,  
其中parkingOperation是UI图中的搜索框和选择策略的框，还有取车和停车的按钮，  
ParkingLotGroup是每个ParkingLot的父组件，ParkingLot代表每个停车场的数据，  
每个停车场都有对应的标识信息，其中每个停车场的信息是根据后端传入的停车场数组数据进行渲染的，  
JSON数据如下：[
{
"id": 1,
"name": "The Plaza Park",
"tickets": [
{
"plateNumber": "AB-1226",
"position": 1,
"parkingLot": 1
}
],
"capacity": 9,
"availableCapacity": 8,
"availablePositionRate": 0.8888888888888888,
"full": false
},  
{  
"id": 2,  
"name": "City Mall Garage",  
"tickets": [],  
"capacity": 12,  
"availableCapacity": 12,  
"availablePositionRate": 1.0,  
"full": false  
},  
{
"id": 3,  
"name": "Office Tower Parking",  
"tickets": [],  
"capacity": 9,  
"availableCapacity": 9,  
"availablePositionRate": 1.0,  
"full": false  
}  
]  
根据capacity显示每个停车场的容量，其中已经停车的位置，使用车牌号显示，没有停车的则不显示，  
每个停车场相互独立，输入车牌号，选择策略进行停车，  
然后将车牌，停车场id和位置渲染为一个ticket数据，  
例如：              
{  
"plateNumber": "AB-1226",  
"position": 1,  
"parkingLot": 1  
}    
存放在数组中，取车则是根据车牌号信息在进行取车，将车牌信息发生到后端进行交互，删除停车场   
list中的数据，请你根据描述生成对应的component和每个component负责的操作  
# useReducer
使用useReducer和useContext来存储这些组件之间传递的值，  
保存在最上层的组件中进行使用，不需要传值，使用全局状态管理

# 使用body传入参数
对于fetch和park操作，使用body传入参数

# 使用antd
使用antd的组件库来完成UI的渲染