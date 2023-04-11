import {
    ScrollView,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import moment from 'moment';

function Chart(props) {
    
    let dataset=[]
    let label=[]
    let newData=props.data
    let newLabel=props.label
    newData.map((eachData) => dataset.push(eachData))
    newLabel.map((eachLabel)=> label.push(moment (eachLabel).format("HH:mm a")))

    let width=(newData.length-1)*90
    return (
        <ScrollView horizontal={true}>
            <LineChart
                data={{
                    labels: label,
                    datasets:[
                        {
                            data:dataset
                        }
                    ]
                }}
                width={width}
                height={200}
                withDots={true}
                withShadow={false}
                withVerticalLines={false}
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 2,
                    color: () => `rgba(52, 98, 156, 0.8)`,
                    labelColor: () => 'black',
                    style: {
                        borderRadius: 16
                    },
                }}
                bezier
                style={{
                    marginVertical: 6,
                    borderRadius: 5
                }}
            />
        </ScrollView>
    )
}
export default Chart