import {
    View,
    ImageBackground,
    ScrollView,
} from 'react-native'
import {icons, images} from '../../constant'
import {
    UIIcon,
    TextBox,
} from '../../components'
import FindItem from './FindItem'
import { useState } from 'react'
import axios from 'axios'

function Find({navigation,route})
{
    let user=route.params.key

    const [data,setDatas]=useState([])
    const [text,setText] = useState('')

    var findID={ID:text}

    const Find=()=>{
        axios.post('http://192.168.1.6:3000/find',findID)
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
    }
    
    return (
        <View style={{flex:1}}>
            <ImageBackground
                source={images.background}
                blurRadius={5}
                resizeMode='cover'
                style={{flex:1}}>
                    <View style={{
                        flex:10,
                        flexDirection:'row',
                        justifyContent:'space-around',
                        marginTop:50,
                    }}>
                        <UIIcon 
                        thisIcon={icons.home}
                        onPress={()=>{
                            navigation.navigate('Home')
                        }}
                        />

                        <TextBox 
                        onChangeText={(text) => setText(text)}
                        value={text}
                        placeholder="ID: 0000"/>

                        <UIIcon 
                        thisIcon={icons.find}
                        onPress={()=>{Find()}}
                        />
                    </View>

                    <View style={{
                        flex:90,
                    }}>
                        <ScrollView>
                            {
                                data.map(eachHuman => {
                                    if (eachHuman.id != 0)
                                        return <FindItem human={eachHuman} key={eachHuman.id} keyUser={user}/>
                                })
                            }
                        </ScrollView>
                    </View>
            </ImageBackground>
        </View>
    )
}
export default Find