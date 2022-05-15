import {  ResponsiveContainer,PieChart, Pie, Tooltip } from 'recharts';

const RatioChart = ({data}) => {

  const transformedData = Object.keys(data).map((coin)=>(
    {
      name: coin,
      value:data[coin]
    }
  ));

  
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={transformedData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          {/* {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))} */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
}

export default RatioChart