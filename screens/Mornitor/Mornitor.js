import {
    View,
    Text,
    ImageBackground,
} from 'react-native'
import {icons, images,routes} from '../../constant'
import {UIIcon} from '../../components'
import Chart from './Chart'
import {useState} from 'react'
import moment from 'moment'
import axios from 'axios'

function Mornitor({navigation,route})
{   
    let id=route.params.id
    let patient={ID:id}
    let name=route.params.name
    var date=moment().format('DD/MM/YYYY')

    let T=[] //time
    let H=[] //heart rate
    let O=[] //oxigen
    let G=[] //grip strength

    const [value,setValues]=useState([])

    axios.post(routes.mornitor,patient)
    .then(res=>{
        const newData=res.data.map(object=>({
           time:object.Time,
           heart:object.HeartRate,
           oxi:object.Oxi,
           grip:object.GripStrength,
        }))
        setValues(newData)

    })
    .catch(err=>console.log(err))

    if(T.length<value.length)
    {
        for(let i=0;i<value.length;i++)
        {
            T.push(value[i].time)
            H.push(value[i].heart)
            O.push(value[i].oxi)
            G.push(value[i].grip)
        }
    }

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
                        <Chart data={H} label={T}/>
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
                        <Chart data={O} label={T}/>
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
                        <Chart data={G} label={T}/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Mornitor
