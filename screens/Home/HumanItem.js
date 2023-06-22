import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { UIIcon } from '../../components'
import {icons,routes} from '../../constant'
import axios from 'axios'

function HumanItem(props)
{    
    let {name,age,address,id}=props.human

    var info={
        ID: props.keyUser,
        ID_patient:id,
    }

    const Delete=()=>{
        return Alert.alert(
            "Delete Patient",
            "Do you want to delete this patient from your list?",
            [
                {
                    text:"Yes",
                    onPress: () => {
                        axios.post(routes.deletetracking, info)
                            .then(res => {
                                alert("Delete Successfully")
                            })
                            .catch(err => { console.log(err) })
                    }
                },

                {
                    text:"No",
                },
            ]
        )
    }

    return(
        <TouchableOpacity onPress={props.onPress}>
            <View>
                <View style={{
                    width: 400,
                    height: 100,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>
                    <View style={{ flex: 0.95,marginLeft:20, }}>
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
                            thisIcon={icons.subtract}
                            onPress={() => { Delete() }} />
                    </View>
                </View>
                <View style={{
                    backgroundColor: 'black',
                    height: 1,
                    marginVertical: 10,
                }}>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default HumanItem