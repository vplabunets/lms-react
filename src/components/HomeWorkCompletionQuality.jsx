import {Typography} from "@mui/material";
import {PieChart} from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";

const pieChartData = [
    {id: 0, value: 10, label: '0-50%'},
    {id: 1, value: 15, label: '50-75%'},
    {id: 2, value: 20, label: '76-100%'},
]
export const HomeWorkCompletionQuality = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth/3);
    const handleResize = () => {
        setWindowWidth(window.innerWidth/3);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Очистка подписки при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Box borderRadius={2} sx={{height:"600px", bgcolor: "#fff", p: 2, mr: 3, display: "flex",flexDirection:"column", alignItems:"center",
            boxShadow: "inset 10px 10px 10px 3px rgba(0,0,0,0.1),inset 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
            transition: 'box-shadow 5s ease-in-outs',
            ":hover": {
                boxShadow: "0px 10px 15px -3px rgba(90,10,90,0.8)",},


        }}>
            <Typography variant="h4" sx={{textAlign: 'center', display:"block"}}>Homework completion quality</Typography>
            <PieChart sx={{alignItems:"center", justifyContent:"center"}}
                series={[
                    {
                        data: pieChartData,
                        innerRadius: windowWidth*0.1,
                        outerRadius: windowWidth*0.3,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        cy: 250,

                    },
                ]}

                width={windowWidth}
            />
        </Box>
    )
}
