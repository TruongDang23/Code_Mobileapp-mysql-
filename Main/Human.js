class Human
{
    constructor(name,age,address,id)
    {
        this.name=name
        this.age=age
        this.address=address
        this.id=id
        this.data={
            heartRate:[60],
            oxi:[90],
            grip:[1],
        }
        this.estimate=[]
    }
    Length()
    {
        alert(this.data.heartRate.length)
    }
    GetLength()
    {
        return this.data.heartRate.length
    }
    Refresh()
    {
        this.data.heartRate=[60]
        this.data.oxi=[90]
        this.data.grip=[1]
    }
}
export default Human