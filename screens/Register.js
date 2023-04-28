import {
    View,
    ImageBackground,
    Image,
    Text,
} from 'react-native'
import {UIButton,TextBox} from '../components'
import {images,colors} from '../constant'
import {useState} from 'react'
import axios from 'axios'
function Register(props)
{
    //navigation
    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, goBack } = navigation

    const [values,setValues]=useState({
        Username:'',
        Email:'',
        Pass:'',
    })

    const Handle=()=>{
        //change ip when you use strange wifi
        axios.post('http://192.168.1.5:3000/create',values)
        .then(res=>{
            if(res.data=="Error"){
                alert("Error")
            }
            else{
                alert("Create Successfully")
                navigate('Welcome')
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
                            onChangeText={text=>setValues((prev)=>({...prev,Username:text}))}
                            value={values.Username}
                            color={'#155DAD'}
                            placeholder="NAME"
                        />
                    </View>

                    <View style={{
                        alignSelf:'center',
                        flexDirection:'row',
                    }}>
                        <TextBox
                            onChangeText={text=>setValues((prev)=>({...prev,Email:text}))}
                            value={values.Email}
                            color={'#155DAD'}
                            placeholder="EMAIL"
                        />
                    </View>

                    <View style={{
                        alignSelf:'center',
                        flexDirection:'row',
                    }}>
                        <TextBox
                            onChangeText={text=>setValues((prev)=>({...prev,Pass:text}))}
                            value={values.Pass}
                            color={'#155DAD'}
                            secure={true}
                            placeholder="PASSWORD"
                        />
                    </View>

                    <UIButton
                        onPress={()=>{
                            Handle()
                        }}
                        title='CREATE NEW'
                        letterColor={colors.main}
                        bgColor='white'
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
export default Register