import {
    View,
    Text,
    ImageBackground,
} from 'react-native'
import {icons, images} from '../../constant'
import {UIIcon} from '../../components'
import Chart from './Chart'
import {useState,useEffect} from 'react'
import {ref,onValue} from 'firebase/database'
import database from '../../firebase'
import dataHuman from '../../Main/DataHuman'
import moment from 'moment'

//**Còn code phần hiển thị thời gian lên line chart**//

function Mornitor({navigation,route})
{   
    const db=database
    let id=route.params.id
    let name=route.params.name
    let directHuman
    var date=moment().format('DD/MM/YYYY')
    const[dataset,setDatas]=useState({
        heartRate:60,
        oxi:90,
        grip:1,
    })
    
    dataHuman.map(eachHuman=>{
        if(eachHuman.id==id)
        {
            directHuman=eachHuman
            if(directHuman.GetLength()>10)
                directHuman.Refresh()
        }
    })

    useEffect(()=>{
        let dbRef=ref(db,'patient/'+id.toString()+'/mornitor')
        onValue(dbRef,(snapshot)=>{
            let data=snapshot.val()
            directHuman.data.grip.push(data.grip)
            directHuman.data.heartRate.push(data.heartRate)
            directHuman.data.oxi.push(data.oxi)
            setDatas({
                heartRate:data.heartRate,
                oxi:data.oxi,
                grip:data.grip,
            })
        })
    },[])

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={images.background}
                blurRadius={5}
                resizeMode='cover'
                style={{ flex: 1 }}>
                <View style={{
                    flex: 10,
                    marginHorizontal: 30,
                    marginTop: 50,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <UIIcon 
                        thisIcon={icons.home} 
                        onPress={()=>{
                            navigation.navigate('Home')
                        }}/>
                        <View style={{
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>{name}</Text>
                            <Text>{date}</Text>
                        </View>
                        <UIIcon 
                        thisIcon={icons.mornitor} 
                        onPress={()=>{
                            navigation.navigate('Mornitor',{name:name})
                        }}/>
                    </View>
                </View>

                <View style={{flex: 30}}>
                    <View style={{
                        flex:4,
                        marginHorizontal:10,
                        flexDirection: 'row',
                        alignItems:'center',
                    }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <Text style={{paddingHorizontal:10}}>Heart Rate</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <View style={{flex:26}}>
                        <Chart data={directHuman.data.heartRate}/>
                    </View>
                </View>

                <View style={{flex: 30}}>
                    <View style={{
                        flex:4,
                        marginHorizontal:10,
                        flexDirection: 'row',
                        alignItems:'center',
                    }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <Text style={{paddingHorizontal:10}}>Oxigen</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <View style={{flex:26}}>
                        <Chart data={directHuman.data.oxi}/>
                    </View>
                </View>

                <View style={{flex: 30}}>
                    <View style={{
                        flex:4,
                        marginHorizontal:10,
                        flexDirection: 'row',
                        alignItems:'center',
                    }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <Text style={{paddingHorizontal:10}}>Grip Strength</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <View style={{flex:30}}>
                        <Chart data={directHuman.data.grip}/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Mornitor
