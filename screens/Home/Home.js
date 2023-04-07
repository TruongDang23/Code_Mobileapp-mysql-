import {
    View,
    ImageBackground,
    ScrollView,
    Text,
} from 'react-native'
import {icons, images} from '../../constant'
import {
    UIIcon,
} from '../../components'
import { useState } from 'react'
import HumanItem from './HumanItem'
import axios from 'axios'


function Home({navigation,route})
{
    let key=route.params.key
    let user={Username:key}
    
    const [data,setDatas]=useState([])
    
    axios.post('http://192.168.1.6:3000/tracking',user)
    .then(res=>{
        const newData=res.data.map(object=>({
            name:object.Name,
            age:object.Age,
            address:object.Address,
            id:object.ID_patient,
        }))
        setDatas(newData)
    })
    .catch(err=>console.log(err))
    
    return (
        <View style={{flex:1}}>
            <ImageBackground
                source={images.background}
                blurRadius={5}
                resizeMode='cover'
                style={{flex:1}}>
                    <View style={{
                        flex:15,
                        flexDirection:'row',
                        justifyContent:'space-around',
                        marginTop:50,
                    }}>
                        <UIIcon 
                        thisIcon={icons.home} 
                        onPress={()=>{
                            navigation.navigate('Home')
                        }}/>
                        <Text style={{ 
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>DANH SÁCH NGƯỜI THÂN</Text>
                        <UIIcon 
                        thisIcon={icons.logout}
                        onPress={()=>{
                            navigation.navigate('Welcome')
                        }}
                        />
                    </View>

                    <View style={{
                        flex:90,
                    }}>
                        <ScrollView>
                            {data.map(eachHuman => <HumanItem 
                                                        human={eachHuman}
                                                        key={eachHuman.id}
                                                        onPress={()=>{
                                                            navigation.navigate('Estimate',{name:eachHuman.name,id:eachHuman.id}),
                                                            navigation.navigate('Mornitor',{name:eachHuman.name,id:eachHuman.id})
                                                        }}
                                                      />)}
                        </ScrollView>
                    </View>
            </ImageBackground>
        </View>
    )
}
export default Home