import {
    View,
    Text,
} from 'react-native'
import moment from 'moment/moment'
function EstimateItem(props)
{
    let {time,avg,timMach,dotQuy,nhoiMau}=props.estimate
    var realTime = moment (time).format ("HH:mm a")
    var realDate= moment (time).format("DD/MM/YYYY")
    
    return(
        <View>
            <View style={{
                height: 120,
                padding: 10,
                flexDirection: 'row',
            }}>
                <View style={{
                    marginRight: 35,
                    marginLeft:25,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        alignItems: 'center',
                    }}>{realTime}</Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        alignItems: 'center',
                    }}>{realDate}</Text>
                </View>

                <View style={{
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                    }}>Lực nắm tay trung bình: {avg}Kg</Text>

                    <Text style={{
                        fontSize: 15,
                    }}>Tỉ lệ tử vong do tim mạch: {timMach}%</Text>

                    <Text style={{
                        fontSize: 15,
                    }}>Tỉ lệ mắc bệnh đột quỵ: {dotQuy}%</Text>

                    <Text style={{
                        fontSize: 15,
                    }}>Tỉ lệ bị nhồi máu cơ tim: {nhoiMau}%</Text>

                </View>
            </View>

            <View style={{
                backgroundColor: 'black',
                height: 0.5,
            }} />
        </View>
    )
}
export default EstimateItem