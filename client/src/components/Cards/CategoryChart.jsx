import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from 'styled-components';

const Card = styled.div`
flex:1;
min-width:200px;
padding: 24px;
display:flex;
flex-direction:column;
gap:6px;
border:1px solid ${({theme})=> theme.text_primary+20};
border-radius:14px;
box-shadow : 1px 6px 20px 0px ${({theme})=> theme.primary+15};
@media (max-width:600px){
padding:16px;
}
`;
const Title = styled.div`
font-weight:600;
font-size:16px;
color:${({theme})=>theme.primary};
@media (max-width:600px){
font-size:14px;
}
`;


// const CategoryChart = ({data}) => {

//    const theme= useTheme();

//    const [radius, setRadius] = React.useState(window.innerWidth < 600 ? 80 : 120);

// React.useEffect(() => {
//   const handleResize = () => {
//     setRadius(window.innerWidth < 600 ? 80 : 120);
//   };
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);
// console.log(data.pieChartData);

//   return (
//      <Card>
//       <Title>Calories by Category</Title>

//        {data?.pieChartData && data.pieChartData.length>0 ?(
//         <><PieChart 
//         series={[{data:data?.pieChartData,
//             innerRadius:30,
//             outerRadius:radius,
//             paddingAngle:1,
//             cornerRadius:5,
//         }]}
//         height= {300}
  
//         slotProps={{
//               legend: { hidden: true },  
//             }}
//         />
 
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
//             {data.pieChartData.map((item) => (
//               <div key={item.id ?? item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                 <div style={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: "50%",
//                   backgroundColor: item.color,
//                   flexShrink: 0,
//                 }} />
//                 <span style={{ fontSize: 14, color: theme.text_primary }}>
//                   {item.label}
//                 </span>
//               </div>
//             ))}        
//          </div>

//         </>
//         ): <p style={{color:theme.text_secondary}} >No data available</p>}
//      </Card>
//   )
// }




const COLORS = ["#02B2AF", "#2E96FF", "#B800D8", "#60009B", "#FF6B6B", "#FFA500"];

const CategoryChart = ({ data }) => {
  const theme = useTheme();
  const [radius, setRadius] = React.useState(window.innerWidth < 600 ? 80 : 120);

  React.useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 600 ? 80 : 120);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || !data.pieChartData || data.pieChartData.length === 0) {
    return (
      <Card>
        <Title>Calories by Category</Title>
        <p style={{ color: theme.text_secondary }}>No data available</p>
      </Card>
    );
  }

  const coloredData = data.pieChartData.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));

 return (
  <Card>
    <Title>Calories by Category</Title>

  
    <div style={{ display: "flex", alignItems: "center" }}>
      
      <PieChart
        series={[{
          data: coloredData,
          innerRadius: 30,
          outerRadius: radius,
          paddingAngle: 1,
          cornerRadius: 5,
        }]}
        height={300}
        width={300}   
        slotProps={{
          legend: { hidden: true },
        }}
        sx={{
          "& .MuiChartsLegend-root": {
            display: "none !important",
          },
        }}
      />


      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginLeft: "3px" }}>
        {coloredData.map((item, index) => (
          <div key={item.id ?? index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: item.color,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: "14px", color: theme.text_primary }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  </Card>
);
};


export default  CategoryChart

