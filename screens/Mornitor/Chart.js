import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

function Chart(props) {
    let dataset=[]
    let newData=props.data
    let label=["Test","Haha"]
    newData.map((eachData) => dataset.push(eachData))
    return (
        <LineChart
            data={{
                //labels: label,
                datasets: [
                    {
                        data:dataset,
                    }
                ]
            }}
            width={Dimensions.get("window").width} 
            height={200}
            withDots={false}
            withShadow={false}
            withVerticalLines={false}
            yAxisInterval={1} 
            chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2,
                color:() => `rgba(52, 98, 156, 0.8)`,
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
    )
}
export default Chart