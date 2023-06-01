import {
    View,
    Text,
    ImageBackground,
    ScrollView,
} from 'react-native'
import {icons, images,routes} from '../../constant'
import {UIIcon} from '../../components'
import { useState} from 'react'
import EstimateItem from './EstimateItem'
import axios from 'axios'

function Estimate({navigation,route})
{
    let name=route.params.name
    let id=route.params.id
    let patient={ID:id}

    const [data,setDatas]=useState([])

    axios.post(routes.estimate,patient)
    .then(res=>{
        const newData=res.data.map(object=>({
            time:object.Time,
            avg:object.AVG,
            timMach:object.TimMach,
            dotQuy:object.DotQuy,
            nhoiMau:object.NhoiMau
        }))
        setDatas(newData)
    })
    .catch(err=>console.log(err))

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
                        </View>
                        <UIIcon 
                        thisIcon={icons.estimate}
                        onPress={()=>{
                            navigation.navigate('Estimate',{name:name,id:id})
                        }} />
                    </View>
                </View>

                <View style={{
                    flex: 90,
                }}>
                    <ScrollView>
                        {data.map(eachEstimate => <EstimateItem estimate={eachEstimate} key={eachEstimate.time}/>)}
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Estimate