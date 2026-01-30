const WORLD = [

{
name:"Italia",
color:"#2ecc71",
capital:{name:"Roma",lon:12.5,lat:41.9},
cities:[
{name:"Milano",lon:9.19,lat:45.46},
{name:"Napoli",lon:14.26,lat:40.85}
],
neighbors:["Francia","Germania"],
poly:[[6,47],[19,47],[19,36],[6,36]]
},

{
name:"Francia",
color:"#3498db",
capital:{name:"Parigi",lon:2.35,lat:48.85},
cities:[
{name:"Lione",lon:4.83,lat:45.76}
],
neighbors:["Italia","Germania"],
poly:[[-5,51],[8,51],[8,43],[-5,43]]
},

{
name:"Germania",
color:"#f1c40f",
capital:{name:"Berlino",lon:13.4,lat:52.5},
cities:[
{name:"Monaco",lon:11.5,lat:48.1}
],
neighbors:["Francia","Italia"],
poly:[[5,55],[16,55],[16,47],[5,47]]
}
const NATION_STATS = {
Italia:{gdp:2100,army:90,pop:60},
Francia:{gdp:3000,army:110,pop:67},
Germania:{gdp:4200,army:85,pop:83}
};

];
