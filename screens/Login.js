import {
    View,
    ImageBackground,
    Image,
} from 'react-native'
import {UIButton,TextBox} from '../components'
import {images,colors} from '../constant'
import {useState} from 'react'
import axios from 'axios'

function Login(props)
{
    //navigation
    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, goBack } = navigation

    const [acc,setAcc]=useState({
        Username:'',
        Pass:'',
    })

    const CheckAcc=()=>{
        axios.post('http://192.168.1.6:3000/login',acc)
        .then(res=>{
            if(res.data==="Success"){
                navigate('TabBar',{key:acc.Username})
            }
            else{
                alert("User not available!")
            }
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
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop:50,
                }}>
                    <Image 
                        source={images.logo}
                        style={{
                            width:150,//width/height ~= 31/40
                            height:194
                        }}
                    />
                </View>
                <View style={{
                    flex:1,
                }}>
                    <View style={{
                        alignSelf:'center',
                        flexDirection:'row',
                    }}>
                        <TextBox
                            onChangeText={text=>setAcc((prev)=>({...prev,Username:text}))}
                            value={acc.Username}
                            placeholder="USER NAME"
                            color={'#155DAD'}
                        />
                    </View>

                    <View style={{
                        alignSelf:'center',
                        flexDirection:'row',
                    }}>
                        <TextBox
                            onChangeText={text=>setAcc((prev)=>({...prev,Pass:text}))}
                            value={acc.Pass}
                            secure={true}
                            placeholder="PASSWORD"
                            color={'#155DAD'}
                        />
                    </View>

                    <UIButton
                        onPress={()=>{CheckAcc()}}
                        title='LOGIN'
                        letterColor='#155DAD'
                        color='#155DAD'
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
export default Login