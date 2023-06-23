import {
    View,
    Text,
} from 'react-native'
import {icons,routes} from '../../constant'
import {
    UIIcon,
} from '../../components'
import axios from 'axios'

function FindItem(props)
{
    let {name,age,address,id}=props.human
    let user=props.keyUser
    var track={
        ID:user,
        ID_patient:id,
    }

    const Add=()=>{
        axios.post(routes.addtracking,track)
        .then(res=>{
            if(res.data.code=="ER_DUP_ENTRY"){
                alert("Patient exist")
            }
            else{
                alert("Add Successfully")
            }
        })
        .catch(err=>{console.log(err)})
    }
    return (
        <View>
            <View style={{
                width: 400,
                height: 100,
                alignSelf: 'center',
                flexDirection: 'row',
                marginBottom: 10,
            }}>
                <View style={{ flex: 0.95,marginLeft:15 }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>{name}</Text>
                    <Text style={{ fontSize: 20 }}>Age: {age}</Text>
                    <Text style={{ fontSize: 20 }}>Address: {address}</Text>
                    <Text style={{ fontSize: 20 }}>ID: {id}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <UIIcon 
                    thisIcon={icons.add} 
                    onPress={()=>{Add()}}/>
                </View>
            </View>
            <View style={{
                backgroundColor:'black',
                height:1,
                marginVertical:10,
            }}>
            </View>
        </View>
    )
}
export default FindItem